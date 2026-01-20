import { AssessmentQuestion, SeasonId, CompassScores, SeasonScore } from './types'

// Season definitions
export const seasons = [
  {
    id: 'spring' as SeasonId,
    name: 'Spring',
    color: '#4CAF50',
    theme: 'New Beginnings',
    description: 'A time of planting seeds, fresh starts, and emerging possibilities.',
    qualities: ['Hope', 'Curiosity', 'Renewal', 'Energy'],
  },
  {
    id: 'summer' as SeasonId,
    name: 'Summer',
    color: '#FF9800',
    theme: 'Full Expression',
    description: 'A time of abundance, visibility, and reaching your full potential.',
    qualities: ['Confidence', 'Joy', 'Expansion', 'Celebration'],
  },
  {
    id: 'fall' as SeasonId,
    name: 'Fall',
    color: '#F44336',
    theme: 'Harvest & Release',
    description: 'A time of gathering wisdom, letting go, and preparing for rest.',
    qualities: ['Gratitude', 'Release', 'Wisdom', 'Transition'],
  },
  {
    id: 'winter' as SeasonId,
    name: 'Winter',
    color: '#2196F3',
    theme: 'Rest & Reflection',
    description: 'A time of going inward, rest, and deep reflection.',
    qualities: ['Rest', 'Stillness', 'Reflection', 'Gestation'],
  },
]

// Fear response definitions
export const fearResponses = [
  {
    id: 'fight',
    name: 'Fight',
    description: 'You meet challenges head-on with energy and confrontation.',
    shadow: 'Can become aggression or controlling behavior.',
    growth: 'Channel this energy into assertive, not aggressive, action.',
  },
  {
    id: 'flight',
    name: 'Flight',
    description: 'You protect yourself by moving away from threats.',
    shadow: 'Can become avoidance or running from necessary challenges.',
    growth: 'Learn when to stay and face what needs attention.',
  },
  {
    id: 'freeze',
    name: 'Freeze',
    description: 'You become still and wait for danger to pass.',
    shadow: 'Can become paralysis or inability to make decisions.',
    growth: 'Practice small actions to build momentum.',
  },
  {
    id: 'fawn',
    name: 'Fawn',
    description: 'You adapt to please others and avoid conflict.',
    shadow: 'Can become people-pleasing or loss of self.',
    growth: 'Practice setting boundaries and honoring your own needs.',
  },
]

// Questions for The Compass Assessment (40 questions)
export const compassQuestions: AssessmentQuestion[] = [
  // SPRING (10 questions)
  { id: 'spring-1', season: 'spring', text: 'I feel excited about new possibilities in my life.', order: 1 },
  { id: 'spring-2', season: 'spring', text: 'I am ready to start fresh in some area of my life.', order: 2 },
  { id: 'spring-3', season: 'spring', text: 'I feel hopeful about the future.', order: 3 },
  { id: 'spring-4', season: 'spring', text: 'I am curious and open to learning new things.', order: 4 },
  { id: 'spring-5', season: 'spring', text: 'I feel energy rising within me for new projects.', order: 5 },
  { id: 'spring-6', season: 'spring', text: 'I am planting seeds for future growth.', order: 6 },
  { id: 'spring-7', season: 'spring', text: 'I feel a sense of renewal and rebirth.', order: 7 },
  { id: 'spring-8', season: 'spring', text: 'I am taking initiative on things I care about.', order: 8 },
  { id: 'spring-9', season: 'spring', text: 'I feel lighter and more optimistic lately.', order: 9 },
  { id: 'spring-10', season: 'spring', text: 'I am emerging from a period of rest or dormancy.', order: 10 },

  // SUMMER (10 questions)
  { id: 'summer-1', season: 'summer', text: 'I am experiencing the fullness of my efforts.', order: 11 },
  { id: 'summer-2', season: 'summer', text: 'I feel confident and visible in my life.', order: 12 },
  { id: 'summer-3', season: 'summer', text: 'I am celebrating achievements and milestones.', order: 13 },
  { id: 'summer-4', season: 'summer', text: 'I feel expansive and abundant.', order: 14 },
  { id: 'summer-5', season: 'summer', text: 'I am sharing my gifts with the world.', order: 15 },
  { id: 'summer-6', season: 'summer', text: 'I feel at the peak of my energy and expression.', order: 16 },
  { id: 'summer-7', season: 'summer', text: 'I am enjoying the fruits of my labor.', order: 17 },
  { id: 'summer-8', season: 'summer', text: 'I feel joy and celebration in my daily life.', order: 18 },
  { id: 'summer-9', season: 'summer', text: 'I am operating at full capacity.', order: 19 },
  { id: 'summer-10', season: 'summer', text: 'I feel seen and appreciated for who I am.', order: 20 },

  // FALL (10 questions)
  { id: 'fall-1', season: 'fall', text: 'I am in a time of transition and change.', order: 21 },
  { id: 'fall-2', season: 'fall', text: 'I am letting go of what no longer serves me.', order: 22 },
  { id: 'fall-3', season: 'fall', text: 'I am harvesting the wisdom from recent experiences.', order: 23 },
  { id: 'fall-4', season: 'fall', text: 'I feel called to simplify and release.', order: 24 },
  { id: 'fall-5', season: 'fall', text: 'I am preparing for a period of rest.', order: 25 },
  { id: 'fall-6', season: 'fall', text: 'I feel gratitude for what I have experienced.', order: 26 },
  { id: 'fall-7', season: 'fall', text: 'I am completing projects and tying up loose ends.', order: 27 },
  { id: 'fall-8', season: 'fall', text: 'I notice things falling away from my life.', order: 28 },
  { id: 'fall-9', season: 'fall', text: 'I am accepting endings as natural parts of cycles.', order: 29 },
  { id: 'fall-10', season: 'fall', text: 'I feel a mix of loss and gratitude.', order: 30 },

  // WINTER (10 questions)
  { id: 'winter-1', season: 'winter', text: 'I need more rest and solitude than usual.', order: 31 },
  { id: 'winter-2', season: 'winter', text: 'I am in a period of deep reflection.', order: 32 },
  { id: 'winter-3', season: 'winter', text: 'I feel called to go inward.', order: 33 },
  { id: 'winter-4', season: 'winter', text: 'I am conserving my energy for later.', order: 34 },
  { id: 'winter-5', season: 'winter', text: 'I am in a fallow time, waiting for clarity.', order: 35 },
  { id: 'winter-6', season: 'winter', text: 'I need stillness and quiet to process.', order: 36 },
  { id: 'winter-7', season: 'winter', text: 'I am gestating something not yet ready to emerge.', order: 37 },
  { id: 'winter-8', season: 'winter', text: 'I feel dormant, but not dead.', order: 38 },
  { id: 'winter-9', season: 'winter', text: 'I am honoring my need for retreat.', order: 39 },
  { id: 'winter-10', season: 'winter', text: 'I trust that this quiet time serves a purpose.', order: 40 },
]

// Fear response questions (embedded in main questions for subtlety)
// These would be additional questions or derived from answer patterns
// For simplicity, we'll determine fear response from low-scoring seasons

export function calculateCompassScores(answers: Record<string, number>): CompassScores {
  const seasonIds: SeasonId[] = ['spring', 'summer', 'fall', 'winter']
  const seasonScores: Record<SeasonId, SeasonScore> = {} as Record<SeasonId, SeasonScore>

  // Calculate scores for each season
  for (const seasonId of seasonIds) {
    const seasonQuestions = compassQuestions.filter(q => q.season === seasonId)
    const raw = seasonQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
    const max = seasonQuestions.length * 5
    const percentage = Math.round((raw / max) * 100)

    seasonScores[seasonId] = { raw, max, percentage }
  }

  // Determine current season (highest scoring)
  let currentSeason: SeasonId = 'spring'
  let highestScore = 0
  for (const seasonId of seasonIds) {
    if (seasonScores[seasonId].percentage > highestScore) {
      highestScore = seasonScores[seasonId].percentage
      currentSeason = seasonId
    }
  }

  // Determine fear response based on lowest season
  // Spring low = freeze (can't start), Summer low = flight (avoid visibility)
  // Fall low = fawn (can't let go), Winter low = fight (can't rest)
  let lowestSeason: SeasonId = 'spring'
  let lowestScore = 100
  for (const seasonId of seasonIds) {
    if (seasonScores[seasonId].percentage < lowestScore) {
      lowestScore = seasonScores[seasonId].percentage
      lowestSeason = seasonId
    }
  }

  const fearResponseMap: Record<SeasonId, 'fight' | 'flight' | 'freeze' | 'fawn'> = {
    spring: 'freeze',
    summer: 'flight',
    fall: 'fawn',
    winter: 'fight',
  }

  return {
    currentSeason,
    seasonScores,
    fearResponse: fearResponseMap[lowestSeason],
  }
}

export function getSeasonInterpretation(season: SeasonId, percentage: number): string {
  const seasonData = seasons.find(s => s.id === season)
  if (!seasonData) return ''

  if (percentage >= 70) {
    return `You are deeply in ${seasonData.name}. ${seasonData.description} Embrace this energy fully.`
  } else if (percentage >= 50) {
    return `${seasonData.name} energy is present in your life. ${seasonData.description}`
  } else {
    return `${seasonData.name} energy is quieter right now. ${seasonData.description} This may be waiting to emerge.`
  }
}
