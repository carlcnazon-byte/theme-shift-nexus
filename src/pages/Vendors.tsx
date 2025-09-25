import React, { useState, useMemo } from 'react';
import { VendorsFilterBar } from '@/components/vendors/VendorsFilterBar';
import { VendorCard } from '@/components/vendors/VendorCard';
import { InviteVendorModal } from '@/components/vendors/InviteVendorModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export interface ServiceProvider {
  id: string;
  company_name: string;
  phone_number: string;
  email: string;
  service_categories: string[];
  average_rating: number;
  total_jobs: number;
  average_response_time: number;
  is_active: boolean;
  hourly_rate?: number;
  logo?: string;
  on_time_percentage: number;
  jobs_per_month: number;
}

export interface VendorFilters {
  search: string;
  serviceType: string;
  availability: boolean | null;
  sortBy: 'rating' | 'jobs' | 'response_time';
}

const Vendors = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [filters, setFilters] = useState<VendorFilters>({
    search: '',
    serviceType: 'all',
    availability: null,
    sortBy: 'rating',
  });

  // Mock vendor data
  const mockVendors: ServiceProvider[] = [
    {
      id: '1',
      company_name: 'Emergency Plumbing Co.',
      phone_number: '+1 (555) 123-4567',
      email: 'contact@emergencyplumbing.com',
      service_categories: ['Plumbing'],
      average_rating: 4.8,
      total_jobs: 156,
      average_response_time: 45,
      is_active: true,
      hourly_rate: 85,
      on_time_percentage: 94,
      jobs_per_month: 28,
    },
    {
      id: '2',
      company_name: 'Climate Control Experts',
      phone_number: '+1 (555) 987-6543',
      email: 'info@climatecontrol.com',
      service_categories: ['HVAC'],
      average_rating: 4.6,
      total_jobs: 89,
      average_response_time: 120,
      is_active: true,
      hourly_rate: 95,
      on_time_percentage: 88,
      jobs_per_month: 18,
    },
    {
      id: '3',
      company_name: 'PowerTech Electric',
      phone_number: '+1 (555) 456-7890',
      email: 'service@powertech.com',
      service_categories: ['Electrical'],
      average_rating: 4.9,
      total_jobs: 234,
      average_response_time: 60,
      is_active: true,
      hourly_rate: 90,
      on_time_percentage: 96,
      jobs_per_month: 35,
    },
    {
      id: '4',
      company_name: 'General Maintenance LLC',
      phone_number: '+1 (555) 321-0987',
      email: 'hello@generalmaintenance.com',
      service_categories: ['General', 'Plumbing'],
      average_rating: 4.3,
      total_jobs: 312,
      average_response_time: 90,
      is_active: true,
      hourly_rate: 65,
      on_time_percentage: 85,
      jobs_per_month: 42,
    },
    {
      id: '5',
      company_name: 'SecureLock Services',
      phone_number: '+1 (555) 654-3210',
      email: 'contact@securelock.com',
      service_categories: ['Locksmith'],
      average_rating: 4.7,
      total_jobs: 78,
      average_response_time: 30,
      is_active: true,
      hourly_rate: 120,
      on_time_percentage: 92,
      jobs_per_month: 15,
    },
    {
      id: '6',
      company_name: 'BugBusters Pest Control',
      phone_number: '+1 (555) 789-0123',
      email: 'info@bugbusters.com',
      service_categories: ['Pest Control'],
      average_rating: 4.4,
      total_jobs: 145,
      average_response_time: 180,
      is_active: false,
      hourly_rate: 75,
      on_time_percentage: 78,
      jobs_per_month: 22,
    },
    {
      id: '7',
      company_name: 'AllServices Pro',
      phone_number: '+1 (555) 147-2580',
      email: 'team@allservicespro.com',
      service_categories: ['General', 'Electrical', 'Plumbing', 'HVAC'],
      average_rating: 4.5,
      total_jobs: 198,
      average_response_time: 75,
      is_active: true,
      hourly_rate: 80,
      on_time_percentage: 90,
      jobs_per_month: 38,
    },
    {
      id: '8',
      company_name: 'QuickFix Solutions',
      phone_number: '+1 (555) 369-2580',
      email: 'support@quickfix.com',
      service_categories: ['Electrical', 'General'],
      average_rating: 4.2,
      total_jobs: 67,
      average_response_time: 105,
      is_active: true,
      hourly_rate: 70,
      on_time_percentage: 82,
      jobs_per_month: 16,
    },
  ];

  const filteredAndSortedVendors = useMemo(() => {
    let filtered = mockVendors.filter((vendor) => {
      const matchesSearch = filters.search === '' || 
        vendor.company_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesServiceType = filters.serviceType === 'all' || 
        vendor.service_categories.some(cat => cat.toLowerCase() === filters.serviceType.toLowerCase());

      const matchesAvailability = filters.availability === null || 
        vendor.is_active === filters.availability;

      return matchesSearch && matchesServiceType && matchesAvailability;
    });

    // Sort vendors
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.average_rating - a.average_rating;
        case 'jobs':
          return b.total_jobs - a.total_jobs;
        case 'response_time':
          return a.average_response_time - b.average_response_time;
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockVendors, filters]);

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

      {/* Vendors Grid */}
      {filteredAndSortedVendors.length === 0 ? (
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
            <VendorCard key={vendor.id} vendor={vendor} />
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