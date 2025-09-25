import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { X, Edit, Clock, User, MapPin, FileText, MessageSquare, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UrgencyChip, UrgencyLevel } from '@/components/ui/urgency-chip';
import { StatusChip, StatusLevel } from '@/components/ui/status-chip';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket } from '@/pages/Tickets';

interface TicketDrawerProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketDrawer: React.FC<TicketDrawerProps> = ({ ticket, isOpen, onClose }) => {
  const [editableTicket, setEditableTicket] = useState(ticket);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Update editable ticket when ticket prop changes
  useEffect(() => {
    setEditableTicket(ticket);
  }, [ticket]);

  if (!ticket || !editableTicket) return null;

  const handleUrgencyChange = (urgency: UrgencyLevel) => {
    setEditableTicket({ ...editableTicket, urgency });
  };

  const handleStatusChange = (status: StatusLevel) => {
    setEditableTicket({ ...editableTicket, status });
  };

  const handleDescriptionChange = (description: string) => {
    setEditableTicket({ ...editableTicket, issue_description: description });
  };

  const mockVendors = [
    'Emergency Plumbing Co.',
    'Quick Fix HVAC',
    'Elite Electrical Services',
    'Pro Maintenance Group',
    'Reliable Repairs Inc.'
  ];

  const mockCommunicationHistory = [
    {
      id: '1',
      type: 'status_update',
      message: 'Ticket assigned to Emergency Plumbing Co.',
      timestamp: '2024-01-15T10:15:00Z',
      author: 'System',
    },
    {
      id: '2',
      type: 'message',
      message: 'Technician en route. ETA 15 minutes.',
      timestamp: '2024-01-15T09:45:00Z',
      author: 'Emergency Plumbing Co.',
    },
    {
      id: '3',
      type: 'created',
      message: 'Ticket created by tenant report.',
      timestamp: '2024-01-15T08:30:00Z',
      author: 'Property Manager',
    },
  ];

  return (
    <>
      {/* Backdrop - Solid overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-background border-l shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          w-full sm:w-[480px] lg:w-[560px]
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-medium text-foreground">{editableTicket.ticket_id}</h1>
                <span className="text-muted-foreground">•</span>
                <span className="text-base text-foreground">{editableTicket.property_name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Urgency and Status - Editable */}
          <div className="px-6 py-4 border-b bg-muted/30">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  Urgency
                </label>
                <Select value={editableTicket.urgency} onValueChange={handleUrgencyChange}>
                  <SelectTrigger className="w-full h-9 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  Status
                </label>
                <Select value={editableTicket.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full h-9 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="vendor_notified">Vendor Notified</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-5">

              {/* Property Information */}
              <Card className="rounded-2xl border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2 text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Property Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">{editableTicket.property_name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{editableTicket.unit_address}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Issue Description - Editable */}
              <Card className="rounded-2xl border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2 text-foreground">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Issue Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={editableTicket.issue_description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    className="min-h-[100px] resize-none border-input"
                    placeholder="Describe the issue..."
                  />
                </CardContent>
              </Card>

              {/* Assigned Vendor - Editable */}
              <Card className="rounded-2xl border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2 text-foreground">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Assigned Vendor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select 
                    value={editableTicket.service_provider || ''} 
                    onValueChange={(value) => setEditableTicket({ ...editableTicket, service_provider: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select vendor..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVendors.map((vendor) => (
                        <SelectItem key={vendor} value={vendor}>
                          {vendor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {editableTicket.service_provider && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/avatar-${editableTicket.service_provider.replace(/\s+/g, '').toLowerCase()}.jpg`} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {editableTicket.service_provider.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{editableTicket.service_provider}</p>
                        <p className="text-sm text-muted-foreground">Professional Service Provider</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="rounded-2xl border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2 text-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Created:</span>
                      <span className="text-sm text-foreground font-medium">
                        {format(new Date(editableTicket.created_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Last Updated:</span>
                      <span className="text-sm text-foreground font-medium">
                        {formatDistanceToNow(new Date(editableTicket.updated_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Communication History */}
              <Card className="rounded-2xl border shadow-sm mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2 text-foreground">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    Communication History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {mockCommunicationHistory.map((comm, index) => (
                      <div key={comm.id} className="relative">
                        {index !== mockCommunicationHistory.length - 1 && (
                          <div className="absolute left-2.5 top-8 bottom-0 w-px bg-border" />
                        )}
                        <div className="flex gap-4">
                          <div className="h-5 w-5 rounded-full bg-primary flex-shrink-0 mt-1" />
                          <div className="flex-1 min-w-0 pb-2">
                            <p className="text-sm text-foreground leading-relaxed">{comm.message}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs font-medium text-muted-foreground">{comm.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comm.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* Footer Actions - Sticky */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t p-6">
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-medium">
                Save Changes
              </Button>
              <Button variant="outline" className="flex-1 h-11 font-medium">
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};