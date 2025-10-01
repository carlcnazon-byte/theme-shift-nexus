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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      communications: {
        Row: {
          cost: number | null
          created_at: string | null
          delivered_at: string | null
          direction: string
          error_message: string | null
          id: number
          message: string
          message_id: string | null
          property_id: number | null
          provider: string | null
          read_at: string | null
          recipient: string
          retry_count: number | null
          sent_at: string | null
          status: string | null
          ticket_id: string
          type: string
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          delivered_at?: string | null
          direction: string
          error_message?: string | null
          id?: number
          message: string
          message_id?: string | null
          property_id?: number | null
          provider?: string | null
          read_at?: string | null
          recipient: string
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          ticket_id: string
          type: string
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          delivered_at?: string | null
          direction?: string
          error_message?: string | null
          id?: number
          message?: string
          message_id?: string | null
          property_id?: number | null
          provider?: string | null
          read_at?: string | null
          recipient?: string
          retry_count?: number | null
          sent_at?: string | null
          status?: string | null
          ticket_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          city: string
          created_at: string | null
          emergency_contact: string | null
          full_address: string
          id: number
          is_active: boolean | null
          manager_email: string | null
          manager_name: string | null
          manager_phone: string | null
          postal_code: string
          property_code: string
          property_name: string
          province: string | null
          street_address: string
          total_units: number | null
          updated_at: string | null
        }
        Insert: {
          city: string
          created_at?: string | null
          emergency_contact?: string | null
          full_address: string
          id?: number
          is_active?: boolean | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          postal_code: string
          property_code: string
          property_name: string
          province?: string | null
          street_address: string
          total_units?: number | null
          updated_at?: string | null
        }
        Update: {
          city?: string
          created_at?: string | null
          emergency_contact?: string | null
          full_address?: string
          id?: number
          is_active?: boolean | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone?: string | null
          postal_code?: string
          property_code?: string
          property_name?: string
          province?: string | null
          street_address?: string
          total_units?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tenants: {
        Row: {
          access_instructions: string | null
          created_at: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: number
          is_active: boolean | null
          lease_end_date: string | null
          lease_start_date: string | null
          parking_spot: string | null
          pet_info: string | null
          phone_number: string
          preferred_language: string | null
          property_id: number
          special_notes: string | null
          tenant_name: string
          unit_number: string
          updated_at: string | null
        }
        Insert: {
          access_instructions?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: number
          is_active?: boolean | null
          lease_end_date?: string | null
          lease_start_date?: string | null
          parking_spot?: string | null
          pet_info?: string | null
          phone_number: string
          preferred_language?: string | null
          property_id: number
          special_notes?: string | null
          tenant_name: string
          unit_number: string
          updated_at?: string | null
        }
        Update: {
          access_instructions?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: number
          is_active?: boolean | null
          lease_end_date?: string | null
          lease_start_date?: string | null
          parking_spot?: string | null
          pet_info?: string | null
          phone_number?: string
          preferred_language?: string | null
          property_id?: number
          special_notes?: string | null
          tenant_name?: string
          unit_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenants_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_metrics: {
        Row: {
          address_verification_time: number | null
          call_answer_time: number | null
          classification_accuracy: number | null
          classification_time: number | null
          created_at: string | null
          error_count: number | null
          first_response_time: number | null
          id: number
          resolution_time: number | null
          retry_count: number | null
          tenant_satisfaction_score: number | null
          ticket_id: string
          total_api_calls: number | null
          total_processing_time: number | null
          vendor_performance_score: number | null
          vendor_response_time: number | null
        }
        Insert: {
          address_verification_time?: number | null
          call_answer_time?: number | null
          classification_accuracy?: number | null
          classification_time?: number | null
          created_at?: string | null
          error_count?: number | null
          first_response_time?: number | null
          id?: number
          resolution_time?: number | null
          retry_count?: number | null
          tenant_satisfaction_score?: number | null
          ticket_id: string
          total_api_calls?: number | null
          total_processing_time?: number | null
          vendor_performance_score?: number | null
          vendor_response_time?: number | null
        }
        Update: {
          address_verification_time?: number | null
          call_answer_time?: number | null
          classification_accuracy?: number | null
          classification_time?: number | null
          created_at?: string | null
          error_count?: number | null
          first_response_time?: number | null
          id?: number
          resolution_time?: number | null
          retry_count?: number | null
          tenant_satisfaction_score?: number | null
          ticket_id?: string
          total_api_calls?: number | null
          total_processing_time?: number | null
          vendor_performance_score?: number | null
          vendor_response_time?: number | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          audio_url: string | null
          call_duration: number | null
          caller_name: string | null
          caller_phone: string
          category: string
          classification_confidence: number | null
          created_at: string | null
          id: number
          issue_description: string
          issue_summary: string | null
          preferred_language: string | null
          property_id: number | null
          recording_id: string | null
          resolution_notes: string | null
          resolution_time: number | null
          resolved_at: string | null
          response_time: number | null
          sentiment: string | null
          status: string | null
          tenant_id: number | null
          ticket_id: string
          transcript: string | null
          unit_number: string
          updated_at: string | null
          urgency: string
          vendor_accepted_at: string | null
          vendor_arrival_at: string | null
          vendor_eta: number | null
          vendor_id: number | null
          vendor_notified_at: string | null
        }
        Insert: {
          audio_url?: string | null
          call_duration?: number | null
          caller_name?: string | null
          caller_phone: string
          category: string
          classification_confidence?: number | null
          created_at?: string | null
          id?: number
          issue_description: string
          issue_summary?: string | null
          preferred_language?: string | null
          property_id?: number | null
          recording_id?: string | null
          resolution_notes?: string | null
          resolution_time?: number | null
          resolved_at?: string | null
          response_time?: number | null
          sentiment?: string | null
          status?: string | null
          tenant_id?: number | null
          ticket_id: string
          transcript?: string | null
          unit_number: string
          updated_at?: string | null
          urgency: string
          vendor_accepted_at?: string | null
          vendor_arrival_at?: string | null
          vendor_eta?: number | null
          vendor_id?: number | null
          vendor_notified_at?: string | null
        }
        Update: {
          audio_url?: string | null
          call_duration?: number | null
          caller_name?: string | null
          caller_phone?: string
          category?: string
          classification_confidence?: number | null
          created_at?: string | null
          id?: number
          issue_description?: string
          issue_summary?: string | null
          preferred_language?: string | null
          property_id?: number | null
          recording_id?: string | null
          resolution_notes?: string | null
          resolution_time?: number | null
          resolved_at?: string | null
          response_time?: number | null
          sentiment?: string | null
          status?: string | null
          tenant_id?: number | null
          ticket_id?: string
          transcript?: string | null
          unit_number?: string
          updated_at?: string | null
          urgency?: string
          vendor_accepted_at?: string | null
          vendor_arrival_at?: string | null
          vendor_eta?: number | null
          vendor_id?: number | null
          vendor_notified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "v_tenant_directory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          average_rating: number | null
          business_hours: string | null
          category: string
          company_name: string
          contact_person: string | null
          coverage_areas: string[] | null
          created_at: string | null
          email: string | null
          emergency_phone: string | null
          emergency_rate: number | null
          hourly_rate: number | null
          id: number
          insurance_expires: string | null
          is_active: boolean | null
          is_emergency_available: boolean | null
          last_assigned: string | null
          license_number: string | null
          notes: string | null
          phone_number: string
          service_categories: string[] | null
          total_jobs: number | null
          updated_at: string | null
          vendor_code: string
        }
        Insert: {
          address?: string | null
          average_rating?: number | null
          business_hours?: string | null
          category: string
          company_name: string
          contact_person?: string | null
          coverage_areas?: string[] | null
          created_at?: string | null
          email?: string | null
          emergency_phone?: string | null
          emergency_rate?: number | null
          hourly_rate?: number | null
          id?: number
          insurance_expires?: string | null
          is_active?: boolean | null
          is_emergency_available?: boolean | null
          last_assigned?: string | null
          license_number?: string | null
          notes?: string | null
          phone_number: string
          service_categories?: string[] | null
          total_jobs?: number | null
          updated_at?: string | null
          vendor_code: string
        }
        Update: {
          address?: string | null
          average_rating?: number | null
          business_hours?: string | null
          category?: string
          company_name?: string
          contact_person?: string | null
          coverage_areas?: string[] | null
          created_at?: string | null
          email?: string | null
          emergency_phone?: string | null
          emergency_rate?: number | null
          hourly_rate?: number | null
          id?: number
          insurance_expires?: string | null
          is_active?: boolean | null
          is_emergency_available?: boolean | null
          last_assigned?: string | null
          license_number?: string | null
          notes?: string | null
          phone_number?: string
          service_categories?: string[] | null
          total_jobs?: number | null
          updated_at?: string | null
          vendor_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_active_tickets: {
        Row: {
          category: string | null
          created_at: string | null
          id: number | null
          issue_summary: string | null
          property_code: string | null
          property_name: string | null
          status: string | null
          tenant_name: string | null
          tenant_phone: string | null
          ticket_id: string | null
          unit_number: string | null
          urgency: string | null
          vendor_category: string | null
          vendor_eta: number | null
          vendor_name: string | null
          vendor_phone: string | null
        }
        Relationships: []
      }
      v_tenant_directory: {
        Row: {
          access_instructions: string | null
          id: number | null
          is_active: boolean | null
          phone_number: string | null
          preferred_language: string | null
          property_address: string | null
          property_code: string | null
          property_name: string | null
          tenant_name: string | null
          unit_number: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
