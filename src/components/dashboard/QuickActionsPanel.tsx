import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, UserPlus, Phone, MapPin } from 'lucide-react';
import { CreateTicketModal } from '@/components/tickets/CreateTicketModal';

interface QuickActionsPanelProps {
  recentProperties: string[];
  emergencyContacts: { name: string; phone: string; role: string; }[];
}

export const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({ 
  recentProperties, 
  emergencyContacts 
}) => {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setIsCreateTicketModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite New Vendor
          </Button>
        </CardContent>
      </Card>

      {/* Recent Properties */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Recent Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent>
              {recentProperties.map((property, index) => (
                <SelectItem key={index} value={property}>
                  {property}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                <Phone className="h-3 w-3 mr-1" />
                {contact.phone}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Create Ticket Modal */}
      <CreateTicketModal 
        isOpen={isCreateTicketModalOpen}
        onClose={() => setIsCreateTicketModalOpen(false)}
      />
    </div>
  );
};