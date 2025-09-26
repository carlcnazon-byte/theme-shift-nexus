import React, { useState, useMemo } from 'react';
import { PropertyUnit, PropertyFilters, ViewMode, AddPropertyForm } from '@/types/property';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertiesFilterBar } from '@/components/properties/PropertiesFilterBar';
import { AddPropertyDialog } from '@/components/properties/AddPropertyDialog';
import { PropertyDetailsModal } from '@/components/properties/PropertyDetailsModal';
import PropertiesTable from '@/components/properties/PropertiesTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Grid, List, Plus, Building } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data
const mockProperties: PropertyUnit[] = [
  {
    id: 1,
    property_id: 'PROP-001',
    property_name: 'Sunset Apartments',
    full_address: '123 Main St, Unit 4A, Springfield, IL 62701',
    street_address: '123 Main St',
    unit_number: '4A',
    address_variations: ['123 Main Street', '123 Main St Apt 4A'],
    is_active: true,
    is_occupied: true,
    tenant_name: 'John Smith',
    access_notes: 'Gate code: 1234\nKey under mat',
    parking_info: 'Parking spot A-15',
    emergency_contact: '(555) 999-0000',
    manager_name: 'Sarah Wilson',
    manager_phone: '(555) 123-4567',
    manager_email: 'sarah@demo.com',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:30:00Z',
  },
  {
    id: 2,
    property_id: 'PROP-002',
    property_name: 'Oak Valley Condos',
    full_address: '456 Oak Ave, Unit B12, Springfield, IL 62702',
    street_address: '456 Oak Ave',
    unit_number: 'B12',
    address_variations: ['456 Oak Avenue'],
    is_active: true,
    is_occupied: false,
    tenant_name: null,
    access_notes: 'Lockbox code: 5678',
    parking_info: 'Street parking available',
    emergency_contact: null,
    manager_name: 'Mike Johnson',
    manager_phone: '(555) 987-6543',
    manager_email: 'mike@demo.com',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-18T16:45:00Z',
  },
  {
    id: 3,
    property_id: 'PROP-003',
    property_name: 'Pine Ridge Townhomes',
    full_address: '789 Pine Rd, Unit 15, Springfield, IL 62703',
    street_address: '789 Pine Rd',
    unit_number: '15',
    address_variations: ['789 Pine Road'],
    is_active: false,
    is_occupied: false,
    tenant_name: null,
    access_notes: null,
    parking_info: 'Garage included',
    emergency_contact: '(555) 111-2222',
    manager_name: 'Lisa Davis',
    manager_phone: '(555) 456-7890',
    manager_email: 'lisa@demo.com',
    created_at: '2024-01-05T11:30:00Z',
    updated_at: '2024-01-12T13:20:00Z',
  },
  {
    id: 4,
    property_id: 'PROP-004',
    property_name: 'Riverside Lofts',
    full_address: '321 River St, Unit 8C, Springfield, IL 62704',
    street_address: '321 River St',
    unit_number: '8C',
    address_variations: ['321 River Street'],
    is_active: true,
    is_occupied: true,
    tenant_name: 'Emma Johnson',
    access_notes: 'Buzzer #8C to enter building',
    parking_info: 'Parking garage level 2',
    emergency_contact: '(555) 333-4444',
    manager_name: 'Tom Wilson',
    manager_phone: '(555) 654-3210',
    manager_email: 'tom@demo.com',
    created_at: '2024-01-08T14:15:00Z',
    updated_at: '2024-01-22T10:30:00Z',
  },
];

const Properties: React.FC = () => {
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    is_active: null,
    is_occupied: null,
    has_emergency: false,
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyUnit | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          property.property_name.toLowerCase().includes(searchLower) ||
          property.full_address.toLowerCase().includes(searchLower) ||
          property.tenant_name?.toLowerCase().includes(searchLower) ||
          property.manager_name?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Active filter
      if (filters.is_active !== null && property.is_active !== filters.is_active) {
        return false;
      }

      // Occupied filter
      if (filters.is_occupied !== null && property.is_occupied !== filters.is_occupied) {
        return false;
      }

      // Emergency contact filter
      if (filters.has_emergency && !property.emergency_contact) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<PropertyFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      is_active: null,
      is_occupied: null,
      has_emergency: false,
    });
  };

  const handleAddProperty = (data: AddPropertyForm) => {
    console.log('Adding property:', data);
    toast({
      title: "Property Added",
      description: `${data.property_name} has been successfully added.`,
    });
  };

  const handleEditProperty = (property: PropertyUnit) => {
    console.log('Editing property:', property);
    toast({
      title: "Edit Property",
      description: "Property editing functionality would be implemented here.",
    });
  };

  const handleViewDetails = (property: PropertyUnit) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  const handleContactTenant = (property: PropertyUnit) => {
    console.log('Contacting tenant for property:', property);
    toast({
      title: "Contact Tenant",
      description: `Tenant contact functionality for ${property.tenant_name} would be implemented here.`,
    });
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground mt-1">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value: ViewMode) => value && setViewMode(value)}
            className="border rounded-lg p-1"
          >
            <ToggleGroupItem value="grid" aria-label="Grid view" size="sm">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" size="sm">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Add Property Button */}
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Filters */}
      <PropertiesFilterBar
        filters={filters}
        onFiltersChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalResults={filteredProperties.length}
      />

      {/* Main Content */}
      {filteredProperties.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEditProperty}
                onViewDetails={handleViewDetails}
                onContactTenant={handleContactTenant}
              />
            ))}
          </div>
        ) : (
          <PropertiesTable 
            properties={filteredProperties}
            onPropertySelect={handleViewDetails}
            onEditProperty={handleEditProperty}
            onContactTenant={handleContactTenant}
            onViewDetails={handleViewDetails}
          />
        )
      ) : (
        <Card className="p-8">
          <div className="text-center">
            <Building className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">
              {filters.search || filters.is_active !== null || filters.is_occupied !== null || filters.has_emergency
                ? 'No properties found'
                : 'No properties yet'
              }
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {filters.search || filters.is_active !== null || filters.is_occupied !== null || filters.has_emergency
                ? 'Try adjusting your filters to find the properties you\'re looking for.'
                : 'Get started by adding your first property to the system.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {(filters.search || filters.is_active !== null || filters.is_occupied !== null || filters.has_emergency) && (
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Dialogs */}
      <AddPropertyDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddProperty}
      />

      <PropertyDetailsModal
        property={selectedProperty}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        onEdit={handleEditProperty}
        onContactTenant={handleContactTenant}
      />
    </div>
  );
};

export default Properties;