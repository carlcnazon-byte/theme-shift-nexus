import React, { useEffect } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { X, Clock, User, MapPin, FileText, MessageSquare, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/pages/Tickets';

interface TicketDrawerProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketDrawer: React.FC<TicketDrawerProps> = ({ ticket, isOpen, onClose }) => {
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

  if (!ticket) return null;

  const getUrgencyChip = (urgency: Ticket['urgency']) => {
    switch (urgency) {
      case 'emergency':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
            🚨 Emergency
          </Badge>
        );
      case 'urgent':
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
            ⚡ Urgent
          </Badge>
        );
      case 'standard':
        return (
          <Badge className="bg-slate-500 hover:bg-slate-600 text-white">
            Standard
          </Badge>
        );
    }
  };

  const getStatusChip = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
            Open
          </Badge>
        );
      case 'vendor_notified':
        return (
          <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300">
            Vendor Notified
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300">
            In Progress
          </Badge>
        );
      case 'resolved':
        return (
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
            Resolved
          </Badge>
        );
    }
  };

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
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-background border-l border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          w-full sm:w-[400px] lg:w-[500px]
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{ticket.ticket_id}</h2>
              <p className="text-sm text-muted-foreground">Ticket Details</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Status and Urgency */}
              <div className="flex flex-wrap gap-3">
                {getUrgencyChip(ticket.urgency)}
                {getStatusChip(ticket.status)}
              </div>

              {/* Property Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Property Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="font-medium text-foreground">{ticket.property_name}</p>
                    <p className="text-sm text-muted-foreground">{ticket.unit_address}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Issue Description */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Issue Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{ticket.issue_description}</p>
                </CardContent>
              </Card>

              {/* Assigned Vendor */}
              {ticket.service_provider && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Assigned Vendor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/avatar-${ticket.service_provider.replace(/\s+/g, '').toLowerCase()}.jpg`} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {ticket.service_provider.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{ticket.service_provider}</p>
                        <p className="text-sm text-muted-foreground">Professional Service Provider</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Timeline */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="text-foreground">
                        {format(new Date(ticket.created_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="text-foreground">
                        {formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Communication History */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Communication History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCommunicationHistory.map((comm, index) => (
                      <div key={comm.id} className="relative">
                        {index !== mockCommunicationHistory.length - 1 && (
                          <div className="absolute left-2 top-6 bottom-0 w-px bg-border" />
                        )}
                        <div className="flex gap-3">
                          <div className="h-4 w-4 rounded-full bg-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">{comm.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{comm.author}</span>
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

          {/* Footer Actions */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                Update Status
              </Button>
              <Button variant="outline" className="flex-1">
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};