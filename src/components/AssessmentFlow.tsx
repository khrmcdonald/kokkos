'use client'

import { useState, useCallback } from 'react'
import { AssessmentQuestion, answerOptions } from '@/data/assessments/types'

interface AssessmentFlowProps {
  questions: AssessmentQuestion[]
  onComplete: (answers: Record<string, number>) => void
  title?: string
  accentColor?: string
}

export function AssessmentFlow({ 
  questions, 
  onComplete, 
  title = 'Assessment',
  accentColor = '#5d7a4a' 
}: AssessmentFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isFirstQuestion = currentIndex === 0
  const isLastQuestion = currentIndex === questions.length - 1
  const currentAnswer = answers[currentQuestion?.id]

  const handleAnswer = useCallback((value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }, [currentQuestion?.id])

  const handleNext = useCallback(() => {
    if (!currentAnswer) return
    
    if (isLastQuestion) {
      onComplete(answers)
      return
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setIsTransitioning(false)
    }, 200)
  }, [currentAnswer, isLastQuestion, answers, onComplete])

  const handlePrevious = useCallback(() => {
    if (isFirstQuestion) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(prev => prev - 1)
      setIsTransitioning(false)
    }, 200)
  }, [isFirstQuestion])

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream to-cream-dark flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-sage/10">
        <div className="max-w-[800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-sage-dark">{title}</span>
            <span className="text-sm text-text-muted">
              {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="h-2 bg-sage/10 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: accentColor 
              }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-32">
        <div 
          className={`max-w-[600px] w-full transition-all duration-200 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Question Number */}
          <div className="text-center mb-8">
            <span 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-semibold text-lg"
              style={{ backgroundColor: accentColor }}
            >
              {currentIndex + 1}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="font-heading text-2xl md:text-3xl text-sage-dark text-center leading-relaxed mb-12">
            {currentQuestion.text}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  currentAnswer === option.value
                    ? 'border-current bg-white shadow-lg'
                    : 'border-sage/20 bg-white/50 hover:border-sage/40 hover:bg-white'
                }`}
                style={{
                  borderColor: currentAnswer === option.value ? accentColor : undefined,
                  color: currentAnswer === option.value ? accentColor : undefined,
                }}
              >
                <div className="flex items-center gap-4">
                  <span 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      currentAnswer === option.value ? 'border-current' : 'border-sage/30'
                    }`}
                  >
                    {currentAnswer === option.value && (
                      <span 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                  </span>
                  <span className={`font-medium ${
                    currentAnswer === option.value ? '' : 'text-text-body'
                  }`}>
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-sage/10">
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isFirstQuestion 
                ? 'text-sage-light cursor-not-allowed' 
                : 'text-sage hover:text-sage-dark'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              currentAnswer
                ? 'text-white shadow-lg hover:-translate-y-0.5'
                : 'bg-sage-light text-white cursor-not-allowed'
            }`}
            style={{
              backgroundColor: currentAnswer ? accentColor : undefined,
            }}
          >
            {isLastQuestion ? 'Complete' : 'Next'}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
