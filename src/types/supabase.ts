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
      profiles: {
        Row: {
          id: string
          email: string
          password: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          created_at: string
          expires_at: string
          token: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          expires_at: string
          token: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          expires_at?: string
          token?: string
        }
      }
      sections: {
        Row: {
          id: string
          name: string
          title: string
          subtitle: string | null
          order_number: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          subtitle?: string | null
          order_number: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          subtitle?: string | null
          order_number?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      content_blocks: {
        Row: {
          id: string
          section_id: string
          title: string | null
          content: string
          media_url: string | null
          start_date: string | null
          end_date: string | null
          order_number: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_id: string
          title?: string | null
          content: string
          media_url?: string | null
          start_date?: string | null
          end_date?: string | null
          order_number: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_id?: string
          title?: string | null
          content?: string
          media_url?: string | null
          start_date?: string | null
          end_date?: string | null
          order_number?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      navigation_items: {
        Row: {
          id: string
          name: string
          url: string
          order_number: number
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          url: string
          order_number: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
          order_number?: number
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}