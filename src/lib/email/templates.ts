// Email templates for KOKKOS

export function getWelcomeEmailHtml(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to KOKKOS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f6f3; font-family: 'Quicksand', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f6f3; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #5d7a4a 0%, #6b7c5e 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">KOKKOS</h1>
              <p style="margin: 5px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; letter-spacing: 0.1em;">Powered by Christ.OS</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #3d4a3d; font-size: 24px; font-weight: 400; font-family: 'Cormorant Garamond', Georgia, serif;">
                Welcome, ${name || 'Seeker'}
              </h2>
              <p style="margin: 0 0 20px; color: #4a5a4a; font-size: 16px; line-height: 1.7;">
                Thank you for joining KOKKOS. You've taken the first step on a journey of self-discovery.
              </p>
              <p style="margin: 0 0 30px; color: #4a5a4a; font-size: 16px; line-height: 1.7;">
                KOKKOS offers three assessments to help you understand your soul's energy centers, your masculine and feminine balance, and your current life season.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://kokkos.com/assessments" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #5d7a4a 0%, #6b7c5e 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 14px; font-weight: 600;">
                      Begin Your Journey
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f5f2ed; border-top: 1px solid rgba(107, 124, 94, 0.1);">
              <p style="margin: 0 0 10px; color: #6b7c5e; font-size: 14px; font-style: italic; text-align: center;">
                Never stop quietly growing.
              </p>
              <p style="margin: 0; color: #8a9a7e; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} KOKKOS. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function getAssessmentResultsEmailHtml(
  name: string,
  assessmentType: string,
  resultsUrl: string
): string {
  const assessmentNames: Record<string, string> = {
    'seven-seeds': 'The Seven Seeds',
    'the-balance': 'The Balance',
    'the-compass': 'The Compass of Seasons',
  }
  const title = assessmentNames[assessmentType] || assessmentType

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Assessment Results - KOKKOS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f6f3; font-family: 'Quicksand', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f6f3; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #5d7a4a 0%, #6b7c5e 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">KOKKOS</h1>
              <p style="margin: 5px 0 0; color: rgba(255,255,255,0.8); font-size: 12px; letter-spacing: 0.1em;">Powered by Christ.OS</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #3d4a3d; font-size: 24px; font-weight: 400; font-family: 'Cormorant Garamond', Georgia, serif;">
                Your ${title} Results
              </h2>
              <p style="margin: 0 0 20px; color: #4a5a4a; font-size: 16px; line-height: 1.7;">
                Hi ${name || 'there'},
              </p>
              <p style="margin: 0 0 20px; color: #4a5a4a; font-size: 16px; line-height: 1.7;">
                You've completed ${title} assessment. Your results have been saved and you can view them anytime.
              </p>
              <p style="margin: 0 0 30px; color: #4a5a4a; font-size: 16px; line-height: 1.7;">
                Take time to reflect on what these insights mean for your journey.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${resultsUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #5d7a4a 0%, #6b7c5e 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 14px; font-weight: 600;">
                      View Your Results
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f5f2ed; border-top: 1px solid rgba(107, 124, 94, 0.1);">
              <p style="margin: 0 0 10px; color: #6b7c5e; font-size: 14px; font-style: italic; text-align: center;">
                Never stop quietly growing.
              </p>
              <p style="margin: 0; color: #8a9a7e; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} KOKKOS. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
