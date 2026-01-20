# KOKKOS Interactive Platform

The world's first comprehensive soul and body assessment grounded in Christian theology and eastern wisdom.

## Features

- **Three Assessments**
  - **Seven Seeds**: 91 questions mapping to 7 energy centers (chakras)
  - **The Balance**: 44 questions exploring masculine/feminine energy
  - **The Compass**: 40 questions discovering your current life season

- **User Accounts**
  - Email/password authentication via Supabase
  - Save and track assessment results over time
  - Personal dashboard

- **Email Integration**
  - Welcome emails for new users
  - Assessment results emails
  - Newsletter signup

- **Admin Dashboard**
  - User analytics
  - Assessment completion metrics
  - Email subscriber tracking

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database/Auth**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Resend account (for emails)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy environment variables:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL in \`supabase/schema.sql\` in the SQL Editor
   - Copy your project URL and anon key to \`.env.local\`

5. Set up Resend (optional, for emails):
   - Create a Resend account
   - Get your API key and add to \`.env.local\`

6. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard
│   ├── assessments/        # Assessment pages
│   │   ├── seven-seeds/
│   │   ├── the-balance/
│   │   └── the-compass/
│   ├── auth/               # Auth pages (login, signup)
│   ├── contact/            # Contact page
│   ├── dashboard/          # User dashboard
│   └── results/            # Results viewer
├── components/             # React components
│   ├── AssessmentFlow.tsx
│   ├── EmailCapture.tsx
│   ├── Footer.tsx
│   └── Header.tsx
├── data/
│   └── assessments/        # Assessment data and scoring
├── lib/
│   ├── email/              # Email templates and sending
│   └── supabase/           # Supabase client configuration
└── supabase/
    └── schema.sql          # Database schema
\`\`\`

## Design System

### Colors

- **Sage**: Primary brand color (\`#5d7a4a\`)
- **Cream**: Background color (\`#f8f6f3\`)
- **Chakra colors**: Red, orange, yellow, green, blue, indigo, purple

### Fonts

- **Headings**: Cormorant Garamond
- **Body**: Quicksand

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

All rights reserved © KOKKOS
