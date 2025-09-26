export interface Property {
  id: string;
  name: string;
  address: string;
  status: 'Active' | 'Inactive' | 'Maintenance' | 'Pending' | 'Sold';
  createdAt: string;
}

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

// Mock data for properties
export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Main St, New York, NY 10001',
    status: 'Active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Ocean View Condos',
    address: '456 Ocean Ave, Miami, FL 33139',
    status: 'Active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Mountain Ridge',
    address: '789 Hill Rd, Denver, CO 80202',
    status: 'Maintenance',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'City Center Plaza',
    address: '321 Downtown Blvd, Chicago, IL 60601',
    status: 'Pending',
    createdAt: '2024-03-25',
  },
  {
    id: '5',
    name: 'Garden Homes',
    address: '654 Garden Way, Austin, TX 78701',
    status: 'Inactive',
    createdAt: '2024-04-05',
  },
];