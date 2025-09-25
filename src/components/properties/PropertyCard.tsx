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
  return (
    <Card className={cn(
      "flex flex-col h-full min-h-[420px] p-4 gap-3 rounded-2xl",
      "transition-all duration-200 hover:shadow-lg hover:shadow-accent/10",
      "hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50"
    )}>
      {/* Header Row - Fixed height and alignment */}
      <div className="flex items-start justify-between gap-2 min-h-[48px]">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base text-foreground truncate leading-tight">
            🏢 {property.property_name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 truncate leading-tight">
            {property.full_address}
            {property.unit_number && `, Unit ${property.unit_number}`}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
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

      {/* Status Row - Always present, consistent order */}
      <div className="flex flex-col gap-2">
        <div className="text-xs font-medium text-muted-foreground">Status</div>
        <div className="flex flex-wrap gap-2">
          {/* Active/Inactive Badge */}
          <Badge className={cn(
            "px-2 py-1 text-xs font-medium rounded-full",
            property.is_active 
              ? "bg-emerald-500 text-white border-emerald-500" 
              : "bg-slate-500 text-white border-slate-500"
          )}>
            {property.is_active ? "🟢 Active" : "⚫ Inactive"}
          </Badge>
          
          {/* Occupied/Vacant Badge */}
          <Badge className={cn(
            "px-2 py-1 text-xs font-medium rounded-full",
            property.is_occupied 
              ? "bg-teal-500 text-white border-teal-500" 
              : "bg-amber-500 text-white border-amber-500"
          )}>
            {property.is_occupied ? "🏠 Occupied" : "🏠 Vacant"}
          </Badge>
          
          {/* Emergency Badge - Always show position but conditional content */}
          {property.emergency_contact && (
            <Badge className="px-2 py-1 text-xs font-medium rounded-full bg-destructive text-destructive-foreground border-destructive">
              🚨 Emergency
            </Badge>
          )}
        </div>
      </div>

      {/* Contacts Block - Always present with consistent structure */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Tenant Section */}
        <div className="flex flex-col gap-1">
          <div className="text-xs font-medium text-muted-foreground">Tenant</div>
          <div className="text-sm font-medium text-foreground min-h-[20px]">
            {property.tenant_name || <span className="text-muted-foreground">—</span>}
          </div>
        </div>

        {/* Manager Section */}
        <div className="flex flex-col gap-1">
          <div className="text-xs font-medium text-muted-foreground">Manager</div>
          <div className="text-sm font-medium text-foreground min-h-[20px]">
            {property.manager_name || <span className="text-muted-foreground">—</span>}
          </div>
          
          {/* Manager Contact Info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground min-h-[16px]">
              <Phone className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {property.manager_phone || "—"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground min-h-[16px]">
              <Mail className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {property.manager_email || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions - Fixed to bottom with consistent alignment */}
      <div className="flex gap-2 pt-3 border-t border-border/50 mt-auto">
        <Button
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(property)}
          className="flex-1 h-10 min-w-0"
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
        <Button
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(property)}
          className="h-10"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline" 
          size="sm" 
          onClick={() => onContactTenant(property)}
          disabled={!property.tenant_name}
          className={cn(
            "h-10",
            property.tenant_name 
              ? "bg-accent/10 border-accent/20 text-accent hover:bg-accent/20" 
              : "opacity-50"
          )}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Contact
        </Button>
      </div>
    </Card>
  );
};