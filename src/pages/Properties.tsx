import React, { useState, useMemo, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<PropertyUnit[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // Fetch properties with tenant information
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (propertiesError) throw propertiesError;

        // Fetch tenants separately
        const { data: tenantsData, error: tenantsError } = await supabase
          .from('tenants')
          .select('*')
          .eq('is_active', true);

        if (tenantsError) throw tenantsError;

        // Map database properties to PropertyUnit interface
        const mappedProperties: PropertyUnit[] = (propertiesData || []).map(prop => {
          // Find active tenant for this property
          const tenant = tenantsData?.find(t => t.property_id === prop.id);
          
          return {
            id: prop.id,
            property_id: prop.property_code,
            property_name: prop.property_name,
            full_address: prop.full_address,
            street_address: prop.street_address,
            unit_number: tenant?.unit_number || '',
            address_variations: [], // Not in DB, could be computed if needed
            is_active: prop.is_active,
            is_occupied: !!tenant, // Property is occupied if it has an active tenant
            tenant_name: tenant?.tenant_name || null,
            access_notes: tenant?.access_instructions || null,
            parking_info: tenant?.parking_spot || null,
            emergency_contact: prop.emergency_contact,
            manager_name: prop.manager_name,
            manager_phone: prop.manager_phone,
            manager_email: prop.manager_email,
            created_at: prop.created_at,
            updated_at: prop.updated_at,
          };
        });

        setProperties(mappedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error",
          description: "Failed to load properties. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
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
  }, [properties, filters]);

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
      {loading ? (
        <Card className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading properties...</p>
          </div>
        </Card>
      ) : filteredProperties.length > 0 ? (
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