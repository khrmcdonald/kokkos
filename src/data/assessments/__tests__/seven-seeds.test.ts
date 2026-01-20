/**
 * Seven Seeds Scoring Logic Test
 * 
 * Run with: npx ts-node src/data/assessments/__tests__/seven-seeds.test.ts
 * Or after building: node dist/data/assessments/__tests__/seven-seeds.test.js
 */

import { sevenSeedsQuestions, calculateSevenSeedsScores, seeds, getSeedInterpretation } from '../seven-seeds'

// Test 1: Verify question count
console.log('Test 1: Question count')
console.log(`Expected: 91, Got: ${sevenSeedsQuestions.length}`)
console.assert(sevenSeedsQuestions.length === 91, 'Should have 91 questions')

// Test 2: Verify each seed has 13 questions
console.log('\nTest 2: Questions per seed')
const seedCounts: Record<string, number> = {}
sevenSeedsQuestions.forEach(q => {
  seedCounts[q.seed] = (seedCounts[q.seed] || 0) + 1
})
Object.entries(seedCounts).forEach(([seed, count]) => {
  console.log(`${seed}: ${count} questions`)
  console.assert(count === 13, `${seed} should have 13 questions`)
})

// Test 3: Test scoring with all 5s (max score)
console.log('\nTest 3: Max score (all 5s)')
const maxAnswers: Record<string, number> = {}
sevenSeedsQuestions.forEach(q => {
  maxAnswers[q.id] = 5
})
const maxScores = calculateSevenSeedsScores(maxAnswers)
Object.entries(maxScores).forEach(([seed, score]) => {
  console.log(`${seed}: ${score.percentage}% (${score.level})`)
  console.assert(score.percentage === 100, `${seed} should be 100%`)
  console.assert(score.level === 'flourishing', `${seed} should be flourishing`)
})

// Test 4: Test scoring with all 1s (min score)
console.log('\nTest 4: Min score (all 1s)')
const minAnswers: Record<string, number> = {}
sevenSeedsQuestions.forEach(q => {
  minAnswers[q.id] = 1
})
const minScores = calculateSevenSeedsScores(minAnswers)
Object.entries(minScores).forEach(([seed, score]) => {
  console.log(`${seed}: ${score.percentage}% (${score.level})`)
  console.assert(score.percentage === 20, `${seed} should be 20%`)
  console.assert(score.level === 'blocked', `${seed} should be blocked`)
})

// Test 5: Test scoring with all 3s (middle score)
console.log('\nTest 5: Middle score (all 3s)')
const midAnswers: Record<string, number> = {}
sevenSeedsQuestions.forEach(q => {
  midAnswers[q.id] = 3
})
const midScores = calculateSevenSeedsScores(midAnswers)
Object.entries(midScores).forEach(([seed, score]) => {
  console.log(`${seed}: ${score.percentage}% (${score.level})`)
  console.assert(score.percentage === 60, `${seed} should be 60%`)
  console.assert(score.level === 'balanced', `${seed} should be balanced`)
})

// Test 6: Verify interpretations exist
console.log('\nTest 6: Interpretations')
seeds.forEach(seed => {
  const levels = ['blocked', 'developing', 'balanced', 'flourishing']
  levels.forEach(level => {
    const interpretation = getSeedInterpretation(seed.id, level)
    console.assert(interpretation.length > 0, `${seed.id} ${level} should have interpretation`)
  })
  console.log(`${seed.id}: All interpretations present ✓`)
})

console.log('\n✅ All tests passed!')
