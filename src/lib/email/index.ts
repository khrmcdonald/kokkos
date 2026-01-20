import { getWelcomeEmailHtml, getAssessmentResultsEmailHtml } from './templates'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = 'KOKKOS <hello@kokkos.com>'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email')
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Email send failed:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: 'Welcome to KOKKOS',
    html: getWelcomeEmailHtml(name),
  })
}

export async function sendAssessmentResultsEmail(
  email: string,
  name: string,
  assessmentType: string,
  resultId: string
): Promise<boolean> {
  const resultsUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://kokkos.com'}/results/${resultId}`
  
  const assessmentNames: Record<string, string> = {
    'seven-seeds': 'Seven Seeds',
    'the-balance': 'Balance',
    'the-compass': 'Compass',
  }
  const title = assessmentNames[assessmentType] || assessmentType

  return sendEmail({
    to: email,
    subject: `Your ${title} Assessment Results - KOKKOS`,
    html: getAssessmentResultsEmailHtml(name, assessmentType, resultsUrl),
  })
}
