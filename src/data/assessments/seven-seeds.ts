import { AssessmentQuestion, SeedScore, SevenSeedsScores, Seed, SeedId } from './types'

// The Seven Seeds (mapped to energy centers / chakras)
export const seeds: Seed[] = [
  {
    id: 'root' as SeedId,
    name: 'Root',
    color: '#E53935',
    theme: 'Safety & Survival',
    description: 'Your foundation — physical safety, security, basic needs, and connection to the earth.',
    virtues: ['Faith', 'Trust', 'Groundedness'],
  },
  {
    id: 'sacral' as SeedId,
    name: 'Sacral',
    color: '#FB8C00',
    theme: 'Creativity & Emotion',
    description: 'Your emotional flow — creativity, pleasure, relationships, and adaptability.',
    virtues: ['Joy', 'Creativity', 'Emotional Fluency'],
  },
  {
    id: 'solar' as SeedId,
    name: 'Solar Plexus',
    color: '#FDD835',
    theme: 'Power & Will',
    description: 'Your inner fire — personal power, self-esteem, confidence, and will.',
    virtues: ['Courage', 'Discipline', 'Integrity'],
  },
  {
    id: 'heart' as SeedId,
    name: 'Heart',
    color: '#43A047',
    theme: 'Love & Connection',
    description: 'Your center of love — compassion, forgiveness, connection, and unconditional love.',
    virtues: ['Love', 'Compassion', 'Forgiveness'],
  },
  {
    id: 'throat' as SeedId,
    name: 'Throat',
    color: '#1E88E5',
    theme: 'Truth & Expression',
    description: 'Your voice — authentic expression, communication, and speaking your truth.',
    virtues: ['Truth', 'Authenticity', 'Clear Communication'],
  },
  {
    id: 'third-eye' as SeedId,
    name: 'Third Eye',
    color: '#5E35B1',
    theme: 'Intuition & Insight',
    description: 'Your inner vision — intuition, wisdom, imagination, and spiritual insight.',
    virtues: ['Wisdom', 'Intuition', 'Discernment'],
  },
  {
    id: 'crown' as SeedId,
    name: 'Crown',
    color: '#8E24AA',
    theme: 'Spirit & Transcendence',
    description: 'Your connection to the divine — spirituality, purpose, and transcendence.',
    virtues: ['Faith', 'Surrender', 'Divine Connection'],
  },
]

// Questions for the Seven Seeds Assessment (91 questions, 13 per seed)
// These are placeholder questions - replace with actual assessment content
export const sevenSeedsQuestions: AssessmentQuestion[] = [
  // ROOT SEED (13 questions)
  { id: 'root-1', seed: 'root', text: 'I feel physically safe in my daily life.', order: 1 },
  { id: 'root-2', seed: 'root', text: 'I trust that my basic needs will be met.', order: 2 },
  { id: 'root-3', seed: 'root', text: 'I feel grounded and connected to my body.', order: 3 },
  { id: 'root-4', seed: 'root', text: 'I have a stable living situation.', order: 4 },
  { id: 'root-5', seed: 'root', text: 'I feel secure in my financial situation.', order: 5 },
  { id: 'root-6', seed: 'root', text: 'I take care of my physical health.', order: 6 },
  { id: 'root-7', seed: 'root', text: 'I feel connected to my family or community.', order: 7 },
  { id: 'root-8', seed: 'root', text: 'I can rely on others when I need support.', order: 8 },
  { id: 'root-9', seed: 'root', text: 'I feel at home in my body.', order: 9 },
  { id: 'root-10', seed: 'root', text: 'I trust the process of life.', order: 10 },
  { id: 'root-11', seed: 'root', text: 'I feel present and aware of my surroundings.', order: 11 },
  { id: 'root-12', seed: 'root', text: 'I have routines that give my life structure.', order: 12 },
  { id: 'root-13', seed: 'root', text: 'I feel a sense of belonging.', order: 13 },

  // SACRAL SEED (13 questions)
  { id: 'sacral-1', seed: 'sacral', text: 'I allow myself to feel my emotions fully.', order: 14 },
  { id: 'sacral-2', seed: 'sacral', text: 'I express my creativity regularly.', order: 15 },
  { id: 'sacral-3', seed: 'sacral', text: 'I enjoy healthy pleasures without guilt.', order: 16 },
  { id: 'sacral-4', seed: 'sacral', text: 'I adapt well to change.', order: 17 },
  { id: 'sacral-5', seed: 'sacral', text: 'I have healthy boundaries in relationships.', order: 18 },
  { id: 'sacral-6', seed: 'sacral', text: 'I can be playful and spontaneous.', order: 19 },
  { id: 'sacral-7', seed: 'sacral', text: 'I am comfortable with my sensuality.', order: 20 },
  { id: 'sacral-8', seed: 'sacral', text: 'I can go with the flow when needed.', order: 21 },
  { id: 'sacral-9', seed: 'sacral', text: 'I nurture my close relationships.', order: 22 },
  { id: 'sacral-10', seed: 'sacral', text: 'I allow myself to experience joy.', order: 23 },
  { id: 'sacral-11', seed: 'sacral', text: 'I am in touch with my desires.', order: 24 },
  { id: 'sacral-12', seed: 'sacral', text: 'I can process and release difficult emotions.', order: 25 },
  { id: 'sacral-13', seed: 'sacral', text: 'I feel emotionally balanced.', order: 26 },

  // SOLAR PLEXUS SEED (13 questions)
  { id: 'solar-1', seed: 'solar', text: 'I believe in my ability to achieve my goals.', order: 27 },
  { id: 'solar-2', seed: 'solar', text: 'I have a clear sense of purpose.', order: 28 },
  { id: 'solar-3', seed: 'solar', text: 'I take responsibility for my actions.', order: 29 },
  { id: 'solar-4', seed: 'solar', text: 'I can stand up for myself when needed.', order: 30 },
  { id: 'solar-5', seed: 'solar', text: 'I feel confident in who I am.', order: 31 },
  { id: 'solar-6', seed: 'solar', text: 'I can make decisions without excessive doubt.', order: 32 },
  { id: 'solar-7', seed: 'solar', text: 'I follow through on my commitments.', order: 33 },
  { id: 'solar-8', seed: 'solar', text: 'I have healthy self-discipline.', order: 34 },
  { id: 'solar-9', seed: 'solar', text: 'I feel worthy of success and good things.', order: 35 },
  { id: 'solar-10', seed: 'solar', text: 'I can handle criticism without crumbling.', order: 36 },
  { id: 'solar-11', seed: 'solar', text: 'I have courage to face challenges.', order: 37 },
  { id: 'solar-12', seed: 'solar', text: 'I feel in control of my life.', order: 38 },
  { id: 'solar-13', seed: 'solar', text: 'I honor my own needs and boundaries.', order: 39 },

  // HEART SEED (13 questions)
  { id: 'heart-1', seed: 'heart', text: 'I give and receive love freely.', order: 40 },
  { id: 'heart-2', seed: 'heart', text: 'I can forgive others who have hurt me.', order: 41 },
  { id: 'heart-3', seed: 'heart', text: 'I practice compassion toward myself.', order: 42 },
  { id: 'heart-4', seed: 'heart', text: 'I feel connected to others.', order: 43 },
  { id: 'heart-5', seed: 'heart', text: 'I can open my heart despite past wounds.', order: 44 },
  { id: 'heart-6', seed: 'heart', text: 'I experience gratitude regularly.', order: 45 },
  { id: 'heart-7', seed: 'heart', text: 'I accept myself as I am.', order: 46 },
  { id: 'heart-8', seed: 'heart', text: 'I feel empathy for others\' struggles.', order: 47 },
  { id: 'heart-9', seed: 'heart', text: 'I can be vulnerable with those I trust.', order: 48 },
  { id: 'heart-10', seed: 'heart', text: 'I feel love for humanity in general.', order: 49 },
  { id: 'heart-11', seed: 'heart', text: 'I can let go of resentment.', order: 50 },
  { id: 'heart-12', seed: 'heart', text: 'I nurture loving relationships.', order: 51 },
  { id: 'heart-13', seed: 'heart', text: 'I feel at peace with my heart.', order: 52 },

  // THROAT SEED (13 questions)
  { id: 'throat-1', seed: 'throat', text: 'I express my thoughts and feelings clearly.', order: 53 },
  { id: 'throat-2', seed: 'throat', text: 'I speak my truth even when it\'s difficult.', order: 54 },
  { id: 'throat-3', seed: 'throat', text: 'I am a good listener.', order: 55 },
  { id: 'throat-4', seed: 'throat', text: 'I can say no when I need to.', order: 56 },
  { id: 'throat-5', seed: 'throat', text: 'I communicate honestly with others.', order: 57 },
  { id: 'throat-6', seed: 'throat', text: 'I feel heard and understood.', order: 58 },
  { id: 'throat-7', seed: 'throat', text: 'I express myself authentically.', order: 59 },
  { id: 'throat-8', seed: 'throat', text: 'I can articulate my needs clearly.', order: 60 },
  { id: 'throat-9', seed: 'throat', text: 'I use my voice to create positive change.', order: 61 },
  { id: 'throat-10', seed: 'throat', text: 'I am comfortable with silence.', order: 62 },
  { id: 'throat-11', seed: 'throat', text: 'I choose my words thoughtfully.', order: 63 },
  { id: 'throat-12', seed: 'throat', text: 'I feel free to express my creativity.', order: 64 },
  { id: 'throat-13', seed: 'throat', text: 'I live in alignment with my truth.', order: 65 },

  // THIRD EYE SEED (13 questions)
  { id: 'third-eye-1', seed: 'third-eye', text: 'I trust my intuition.', order: 66 },
  { id: 'third-eye-2', seed: 'third-eye', text: 'I can see beyond surface appearances.', order: 67 },
  { id: 'third-eye-3', seed: 'third-eye', text: 'I have a vivid imagination.', order: 68 },
  { id: 'third-eye-4', seed: 'third-eye', text: 'I pay attention to my dreams.', order: 69 },
  { id: 'third-eye-5', seed: 'third-eye', text: 'I can discern truth from illusion.', order: 70 },
  { id: 'third-eye-6', seed: 'third-eye', text: 'I am open to new perspectives.', order: 71 },
  { id: 'third-eye-7', seed: 'third-eye', text: 'I have moments of insight or clarity.', order: 72 },
  { id: 'third-eye-8', seed: 'third-eye', text: 'I seek wisdom and understanding.', order: 73 },
  { id: 'third-eye-9', seed: 'third-eye', text: 'I can visualize my goals clearly.', order: 74 },
  { id: 'third-eye-10', seed: 'third-eye', text: 'I reflect on the deeper meaning of life.', order: 75 },
  { id: 'third-eye-11', seed: 'third-eye', text: 'I am aware of patterns in my life.', order: 76 },
  { id: 'third-eye-12', seed: 'third-eye', text: 'I trust the guidance I receive.', order: 77 },
  { id: 'third-eye-13', seed: 'third-eye', text: 'I feel connected to a larger wisdom.', order: 78 },

  // CROWN SEED (13 questions)
  { id: 'crown-1', seed: 'crown', text: 'I feel connected to something greater than myself.', order: 79 },
  { id: 'crown-2', seed: 'crown', text: 'I have a sense of spiritual purpose.', order: 80 },
  { id: 'crown-3', seed: 'crown', text: 'I experience moments of transcendence.', order: 81 },
  { id: 'crown-4', seed: 'crown', text: 'I can surrender control when needed.', order: 82 },
  { id: 'crown-5', seed: 'crown', text: 'I feel at peace with the mystery of life.', order: 83 },
  { id: 'crown-6', seed: 'crown', text: 'I trust in divine timing.', order: 84 },
  { id: 'crown-7', seed: 'crown', text: 'I feel a sense of unity with all life.', order: 85 },
  { id: 'crown-8', seed: 'crown', text: 'I have faith, even in difficult times.', order: 86 },
  { id: 'crown-9', seed: 'crown', text: 'I feel grateful for my existence.', order: 87 },
  { id: 'crown-10', seed: 'crown', text: 'I experience inner peace regularly.', order: 88 },
  { id: 'crown-11', seed: 'crown', text: 'I feel open to divine guidance.', order: 89 },
  { id: 'crown-12', seed: 'crown', text: 'I see the sacred in everyday life.', order: 90 },
  { id: 'crown-13', seed: 'crown', text: 'I feel spiritually fulfilled.', order: 91 },
]

// Scoring function for Seven Seeds
export function calculateSevenSeedsScores(answers: Record<string, number>): SevenSeedsScores {
  const seedIds: SeedId[] = ['root', 'sacral', 'solar', 'heart', 'throat', 'third-eye', 'crown']
  
  const scores = {} as SevenSeedsScores
  
  for (const seedId of seedIds) {
    const seedQuestions = sevenSeedsQuestions.filter(q => q.seed === seedId)
    const seedAnswers = seedQuestions.map(q => answers[q.id] || 0)
    
    // Calculate raw score (sum of answers)
    const rawScore = seedAnswers.reduce((sum, val) => sum + val, 0)
    
    // Calculate max possible score (13 questions × 5 max answer)
    const maxScore = seedQuestions.length * 5
    
    // Calculate percentage (0-100)
    const percentage = Math.round((rawScore / maxScore) * 100)
    
    scores[seedId] = {
      raw: rawScore,
      max: maxScore,
      percentage,
      level: getLevel(percentage),
    }
  }
  
  return scores
}

// Get level description based on percentage
function getLevel(percentage: number): 'blocked' | 'developing' | 'balanced' | 'flourishing' {
  if (percentage < 40) return 'blocked'
  if (percentage < 60) return 'developing'
  if (percentage < 80) return 'balanced'
  return 'flourishing'
}

// Get interpretation for a seed score
export function getSeedInterpretation(seedId: string, level: string): string {
  const seed = seeds.find(s => s.id === seedId)
  if (!seed) return ''
  
  const interpretations: Record<string, Record<string, string>> = {
    blocked: {
      root: 'Your root seed shows signs of blockage. You may be experiencing anxiety around safety, security, or belonging. Focus on grounding practices and building trust.',
      sacral: 'Your sacral seed needs attention. You may be suppressing emotions or struggling with creativity and pleasure. Allow yourself to feel and create.',
      solar: 'Your solar plexus seed is blocked. You may struggle with confidence, boundaries, or personal power. Work on building self-esteem and assertiveness.',
      heart: 'Your heart seed shows blockage. You may have difficulty giving or receiving love, or holding onto resentment. Practice forgiveness and self-compassion.',
      throat: 'Your throat seed is blocked. You may struggle to express yourself authentically or speak your truth. Practice honest communication.',
      'third-eye': 'Your third eye seed needs opening. You may dismiss your intuition or struggle to see beyond the surface. Trust your inner wisdom.',
      crown: 'Your crown seed is blocked. You may feel disconnected from spirit or lack purpose. Explore your relationship with the divine.',
    },
    developing: {
      root: 'Your root seed is developing. Continue building stability and trust. You\'re on the path to feeling more grounded.',
      sacral: 'Your sacral seed is developing. Keep nurturing your emotional expression and creativity. Flow is returning.',
      solar: 'Your solar plexus seed is developing. Your confidence is growing. Continue honoring your personal power.',
      heart: 'Your heart seed is developing. Love and compassion are expanding. Keep practicing openness.',
      throat: 'Your throat seed is developing. Your authentic voice is emerging. Keep speaking your truth.',
      'third-eye': 'Your third eye seed is developing. Your intuition is awakening. Trust the insights you receive.',
      crown: 'Your crown seed is developing. Your spiritual connection is growing. Stay open to the divine.',
    },
    balanced: {
      root: 'Your root seed is well-balanced. You feel generally safe, secure, and grounded. Maintain these foundations.',
      sacral: 'Your sacral seed is balanced. You have healthy emotional flow and creative expression. Keep nurturing this energy.',
      solar: 'Your solar plexus seed is balanced. You have healthy confidence and personal power. Continue honoring your will.',
      heart: 'Your heart seed is balanced. You give and receive love freely. Continue practicing compassion.',
      throat: 'Your throat seed is balanced. You communicate authentically and clearly. Keep speaking your truth.',
      'third-eye': 'Your third eye seed is balanced. You trust your intuition and see clearly. Continue developing wisdom.',
      crown: 'Your crown seed is balanced. You feel connected to spirit and purpose. Nurture this divine connection.',
    },
    flourishing: {
      root: 'Your root seed is flourishing! You feel deeply grounded, safe, and connected. You are a source of stability for others.',
      sacral: 'Your sacral seed is flourishing! You embody creative flow and emotional freedom. Your joy is contagious.',
      solar: 'Your solar plexus seed is flourishing! You radiate confidence and personal power. You inspire others.',
      heart: 'Your heart seed is flourishing! You are a channel of unconditional love. Your compassion heals.',
      throat: 'Your throat seed is flourishing! You speak truth with power and grace. Your voice creates positive change.',
      'third-eye': 'Your third eye seed is flourishing! Your intuition is a reliable guide. You see with spiritual clarity.',
      crown: 'Your crown seed is flourishing! You live in deep connection with the divine. You are spiritually awake.',
    },
  }
  
  return interpretations[level]?.[seedId] || ''
}
