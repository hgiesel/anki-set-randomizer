import os
import io
import re
import json
import base64

from anki import media

from aqt import mw
from string import Template

from aqt.utils import showInfo

from .config import serialize_config
from .utils import version_string

class BetterTemplate(Template):
    delimiter = '$$'

def setup_models(config):
    for settings in serialize_config(config)['settings']:
        model = mw.col.models.byName(settings['modelName'])

        remove_model_template(model)

        if settings['enabled']:
            update_model_template(model, settings)

def gen_data_attributes(side):
    return f'data-name="Set Randomizer {side} Template" data-version="{version_string}"'

def remove_model_template(model):
    front_name = f'_front{model["id"]}.js'
    back_name = f'_back{model["id"]}.js'

    mw.col.media.syncDelete(front_name)
    mw.col.media.syncDelete(back_name)

    for template in model['tmpls']:

        template['qfmt'] = re.sub(
            '\n?<script[^>]*Set Randomizer[^>]*>.*</script>',
            '',
            template['qfmt'],
            flags=re.MULTILINE | re.DOTALL,
        ).strip()

        template['afmt'] = re.sub(
            '\n?<script[^>]*Set Randomizer[^>]*>.*</script>',
            '',
            template['afmt'],
            flags=re.MULTILINE | re.DOTALL,
        ).strip()


def update_model_template(model, settings):
    dir_path = os.path.dirname(os.path.realpath(__file__))

    with io.open(f'{dir_path}/../js/dist/front.js', mode='r', encoding='utf-8') as template_front:
        js_front = BetterTemplate(template_front.read()).substitute(
            options=json.dumps(settings['options'])
        )

    with io.open(f'{dir_path}/../js/dist/back.js', mode='r', encoding='utf-8') as template_back:
        js_back =  BetterTemplate(template_back.read()).substitute(
            options=json.dumps(settings['options'])
        )

    with io.open(f'{dir_path}/../js/dist/anki-persistence.js', mode='r', encoding='utf-8') as template_anki_persistence:
        anki_persistence = template_anki_persistence.read() + '\n'

    if settings['pasteIntoTemplate']:
        for template in model['tmpls']:
            template['qfmt'] = (
                f'{template["qfmt"]}\n\n<script {gen_data_attributes("Front")}>\n'
                f'{anki_persistence if settings["injectAnkiPersistence"] else ""}{js_front}'
                f'</script>'
            )

            template['afmt'] = (
                f'{template["afmt"]}\n\n<script {gen_data_attributes("Back")}>\n'
                f'{anki_persistence if settings["injectAnkiPersistence"] else ""}{js_back}'
                f'</script>'
            )

    else:
        front_name = f'_front{model["id"]}.js'
        back_name = f'_back{model["id"]}.js'

        front_template = f"""\n
<script {gen_data_attributes("Front")}>
  var script = document.createElement("script")
  script.src = "{front_name}"
  document.getElementsByTagName('head')[0].appendChild(script)
</script>
        """

        back_template = f"""\n
<script {gen_data_attributes("Back")}>
  var script = document.createElement("script")
  script.src = "{back_name}"
  document.getElementsByTagName('head')[0].appendChild(script)
</script>
        """

        mw.col.media.writeData(front_name, ((anki_persistence
                                             if settings['injectAnkiPersistence']
                                             else '') + js_front).encode('ascii'))
        mw.col.media.writeData(back_name, ((anki_persistence
                                            if settings['injectAnkiPersistence']
                                            else '') + js_back).encode('ascii'))

        for template in model['tmpls']:
            template['qfmt'] = template["qfmt"] + front_template
            template['afmt'] = template["afmt"] + back_template
