export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AssessmentType = 'seven-seeds' | 'the-balance' | 'the-compass'
export type Gender = 'male' | 'female'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessment_results: {
        Row: {
          id: string
          user_id: string | null
          assessment_type: AssessmentType
          gender: Gender | null
          answers: Json
          scores: Json
          completed_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          assessment_type: AssessmentType
          gender?: Gender | null
          answers: Json
          scores: Json
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          assessment_type?: AssessmentType
          gender?: Gender | null
          answers?: Json
          scores?: Json
          completed_at?: string
        }
      }
      email_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
          unsubscribed_at: string | null
          source: string
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          source?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          source?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
          read_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
          read_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
          read_at?: string | null
        }
      }
    }
    Views: {
      daily_signups: {
        Row: {
          date: string
          signups: number
        }
      }
      assessment_stats: {
        Row: {
          assessment_type: AssessmentType
          total_completed: number
          logged_in_users: number
          anonymous_users: number
        }
      }
      daily_assessments: {
        Row: {
          date: string
          assessment_type: AssessmentType
          completions: number
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type AssessmentResult = Database['public']['Tables']['assessment_results']['Row']
export type EmailSubscriber = Database['public']['Tables']['email_subscribers']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type AssessmentResultInsert = Database['public']['Tables']['assessment_results']['Insert']
export type EmailSubscriberInsert = Database['public']['Tables']['email_subscribers']['Insert']
export type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert']
