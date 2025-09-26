import React, { useState } from 'react';
import { PropertyUnit } from '@/types/property';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Eye, Edit, MessageSquare, Phone, Mail, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertiesTableProps {
  properties: PropertyUnit[];
  onPropertySelect?: (property: PropertyUnit) => void;
  onEditProperty?: (property: PropertyUnit) => void;
  onContactTenant?: (property: PropertyUnit) => void;
  onViewDetails?: (property: PropertyUnit) => void;
}

type SortField = 'property_name' | 'full_address' | 'is_active' | 'is_occupied' | 'created_at';
type SortDirection = 'asc' | 'desc';

const PropertiesTable: React.FC<PropertiesTableProps> = ({
  properties,
  onPropertySelect,
  onEditProperty,
  onContactTenant,
  onViewDetails
}) => {
  const [sortField, setSortField] = useState<SortField>('property_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProperties = [...properties].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
    }
    if (typeof bValue === 'string') {
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const SortableHeader: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </TableHead>
  );

  const truncateText = (text: string, maxLength: number = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-4">No properties found</div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="property_name">Property Name</SortableHeader>
            <SortableHeader field="full_address">Address</SortableHeader>
            <TableHead>Unit</TableHead>
            <SortableHeader field="is_active">Status</SortableHeader>
            <TableHead>Tenant</TableHead>
            <TableHead>Manager</TableHead>
            <SortableHeader field="created_at">Created</SortableHeader>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProperties.map((property) => (
            <TableRow 
              key={property.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onPropertySelect?.(property)}
            >
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="font-semibold">{truncateText(property.property_name, 25)}</span>
                  <span className="text-xs text-muted-foreground">{property.property_id}</span>
                </div>
              </TableCell>
              <TableCell>
                <div title={property.full_address}>
                  {truncateText(property.full_address, 40)}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm">{property.unit_number || '—'}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  <div className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border-0",
                    property.is_active 
                      ? "bg-success/10 text-success" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {property.is_active ? "Active" : "Inactive"}
                  </div>
                  <div className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border-0",
                    property.is_occupied 
                      ? "bg-info/10 text-info" 
                      : "bg-warning/10 text-warning"
                  )}>
                    {property.is_occupied ? "Occupied" : "Vacant"}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{property.tenant_name || '—'}</span>
                  {property.emergency_contact && (
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border-0 bg-destructive/10 text-destructive mt-1 w-fit">
                      Emergency
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{property.manager_name || '—'}</span>
                  {property.manager_phone && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {property.manager_phone}
                    </div>
                  )}
                  {property.manager_email && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {truncateText(property.manager_email, 20)}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {new Date(property.created_at).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails?.(property);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProperty?.(property);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {property.tenant_name && (
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onContactTenant?.(property);
                        }}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Tenant
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PropertiesTable;