import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UrgencyChip } from '@/components/ui/urgency-chip';
import { StatusChip } from '@/components/ui/status-chip';
import { cn } from '@/lib/utils';
import type { Ticket } from '@/pages/Tickets';

interface TicketCardProps {
  ticket: Ticket;
  onViewDetails: (ticket: Ticket) => void;
  onAssignVendor: (ticket: Ticket) => void;
  className?: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onViewDetails,
  onAssignVendor,
  className
}) => {
  return (
    <Card className={cn(
      "bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl border border-gray-100 hover:border-primary/20 h-full flex flex-col",
      className
    )}>
      <CardContent className="p-4 flex flex-col h-full">
        {/* 1. Card Header - Issue Title + Urgency Chip */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 leading-tight pr-3 flex-1">
            {ticket.issue_description}
          </h3>
          <div className="flex-shrink-0">
            <UrgencyChip urgency={ticket.urgency} />
          </div>
        </div>

        {/* 2. Metadata Row - Ticket ID, Property, Created Date */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded font-medium">
              {ticket.ticket_id}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-medium text-gray-700">{ticket.property_name}</span>
            <span className="text-gray-400">•</span>
            <span className="truncate">{ticket.unit_address}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Created {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</span>
          </div>
        </div>

        {/* 3. Status & Vendor Section */}
        <div className="space-y-3 mb-6 flex-1">
          <div>
            <StatusChip status={ticket.status} />
          </div>
          
          {/* Vendor Assignment - Always reserve space for consistent alignment */}
          <div className="min-h-[32px] flex items-start">
            {ticket.service_provider ? (
              <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium">
                Assigned to: {ticket.service_provider}
              </div>
            ) : (
              <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg text-sm">
                No vendor assigned
              </div>
            )}
          </div>
        </div>

        {/* 4. Action Buttons - Always Bottom-Right */}
        <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(ticket)}
            className="text-xs font-semibold"
          >
            View Details
          </Button>
          {!ticket.service_provider && (
            <Button 
              size="sm"
              onClick={() => onAssignVendor(ticket)}
              className="text-xs font-semibold"
            >
              Assign Vendor
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};