export interface PropertyUnit {
  id: number;
  property_id: string;
  property_name: string;
  full_address: string;
  street_address: string;
  unit_number: string;
  address_variations: string[];
  is_active: boolean;
  is_occupied: boolean;
  tenant_name: string | null;
  access_notes: string | null;
  parking_info: string | null;
  emergency_contact: string | null;
  manager_name: string | null;
  manager_phone: string | null;
  manager_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface AddPropertyForm {
  property_name: string;
  full_address: string;
  street_address: string;
  unit_number?: string;
  address_variations?: string[];
  is_active: boolean;
  is_occupied: boolean;
  tenant_name?: string;
  access_notes?: string;
  parking_info?: string;
  emergency_contact?: string;
  manager_name?: string;
  manager_phone?: string;
  manager_email?: string;
}

export interface PropertyFilters {
  search: string;
  is_active: boolean | null;
  is_occupied: boolean | null;
  has_emergency: boolean;
}

export type ViewMode = 'grid' | 'list';