// Assessment Types

export type SeedId = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown'
export type SeasonId = 'spring' | 'summer' | 'fall' | 'winter'
export type EnergyType = 'masculine' | 'feminine'

// Base question type
export interface AssessmentQuestion {
  id: string
  text: string
  order: number
  seed?: SeedId
  energy?: EnergyType
  season?: SeasonId
  category?: string
}

// Likert scale answer options
export const answerOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
] as const

// Seed definition
export interface Seed {
  id: SeedId
  name: string
  color: string
  theme: string
  description: string
  virtues: string[]
}

// Score for a single seed
export interface SeedScore {
  raw: number
  max: number
  percentage: number
  level: 'blocked' | 'developing' | 'balanced' | 'flourishing'
}

// All seed scores
export type SevenSeedsScores = Record<SeedId, SeedScore>

// Balance assessment types
export interface BalanceScore {
  masculine: number
  feminine: number
  balance: number // -100 to 100, negative = more feminine, positive = more masculine
  dominantEnergy: 'masculine' | 'feminine' | 'balanced'
}

// Compass/Seasons assessment types
export interface SeasonScore {
  raw: number
  max: number
  percentage: number
}

export interface CompassScores {
  currentSeason: SeasonId
  seasonScores: Record<SeasonId, SeasonScore>
  fearResponse: 'fight' | 'flight' | 'freeze' | 'fawn'
}

// Generic assessment result
export interface AssessmentAnswers {
  [questionId: string]: number
}

// Assessment metadata
export interface AssessmentMeta {
  id: string
  title: string
  shortTitle: string
  description: string
  questionCount: number
  estimatedMinutes: number
  badge: string
}
