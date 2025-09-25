import React from 'react';
import { PropertyUnit } from '@/types/property';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Phone, Mail, MoreVertical, Eye, Edit, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: PropertyUnit;
  onEdit: (property: PropertyUnit) => void;
  onViewDetails: (property: PropertyUnit) => void;
  onContactTenant: (property: PropertyUnit) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
  onViewDetails,
  onContactTenant,
}) => {
  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-emerald-500 text-white border-emerald-500">
        🟢 Active
      </Badge>
    ) : (
      <Badge className="bg-slate-500 text-white border-slate-500">
        ⚫ Inactive
      </Badge>
    );
  };

  const getOccupancyBadge = (isOccupied: boolean) => {
    return isOccupied ? (
      <Badge className="bg-teal-500 text-white border-teal-500">
        🏠 Occupied
      </Badge>
    ) : (
      <Badge className="bg-amber-500 text-white border-amber-500">
        🏠 Vacant
      </Badge>
    );
  };

  const getEmergencyBadge = () => {
    if (property.emergency_contact) {
      return (
        <Badge className="bg-red-500 text-white border-red-500">
          🚨 Emergency
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10",
      "hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate flex items-center gap-2">
              🏢 {property.property_name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {property.full_address}
              {property.unit_number && `, Unit ${property.unit_number}`}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(property)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(property)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Property
              </DropdownMenuItem>
              {property.tenant_name && (
                <DropdownMenuItem onClick={() => onContactTenant(property)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Tenant
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-xs font-medium text-muted-foreground">Status</div>
            <div className="flex flex-wrap gap-2">
              {getStatusBadge(property.is_active)}
              {getOccupancyBadge(property.is_occupied)}
              {getEmergencyBadge()}
            </div>
          </div>

          {property.tenant_name && (
            <div className="flex flex-col gap-1">
              <div className="text-xs font-medium text-muted-foreground">Tenant</div>
              <div className="text-sm font-medium text-foreground">{property.tenant_name}</div>
            </div>
          )}

          {property.manager_name && (
            <div className="flex flex-col gap-1">
              <div className="text-xs font-medium text-muted-foreground">Manager</div>
              <div className="text-sm font-medium text-foreground">{property.manager_name}</div>
              {property.manager_phone && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {property.manager_phone}
                </div>
              )}
              {property.manager_email && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {property.manager_email}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
          <Button
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(property)}
            className="flex-1 min-w-0"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          <Button
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(property)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          {property.tenant_name && (
            <Button
              variant="outline" 
              size="sm" 
              onClick={() => onContactTenant(property)}
              className="bg-teal-500/10 border-teal-500/20 text-teal-600 hover:bg-teal-500/20"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};