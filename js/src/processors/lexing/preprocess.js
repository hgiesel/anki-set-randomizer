import {
  vsNone, vsSome, vsStar, vsSelf,
  pickInt, pickReal,
  posRel, posAbs, posAbsNeg, posAll,
  posAbsYank, posAllYank, posName,
  amountCount, amountStar, amountPlus, amountQuestion,
  uniqSome, uniqCond, uniqNone,
} from '../util.js'

import {
  namePatternRaw,
} from './util.js'

import {
  simpleStringToList,
  getBool,
} from './kwargs.js'

export const preprocessYank = function([
  imageId,
  yankGroup,
  shapeType,
  dimensionValues,
  textContent,
]) {
  return [
    imageId
      ? Number(imageId)
      : 0,
    yankGroup,
    shapeType,
    dimensionValues.split(':').map(val => Number(val)),
    textContent || ''
  ]
}

export const preprocessNamepos = function([abs, absNeg, rel, all, absYank, allYank, name]) {
  if (abs) {
    return {
      'type': posAbs,
      'values': Number(abs),
    }
  }

  else if (absNeg) {
    return {
      'type': posAbsNeg,
      'values': Number(absNeg),
    }
  }

  else if (all) {
    return {
      'type': posAll,
      'values': null,
    }
  }

  else if (absYank) {
    return {
      'type': posAbsYank,
      'values': Number(absYank),
    }
  }

  else if (allYank) {
    return {
      'type': posAllYank,
      'values': null,
    }
  }

  else if (name) {
    return {
      'type': posName,
      'values': name.split(':'),
    }
  }

  else /* rel */ {
    return {
      'type': posRel,
      'values': Number(rel) || 0,
    }
  }
}

export const preprocessForce = function(options) {
  if (options.hasOwnProperty('force')) {
    switch (typeof options.force) {
      case 'string':
        const maybeBool = getBool(options.force)
        if (maybeBool !== null) {
          return {
            force: maybeBool,
          }
        }
        break

      case 'bool':
        return {
          force: options.force
        }

      default:
        // fallthrough
    }
  }

  return {
    force: false
  }
}

export const preprocessVs = function(
  [vsName, vsSubIndex, vsPosIndex],
  noSelf = false /* only makes sense in uniqCond */
) {
  if (vsName
    && (!noSelf || (vsName !== '_' && vsName !== '$' && vsSubIndex !== '_' && vsPosIndex !== '_'))
  ) {
    const maybeVsSub = Number(vsSubIndex)
    const maybeVsPos = Number(vsPosIndex)

    if (vsName === '$') {
      return {
        'type': vsSome,
        'name': vsSelf,
        'sub': vsSelf,
        'pos': vsSelf,
      }
    }

    return {
      'type': vsSome,
      'name': vsName === '*'
        ? vsStar
        : vsName === '_'
        ? vsSelf
        : vsName,
      'sub': !Number.isNaN(maybeVsSub)
        ? maybeVsSub
        : vsSubIndex === '_'
        ? vsSelf
        : vsStar /* default */,
      'pos': !Number.isNaN(maybeVsPos)
        ? maybeVsPos
        : vsPosIndex === '_'
        ? vsSelf
        : vsStar /* default */,
    }
  }

  return {
    'type': vsNone,
    'name': null,
    'sub': null,
    'pos': null,
  }
}

export const preprocessAmount = function(amountText, defaultAmount = 1) {
  if (amountText === '*' || (!amountText && defaultAmount === amountStar)) {
    return {
      'type': amountStar,
      'value': null,
    }
  }

  else if (amountText === '+' || (!amountText && defaultAmount === amountPlus)) {
    return {
      'type': amountPlus,
      'value': null,
    }
  }

  else if (amountText === '?' || (!amountText && defaultAmount === amountQuestion)) {
    return {
      'type': amountQuestion,
      'value': null,
    }
  }

  const amountNumber = Number(amountText)
  return {
    'type': amountCount,
    'value': Number.isNaN(amountNumber) ? defaultAmount : amountNumber,
  }
}

const parseUniqConditions = function(cond, add, fail, uniq) {
  let condResult = null
  if (cond) {
    try {
      condResult = JSON.parse(cond)
    }
    catch (e) {
      return {
        'type': uniqNone,
        'name': null,
      }
    }
  }
  else {
    condResult = []
  }

  const addResult = add
    ? simpleStringToList(add)
    : []

  const failResult = fail
    ? simpleStringToList(fail)
    : []

  return {
    'type': uniqCond,
    'cond': condResult,
    'add': addResult,
    'fail': failResult,
    'name': uniq ? uniq : null,
  }
}

const parseUniqName = function(name) {
  return typeof name === 'string'
    ? name.match(namePatternRaw)[0]
    : `_anonymous${String(Math.random()).slice(2)}`
}

export const preprocessUniq = function(options, shortcut = false) {
  if (options.hasOwnProperty('cond')
    || options.hasOwnProperty('add')
    || options.hasOwnProperty('fail')
  ) {
    if (shortcut) {
      const result = {
        'type': uniqCond,
        'cond': options.cond || [],
        'add': options.add || [],
        'fail': options.fail || [],
      }

      if (options.hasOwnProperty('uniq')) {
        result.name = parseUniqName(options.uniq)
      }

      return result
    }
    else {
      return parseUniqConditions(
        options.cond,
        options.add,
        options.fail,
        options.uniq,
      )
    }
  }

  else if (options.hasOwnProperty('uniq')) {
    return {
      'type': uniqSome,
      'name': parseUniqName(options.uniq),
    }
  }

  else {
    return {
      'type': uniqNone,
      'name': null,
    }
  }
}

export const preprocessPickInt = function([minValue, maxValue, extraValue]) {
  return {
    'type': pickInt,
    'min': Number(minValue),
    'max': Number(maxValue),
    'extra': Number(extraValue) || 1,
  }
}

export const preprocessPickReal = function([minValue, maxValue, extraValue]) {
  return {
    'type': pickReal,
    'min': Number(minValue),
    'max': Number(maxValue),
    'extra': Number(extraValue) || 2,
  }
}

export const preprocessPickNumber = function([minValue, maxValue, extraValue]) {
  return minValue.includes('.') || maxValue.includes('.')
    ? preprocessPickReal([minValue, maxValue, extraValue || 2])
    : preprocessPickInt([minValue, maxValue, extraValue || 1])
}

export const preprocessPick = function([minValue, maxValue, extraValue, ...vsArgs]) {
  if (typeof minValue === 'string') {
    return preprocessPickNumber([minValue, maxValue, extraValue])
  }

  return preprocessVs(vsArgs, true)
}

export const preprocessRule = function(
  [vsName, vsSubIndex, vsPosIndex, ucName],
) {
  if (ucName) {
    return preprocessUniq({
      uniq: ucName,
    })
  }
  else {
    return preprocessVs([vsName, vsSubIndex, vsPosIndex], false)
  }
}