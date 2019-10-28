import formatter from './formatter/formatter.js'

import {
  process,
} from './processors/process.js'

import {
  processNamedSets,
  processOrderConstraints,
} from './processors/shuffling.js'

import {
  processRenderDirectives,
} from './processors/stylings.js'

import {
  processCommands,
} from './processors/commands.js'

import {
  applySetReorder,
  applyCommands,
} from './lib/sort.js'

import {
  shareOrder,
  generateRandomization,
  adjustForSecondRandomization,
} from './lib/randomize.js'

import {
  matchStructures,
  matchGeneratedValues,
  matchSetReorder,
  reorderForRendering,
} from './lib/matching.js'

export function main(iterations, injectionsParsed, saveDataOld, frontside) {

  // frontside will be run with indices (-1, -2, -3, etc...)
  // backside will be run with indices (1, 2, 3, etc...)
  // but technically they are run in a row
  const saveDataAndSetsUsed = iterations
    .reduce((accu, v, i) => {
      const [
        saveDataNew,
        wereSetsUsed,
      ] = main2(
        v.name,
        v.inputSyntax,
        v.defaultStyle,
        ...accu[0],
        injectionsParsed[i],
      )

      return [saveDataNew, wereSetsUsed || accu[1]]
    }, [
      saveDataOld,
      false /* no sets used is assumption */
    ])

  return saveDataAndSetsUsed
}

//////////////////////////////////////////////////////////////////////////////
// elementsInherited + elementsOriginal -> elementsFirst -> elementsSecond
// [[0,0,'Hello','n'],[0,1,'World'],[]],[[],[]], etc.]

// numberedSets -> numberedSetsSecond

// reorders -> reordersSecond
// [{name:1/name, length, sets, setLengths, order, lastMinute}]
function main2(
  iterName,
  inputSyntax,
  defaultStyle,

  elementsInherited,
  generatedValuesInherited,
  uniquenessConstraintsInherited,
  reordersFirstInherited,
  reordersSecondInherited,
  randomIndicesInherited,

  injections,
) {
  const form = formatter(inputSyntax, injections, iterName)
  const elementsOriginal = form.getElementsOriginal()

  if (!form.isInvalid() /* && !form.isContained() */ && elementsOriginal.length > 0) {

    const structureMatches = matchStructures(
      elementsInherited,
      elementsOriginal,
    )

    //////////////////////////////////////////////////////////////////////////////
    // FIRST RANDOMIZATION
    const [
      numberedSets,
      generatedValues,
      uniquenessConstraints,
      valueSets,
    ] = process(
      elementsOriginal,
      matchGeneratedValues(structureMatches, generatedValuesInherited),
      uniquenessConstraintsInherited,
      iterName,
    )

    const namedSets        = processNamedSets(elementsOriginal)
    const orderConstraints = processOrderConstraints(elementsOriginal, namedSets)

    // modifies numberedSets and namedSets
    adjustForSecondRandomization(orderConstraints, numberedSets, namedSets)

    const commands = processCommands(elementsOriginal, numberedSets, namedSets)

    const [
      styleDefinitions,
      styleApplications,
      styleRules,
    ] = processRenderDirectives(elementsOriginal, defaultStyle, namedSets)

    console.log('saa!', elementsOriginal)
    console.log('saa!', styleApplications)

    const [
      reordersFirst,
      elementsFirst,
    ] = applyModifications(
      numberedSets,
      namedSets,
      orderConstraints,
      commands,
      reordersFirstInherited,
      structureMatches,
    )

    //////////////////////////////////////////////////////////////////////////////
    // SECOND RANDOMIZATION
    const [numberedSetsSecond, _1, _2, _3] = process(
      elementsFirst,
      [],
      [],
      iterName,
      numberedSets.map,
    )

    const [
      reordersSecond,
      elementsSecond,
    ] = applyModifications(
      numberedSetsSecond,
      namedSets.filter(v => v.lastMinute),
      orderConstraints.filter(v => v.lastMinute),
      [],
      reordersSecondInherited,
      structureMatches,
      true,
    )

    //////////////////////////////////////////////////////////////////////////////
    // RENDERING
    const randomIndices = form.renderSets(
      reorderForRendering(structureMatches, elementsSecond, iterName),
      styleDefinitions,
      styleApplications,
      styleRules,
      randomIndicesInherited,
      valueSets,
      numberedSets,
    )

    //////////////////////////////////////////////////////////////////////////////
    return [[
      elementsInherited.concat(elementsOriginal.filter(v => !structureMatches.find(w => w.to[0] === v[0][0] && w.to[1] === v[0][1]))),
      generatedValues,
      uniquenessConstraints,
      reordersFirstInherited.concat(reordersFirst),
      reordersSecondInherited.concat(reordersSecond),
      randomIndices,
    ], true]
  }

  else {
    return [[
      elementsInherited,
      generatedValuesInherited,
      uniquenessConstraintsInherited,
      reordersFirstInherited,
      reordersSecondInherited,
      randomIndicesInherited,
    ], false]
  }
}

// numbered are sorted 0 -> n, then named are in order of appearance
function applyModifications(numberedSets, namedSets, orderConstraints, commands, reordersInherited, structureMatches, lastMinute=false) {

  const [elements, reordersAlpha] = generateRandomization(numberedSets, namedSets)

  const reordersBeta = !lastMinute
    ? reordersAlpha
    : reordersAlpha.filter(v => v.lastMinute)

  const reorders = matchSetReorder(
    structureMatches,
    reordersInherited,
    reordersBeta,
  )

  // modifies reorders
  shareOrder(orderConstraints, reorders)

  // both modify elements
  applySetReorder(reorders, elements)
  applyCommands(commands, elements)

  return [
    reorders,
    elements,
  ]
}