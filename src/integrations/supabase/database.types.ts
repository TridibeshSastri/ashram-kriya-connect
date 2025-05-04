
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
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: 'devotee' | 'mentor' | 'admin';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'devotee' | 'mentor' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'devotee' | 'mentor' | 'admin';
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      assign_role: {
        Args: {
          target_user_id: string;
          role_to_assign: 'devotee' | 'mentor' | 'admin';
        };
        Returns: undefined;
      };
      remove_role: {
        Args: {
          target_user_id: string;
          role_to_remove: 'devotee' | 'mentor' | 'admin';
        };
        Returns: undefined;
      };
      get_my_roles: {
        Args: Record<string, never>;
        Returns: 'devotee' | 'mentor' | 'admin';
      };
      has_role: {
        Args: {
          requested_user_id: string;
          requested_role: 'devotee' | 'mentor' | 'admin';
        };
        Returns: boolean;
      };
    };
    Enums: {
      user_role: 'devotee' | 'mentor' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
