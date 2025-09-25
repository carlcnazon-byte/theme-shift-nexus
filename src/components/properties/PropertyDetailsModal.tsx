import React from 'react';
import { PropertyUnit } from '@/types/property';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Car, 
  Key, 
  AlertTriangle,
  Edit,
  MessageSquare,
  Ticket
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: PropertyUnit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (property: PropertyUnit) => void;
  onContactTenant: (property: PropertyUnit) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  open,
  onOpenChange,
  onEdit,
  onContactTenant,
}) => {
  if (!property) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                🏢 {property.property_name}
              </DialogTitle>
              <p className="text-muted-foreground">
                {property.full_address}
                {property.unit_number && `, Unit ${property.unit_number}`}
              </p>
              <div className="flex flex-wrap gap-2">
                {getStatusBadge(property.is_active)}
                {getOccupancyBadge(property.is_occupied)}
                {property.emergency_contact && (
                  <Badge className="bg-red-500 text-white border-red-500">
                    🚨 Emergency Available
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onEdit(property)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              {property.tenant_name && (
                <Button 
                  onClick={() => onContactTenant(property)}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Tenant
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Property Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Property Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">
                        {property.full_address}
                      </div>
                      {property.street_address && (
                        <div className="text-sm text-muted-foreground">
                          Street: {property.street_address}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {property.unit_number && (
                    <div className="flex items-center gap-3">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Unit</div>
                        <div className="text-sm text-muted-foreground">{property.unit_number}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 flex items-center justify-center">
                      {property.is_active ? (
                        <div className="h-2 w-2 bg-emerald-500 rounded-full" />
                      ) : (
                        <div className="h-2 w-2 bg-slate-500 rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Status</div>
                      <div className="text-sm text-muted-foreground">
                        {property.is_active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tenant Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Tenant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {property.tenant_name ? (
                    <>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Name</div>
                          <div className="text-sm text-muted-foreground">{property.tenant_name}</div>
                        </div>
                      </div>
                      
                      {property.emergency_contact && (
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="font-medium">Emergency Contact</div>
                            <div className="text-sm text-muted-foreground">{property.emergency_contact}</div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground py-4 text-center">
                      No tenant information available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Access & Parking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Access & Parking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {property.access_notes && (
                    <div className="flex items-start gap-3">
                      <Key className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Access Notes</div>
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {property.access_notes}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {property.parking_info && (
                    <div className="flex items-start gap-3">
                      <Car className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Parking Information</div>
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {property.parking_info}
                        </div>
                      </div>
                    </div>
                  )}

                  {!property.access_notes && !property.parking_info && (
                    <div className="text-sm text-muted-foreground py-4 text-center">
                      No access or parking information available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Management Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Management Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {property.manager_name ? (
                    <>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Manager</div>
                          <div className="text-sm text-muted-foreground">{property.manager_name}</div>
                        </div>
                      </div>
                      
                      {property.manager_phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div className="text-sm text-muted-foreground">{property.manager_phone}</div>
                          </div>
                        </div>
                      )}
                      
                      {property.manager_email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-sm text-muted-foreground">{property.manager_email}</div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground py-4 text-center">
                      No management contact information available
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="mt-6">
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tickets found for this property</p>
                  <p className="text-sm mt-2">Tickets related to this property will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No documents uploaded</p>
                  <p className="text-sm mt-2">Property documents, leases, and photos will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No activity history</p>
                  <p className="text-sm mt-2">Property updates and changes will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};