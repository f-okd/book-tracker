export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Reviews: {
        Row: {
          book_id: string
          comment: string | null
          created_at: string
          id: number
          rating: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          book_id: string
          comment?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          book_id?: string
          comment?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviewsTest: {
        Row: {
          bookId: string | null
          comment: string | null
          created_at: string
          id: number
          rating: number | null
        }
        Insert: {
          bookId?: string | null
          comment?: string | null
          created_at?: string
          id?: number
          rating?: number | null
        }
        Update: {
          bookId?: string | null
          comment?: string | null
          created_at?: string
          id?: number
          rating?: number | null
        }
        Relationships: []
      }
      UserBooks: {
        Row: {
          book_id: string
          created_at: string
          date_completed: string | null
          id: number
          status: string
          user_id: string | null
        }
        Insert: {
          book_id: string
          created_at?: string
          date_completed?: string | null
          id?: number
          status: string
          user_id?: string | null
        }
        Update: {
          book_id?: string
          created_at?: string
          date_completed?: string | null
          id?: number
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "UserBooks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
