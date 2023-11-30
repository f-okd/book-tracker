export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Reviews: {
        Row: {
          book_id: string;
          book_title: string;
          comment: string | null;
          date_completed: string | null;
          date_started: string | null;
          id: number;
          rating: number | null;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          book_id: string;
          book_title?: string;
          comment?: string | null;
          date_completed?: string | null;
          date_started?: string | null;
          id?: number;
          rating?: number | null;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          book_id?: string;
          book_title?: string;
          comment?: string | null;
          date_completed?: string | null;
          date_started?: string | null;
          id?: number;
          rating?: number | null;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Reviews_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
