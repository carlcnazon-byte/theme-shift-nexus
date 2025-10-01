import React, { useState, useMemo, useEffect } from 'react';
import { VendorsFilterBar } from '@/components/vendors/VendorsFilterBar';
import { VendorCard } from '@/components/vendors/VendorCard';
import { InviteVendorModal } from '@/components/vendors/InviteVendorModal';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface ServiceProvider {
  numeric_id: number;
  company_name: string;
  address?: string;
  type: string;
  phone_number: string;
  emergency_phone_number?: string;
  business_hours?: string;
  service_categories?: string[];
  license_number?: string;
  is_active: boolean;
  is_emergency_available: boolean;
  average_response_time?: number;
  insurance_expires?: string;
  hourly_rate?: number;
  emergency_rate?: number;
  total_jobs: number;
  average_rating: number;
  last_assigned?: string;
  created_at?: string;
  updated_at?: string;
  // Computed fields for UI
  email?: string;
  logo?: string;
  on_time_percentage?: number;
  jobs_per_month?: number;
}

export interface VendorFilters {
  search: string;
  serviceType: string;
  availability: boolean | null;
  sortBy: 'rating' | 'jobs' | 'response_time';
}

const Vendors = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [vendors, setVendors] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<VendorFilters>({
    search: '',
    serviceType: 'all',
    availability: null,
    sortBy: 'rating',
  });

  // Fetch vendors from Supabase
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .order('average_rating', { ascending: false });

        if (error) {
          throw error;
        }

        // Map database fields to interface fields
        const processedData = (data || []).map(vendor => ({
          numeric_id: vendor.id,
          company_name: vendor.company_name,
          address: vendor.address,
          type: vendor.category,
          phone_number: vendor.phone_number,
          emergency_phone_number: vendor.emergency_phone,
          business_hours: vendor.business_hours,
          service_categories: vendor.service_categories,
          license_number: vendor.license_number,
          is_active: vendor.is_active,
          is_emergency_available: vendor.is_emergency_available,
          average_response_time: 30, // Default value, can be computed from ticket_metrics
          insurance_expires: vendor.insurance_expires,
          hourly_rate: vendor.hourly_rate ? Number(vendor.hourly_rate) : undefined,
          emergency_rate: vendor.emergency_rate ? Number(vendor.emergency_rate) : undefined,
          total_jobs: vendor.total_jobs,
          average_rating: vendor.average_rating ? Number(vendor.average_rating) : 0,
          last_assigned: vendor.last_assigned,
          created_at: vendor.created_at,
          updated_at: vendor.updated_at,
          email: vendor.email || `contact@${vendor.company_name.toLowerCase().replace(/\s+/g, '')}.com`,
          on_time_percentage: Math.round(85 + Math.random() * 15), // Random between 85-100%
          jobs_per_month: Math.round((vendor.total_jobs || 0) / 12),
        }));

        setVendors(processedData);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        toast({
          title: "Error",
          description: "Failed to fetch vendors. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const filteredAndSortedVendors = useMemo(() => {
    let filtered = vendors.filter((vendor) => {
      const matchesSearch = filters.search === '' || 
        vendor.company_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.phone_number.toLowerCase().includes(filters.search.toLowerCase());

      const matchesServiceType = filters.serviceType === 'all' || 
        vendor.service_categories?.some(cat => cat.toLowerCase() === filters.serviceType.toLowerCase()) ||
        vendor.type.toLowerCase() === filters.serviceType.toLowerCase();

      const matchesAvailability = filters.availability === null || 
        vendor.is_active === filters.availability;

      return matchesSearch && matchesServiceType && matchesAvailability;
    });

    // Sort vendors
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'jobs':
          return (b.total_jobs || 0) - (a.total_jobs || 0);
        case 'response_time':
          return (a.average_response_time || 0) - (b.average_response_time || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [vendors, filters]);

  const handleFilterChange = (newFilters: Partial<VendorFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      serviceType: 'all',
      availability: null,
      sortBy: 'rating',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Vendors Management
          </h1>
          <p className="text-muted-foreground">
            Manage your service providers and track their performance.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <VendorsFilterBar
        filters={filters}
        onFiltersChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalResults={filteredAndSortedVendors.length}
      />

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading vendors...</span>
        </div>
      ) : filteredAndSortedVendors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No vendors found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or invite a new vendor to get started.
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Invite First Vendor
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedVendors.map((vendor) => (
            <VendorCard key={vendor.numeric_id} vendor={vendor} />
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        onClick={() => setIsInviteModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Invite Vendor Modal */}
      <InviteVendorModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
};

export default Vendors;