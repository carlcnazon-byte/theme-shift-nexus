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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      communications: {
        Row: {
          cost: number | null
          delivered_at: string | null
          error_message: string | null
          id: number
          message: string
          message_id: string | null
          property_id: string | null
          recipient: string
          retry_count: number | null
          sent_at: string | null
          status: string | null
          ticket_id: string | null
          type: string
          updated_at: string
        }
        Insert: {
          cost?: number | null
          delivered_at?: string | null
          error_message?: string | null
          id?: number
          message: string
          message_id?: string | null
          property_id?: string | null
          recipient: string
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          ticket_id?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          cost?: number | null
          delivered_at?: string | null
          error_message?: string | null
          id?: number
          message?: string
          message_id?: string | null
          property_id?: string | null
          recipient?: string
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          ticket_id?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_communications_ticket"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      property_units: {
        Row: {
          access_notes: string | null
          address_variations: string[] | null
          created_at: string | null
          emergency_contact: string | null
          full_address: string
          id: number
          is_active: boolean | null
          is_occupied: boolean | null
          manager_email: string | null
          manager_name: string | null
          manager_phone: string | null
          parking_info: string | null
          property_id: string
          property_name: string
          street_address: string | null
          tenant_name: string | null
          unit_number: string | null
          updated_at: string | null
        }
        Insert: {
          access_notes?: string | null
          address_variations?: string[] | null
          created_at?: string | null
          emergency_contact?: string | null
          full_address: string
          id?: number
          is_active?: boolean | null
          is_occupied?: boolean | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          parking_info?: string | null
          property_id: string
          property_name: string
          street_address?: string | null
          tenant_name?: string | null
          unit_number?: string | null
          updated_at?: string | null
        }
        Update: {
          access_notes?: string | null
          address_variations?: string[] | null
          created_at?: string | null
          emergency_contact?: string | null
          full_address?: string
          id?: number
          is_active?: boolean | null
          is_occupied?: boolean | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          parking_info?: string | null
          property_id?: string
          property_name?: string
          street_address?: string | null
          tenant_name?: string | null
          unit_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_providers: {
        Row: {
          address: string | null
          average_rating: number | null
          average_response_time: number | null
          business_hours: string | null
          company_name: string
          created_at: string | null
          emergency_phone_number: string | null
          emergency_rate: number | null
          hourly_rate: number | null
          insurance_expires: string | null
          is_active: boolean | null
          is_emergency_available: boolean | null
          last_assigned: string | null
          license_number: string | null
          numeric_id: number
          phone_number: string
          service_categories: string[] | null
          total_jobs: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          average_rating?: number | null
          average_response_time?: number | null
          business_hours?: string | null
          company_name: string
          created_at?: string | null
          emergency_phone_number?: string | null
          emergency_rate?: number | null
          hourly_rate?: number | null
          insurance_expires?: string | null
          is_active?: boolean | null
          is_emergency_available?: boolean | null
          last_assigned?: string | null
          license_number?: string | null
          numeric_id?: never
          phone_number: string
          service_categories?: string[] | null
          total_jobs?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          average_rating?: number | null
          average_response_time?: number | null
          business_hours?: string | null
          company_name?: string
          created_at?: string | null
          emergency_phone_number?: string | null
          emergency_rate?: number | null
          hourly_rate?: number | null
          insurance_expires?: string | null
          is_active?: boolean | null
          is_emergency_available?: boolean | null
          last_assigned?: string | null
          license_number?: string | null
          numeric_id?: never
          phone_number?: string
          service_categories?: string[] | null
          total_jobs?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ticket_metrics: {
        Row: {
          api_calls_count: number | null
          classification_accuracy: number | null
          classification_time: number | null
          created_at: string | null
          error_count: number | null
          first_response_time: number | null
          id: number
          resolution_time: number | null
          tenant_satisfaction_score: number | null
          ticket_id: string | null
          total_processing_time: number | null
          updated_at: string
          vendor_response_time: number | null
        }
        Insert: {
          api_calls_count?: number | null
          classification_accuracy?: number | null
          classification_time?: number | null
          created_at?: string | null
          error_count?: number | null
          first_response_time?: number | null
          id?: number
          resolution_time?: number | null
          tenant_satisfaction_score?: number | null
          ticket_id?: string | null
          total_processing_time?: number | null
          updated_at?: string
          vendor_response_time?: number | null
        }
        Update: {
          api_calls_count?: number | null
          classification_accuracy?: number | null
          classification_time?: number | null
          created_at?: string | null
          error_count?: number | null
          first_response_time?: number | null
          id?: number
          resolution_time?: number | null
          tenant_satisfaction_score?: number | null
          ticket_id?: string | null
          total_processing_time?: number | null
          updated_at?: string
          vendor_response_time?: number | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          additional_details: string | null
          audio_url: string | null
          call_duration: number | null
          category: string | null
          created_at: string | null
          first_name: string | null
          id: number
          issue_description: string | null
          last_tenant_sms: string | null
          last_vendor_sms: string | null
          phone_number: string | null
          preferred_language: string | null
          property_id: string | null
          property_unit: number | null
          property_unit_id: number | null
          resolved_at: string | null
          response_time: number | null
          service_provider_id: number | null
          status: string | null
          tenant_notified_at: string | null
          ticket_id: string
          transcript: string | null
          unit_address: string | null
          updated_at: string | null
          urgency: string
          vendor_accepted_at: string | null
          vendor_eta: number | null
          vendor_notified_at: string | null
          vendor_phone: string | null
        }
        Insert: {
          additional_details?: string | null
          audio_url?: string | null
          call_duration?: number | null
          category?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          issue_description?: string | null
          last_tenant_sms?: string | null
          last_vendor_sms?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          property_id?: string | null
          property_unit?: number | null
          property_unit_id?: number | null
          resolved_at?: string | null
          response_time?: number | null
          service_provider_id?: number | null
          status?: string | null
          tenant_notified_at?: string | null
          ticket_id: string
          transcript?: string | null
          unit_address?: string | null
          updated_at?: string | null
          urgency: string
          vendor_accepted_at?: string | null
          vendor_eta?: number | null
          vendor_notified_at?: string | null
          vendor_phone?: string | null
        }
        Update: {
          additional_details?: string | null
          audio_url?: string | null
          call_duration?: number | null
          category?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          issue_description?: string | null
          last_tenant_sms?: string | null
          last_vendor_sms?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          property_id?: string | null
          property_unit?: number | null
          property_unit_id?: number | null
          resolved_at?: string | null
          response_time?: number | null
          service_provider_id?: number | null
          status?: string | null
          tenant_notified_at?: string | null
          ticket_id?: string
          transcript?: string | null
          unit_address?: string | null
          updated_at?: string | null
          urgency?: string
          vendor_accepted_at?: string | null
          vendor_eta?: number | null
          vendor_notified_at?: string | null
          vendor_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_tickets_property"
            columns: ["property_unit_id"]
            isOneToOne: false
            referencedRelation: "property_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tickets_property_unit"
            columns: ["property_unit"]
            isOneToOne: false
            referencedRelation: "property_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tickets_service_provider"
            columns: ["service_provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["numeric_id"]
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
      ticket_status:
        | "open"
        | "assigned"
        | "in_progress"
        | "pending_parts"
        | "pending_access"
        | "resolved"
        | "closed"
        | "cancelled"
        | "escalated"
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
      ticket_status: [
        "open",
        "assigned",
        "in_progress",
        "pending_parts",
        "pending_access",
        "resolved",
        "closed",
        "cancelled",
        "escalated",
      ],
    },
  },
} as const
