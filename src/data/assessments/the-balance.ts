import { AssessmentQuestion, BalanceScore } from './types'

// Questions for The Balance Assessment (44 questions)
// Measures masculine vs feminine energy expression
export const balanceQuestions: AssessmentQuestion[] = [
  // MASCULINE ENERGY (22 questions)
  { id: 'masc-1', energy: 'masculine', text: 'I take decisive action when faced with challenges.', order: 1 },
  { id: 'masc-2', energy: 'masculine', text: 'I prefer to solve problems logically and systematically.', order: 2 },
  { id: 'masc-3', energy: 'masculine', text: 'I feel comfortable taking charge in group situations.', order: 3 },
  { id: 'masc-4', energy: 'masculine', text: 'I value independence and self-reliance.', order: 4 },
  { id: 'masc-5', energy: 'masculine', text: 'I am goal-oriented and focused on achievement.', order: 5 },
  { id: 'masc-6', energy: 'masculine', text: 'I prefer clear boundaries and structure.', order: 6 },
  { id: 'masc-7', energy: 'masculine', text: 'I am comfortable with competition.', order: 7 },
  { id: 'masc-8', energy: 'masculine', text: 'I protect those I care about.', order: 8 },
  { id: 'masc-9', energy: 'masculine', text: 'I value strength and perseverance.', order: 9 },
  { id: 'masc-10', energy: 'masculine', text: 'I prefer direct, straightforward communication.', order: 10 },
  { id: 'masc-11', energy: 'masculine', text: 'I am comfortable making difficult decisions alone.', order: 11 },
  { id: 'masc-12', energy: 'masculine', text: 'I focus on providing and building security.', order: 12 },
  { id: 'masc-13', energy: 'masculine', text: 'I am driven by a sense of purpose and mission.', order: 13 },
  { id: 'masc-14', energy: 'masculine', text: 'I prefer to fix problems rather than just talk about them.', order: 14 },
  { id: 'masc-15', energy: 'masculine', text: 'I am comfortable with risk and uncertainty.', order: 15 },
  { id: 'masc-16', energy: 'masculine', text: 'I value discipline and self-control.', order: 16 },
  { id: 'masc-17', energy: 'masculine', text: 'I feel energized by accomplishing tasks.', order: 17 },
  { id: 'masc-18', energy: 'masculine', text: 'I stand firm in my convictions.', order: 18 },
  { id: 'masc-19', energy: 'masculine', text: 'I prefer linear, step-by-step approaches.', order: 19 },
  { id: 'masc-20', energy: 'masculine', text: 'I am comfortable being alone.', order: 20 },
  { id: 'masc-21', energy: 'masculine', text: 'I take initiative rather than waiting for others.', order: 21 },
  { id: 'masc-22', energy: 'masculine', text: 'I value efficiency and getting things done.', order: 22 },

  // FEMININE ENERGY (22 questions)
  { id: 'fem-1', energy: 'feminine', text: 'I trust my intuition when making decisions.', order: 23 },
  { id: 'fem-2', energy: 'feminine', text: 'I am comfortable expressing my emotions.', order: 24 },
  { id: 'fem-3', energy: 'feminine', text: 'I value connection and relationships deeply.', order: 25 },
  { id: 'fem-4', energy: 'feminine', text: 'I nurture and care for others naturally.', order: 26 },
  { id: 'fem-5', energy: 'feminine', text: 'I am open to receiving help from others.', order: 27 },
  { id: 'fem-6', energy: 'feminine', text: 'I embrace the flow of life\'s changes.', order: 28 },
  { id: 'fem-7', energy: 'feminine', text: 'I value collaboration over competition.', order: 29 },
  { id: 'fem-8', energy: 'feminine', text: 'I am in tune with my body\'s wisdom.', order: 30 },
  { id: 'fem-9', energy: 'feminine', text: 'I appreciate beauty and aesthetics.', order: 31 },
  { id: 'fem-10', energy: 'feminine', text: 'I am comfortable with vulnerability.', order: 32 },
  { id: 'fem-11', energy: 'feminine', text: 'I create warm, welcoming environments.', order: 33 },
  { id: 'fem-12', energy: 'feminine', text: 'I value empathy and understanding.', order: 34 },
  { id: 'fem-13', energy: 'feminine', text: 'I am patient and allow things to unfold naturally.', order: 35 },
  { id: 'fem-14', energy: 'feminine', text: 'I express creativity freely.', order: 36 },
  { id: 'fem-15', energy: 'feminine', text: 'I am comfortable with ambiguity and mystery.', order: 37 },
  { id: 'fem-16', energy: 'feminine', text: 'I listen deeply to others.', order: 38 },
  { id: 'fem-17', energy: 'feminine', text: 'I value rest and restoration.', order: 39 },
  { id: 'fem-18', energy: 'feminine', text: 'I trust in divine timing.', order: 40 },
  { id: 'fem-19', energy: 'feminine', text: 'I am sensual and present in my body.', order: 41 },
  { id: 'fem-20', energy: 'feminine', text: 'I embrace my softness as strength.', order: 42 },
  { id: 'fem-21', energy: 'feminine', text: 'I am attuned to the emotions of others.', order: 43 },
  { id: 'fem-22', energy: 'feminine', text: 'I value process as much as outcome.', order: 44 },
]

// Calculate Balance scores
export function calculateBalanceScores(answers: Record<string, number>): BalanceScore {
  const masculineQuestions = balanceQuestions.filter(q => q.energy === 'masculine')
  const feminineQuestions = balanceQuestions.filter(q => q.energy === 'feminine')

  const masculineRaw = masculineQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
  const feminineRaw = feminineQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)

  const masculineMax = masculineQuestions.length * 5
  const feminineMax = feminineQuestions.length * 5

  const masculine = Math.round((masculineRaw / masculineMax) * 100)
  const feminine = Math.round((feminineRaw / feminineMax) * 100)

  // Balance: -100 (fully feminine) to +100 (fully masculine), 0 = balanced
  const total = masculine + feminine
  const balance = total === 0 ? 0 : Math.round(((masculine - feminine) / total) * 100)

  let dominantEnergy: 'masculine' | 'feminine' | 'balanced'
  if (Math.abs(balance) <= 15) {
    dominantEnergy = 'balanced'
  } else if (balance > 0) {
    dominantEnergy = 'masculine'
  } else {
    dominantEnergy = 'feminine'
  }

  return {
    masculine,
    feminine,
    balance,
    dominantEnergy,
  }
}

// Get interpretation based on balance
export function getBalanceInterpretation(scores: BalanceScore): string {
  const { balance, dominantEnergy, masculine, feminine } = scores

  if (dominantEnergy === 'balanced') {
    return `Your energies are beautifully balanced. With ${masculine}% masculine and ${feminine}% feminine expression, you have access to both your doing and being modes. You can take decisive action when needed and also rest in receptivity. This balance allows you to adapt fluidly to life's demands.`
  }

  if (dominantEnergy === 'masculine') {
    if (balance > 50) {
      return `You express strongly through masculine energy (${masculine}% vs ${feminine}% feminine). While your drive, focus, and action-orientation serve you well, you may benefit from cultivating more receptivity, intuition, and emotional expression. Consider practices that help you slow down and connect with your inner wisdom.`
    }
    return `You lean toward masculine energy (${masculine}% vs ${feminine}% feminine). Your strength lies in decisiveness and goal-orientation. To find greater harmony, explore practices that nurture your intuitive, creative, and receptive side.`
  }

  if (balance < -50) {
    return `You express strongly through feminine energy (${feminine}% vs ${masculine}% masculine). Your intuition, nurturing, and emotional depth are gifts. You may benefit from developing more structure, boundaries, and decisive action. Consider practices that help you step into your power and take bold action.`
  }
  return `You lean toward feminine energy (${feminine}% vs ${masculine}% masculine). Your openness and receptivity are strengths. To find greater balance, explore practices that develop your assertiveness, structure, and goal-setting abilities.`
}
