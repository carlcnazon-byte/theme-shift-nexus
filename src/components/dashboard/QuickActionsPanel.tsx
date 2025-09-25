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
    <div className="space-y-4 sm:space-y-6">
      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-sm sm:text-base text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 pt-0">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base"
            onClick={() => setIsCreateTicketModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 text-sm sm:text-base">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite New Vendor
          </Button>
        </CardContent>
      </Card>

      {/* Recent Properties */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-sm sm:text-base text-foreground flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Recent Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
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
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-sm sm:text-base text-foreground flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
         <CardContent className="space-y-2 sm:space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 rounded-lg hover:bg-accent/50 transition-colors space-y-1 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 self-start sm:self-center flex-shrink-0">
                <Phone className="h-3 w-3 mr-1" />
                <span className="text-xs sm:text-sm">{contact.phone}</span>
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