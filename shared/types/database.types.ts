export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      business: {
        Row: {
          created_at: string
          email: string | null
          id: number
          logo_path: string | null
          logo_url: string | null
          name: string | null
          onboarded_at: string | null
          owner_id: string | null
          phone: string | null
          primary_color: string | null
          reward_goal: number | null
          reward_label: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          logo_path?: string | null
          logo_url?: string | null
          name?: string | null
          onboarded_at?: string | null
          owner_id?: string | null
          phone?: string | null
          primary_color?: string | null
          reward_goal?: number | null
          reward_label?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          logo_path?: string | null
          logo_url?: string | null
          name?: string | null
          onboarded_at?: string | null
          owner_id?: string | null
          phone?: string | null
          primary_color?: string | null
          reward_goal?: number | null
          reward_label?: string | null
        }
        Relationships: []
      }
      client: {
        Row: {
          auth_id: string
          created_at: string
          email: string
          id: number
          updated_at: string
        }
        Insert: {
          auth_id?: string
          created_at?: string
          email: string
          id?: number
          updated_at?: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          email?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          delta: number
          id: number
          new_punches: number | null
          old_punches: number | null
          type: Database["public"]["Enums"]["event_type"]
          wallet_id: number | null
        }
        Insert: {
          created_at?: string
          delta: number
          id?: number
          new_punches?: number | null
          old_punches?: number | null
          type: Database["public"]["Enums"]["event_type"]
          wallet_id?: number | null
        }
        Update: {
          created_at?: string
          delta?: number
          id?: number
          new_punches?: number | null
          old_punches?: number | null
          type?: Database["public"]["Enums"]["event_type"]
          wallet_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "events_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallet"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet: {
        Row: {
          business_id: number | null
          client_id: number | null
          created_at: string
          id: number
          last_scan_at: string | null
          punches: number
          updated_at: string | null
        }
        Insert: {
          business_id?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          last_scan_at?: string | null
          punches?: number
          updated_at?: string | null
        }
        Update: {
          business_id?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          last_scan_at?: string | null
          punches?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "client"
            referencedColumns: ["id"]
          },
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
      event_type: "scan" | "add" | "remove" | "redeem"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_type: ["scan", "add", "remove", "redeem"],
    },
  },
} as const
