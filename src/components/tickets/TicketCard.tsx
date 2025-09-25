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
      "bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl border border-transparent hover:border-primary/20 relative",
      className
    )}>
      <CardContent className="p-6">
        {/* Urgency chip in top-right corner */}
        <div className="absolute top-4 right-4">
          <UrgencyChip urgency={ticket.urgency} />
        </div>

        {/* Main content */}
        <div className="pr-20"> {/* Add padding-right to avoid overlap with urgency chip */}
          {/* Issue title - main focus */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">
            {ticket.issue_description}
          </h3>

          {/* Metadata - smaller, lighter */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-700">Ticket:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {ticket.ticket_id}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <div>
                <span className="font-medium text-gray-700">{ticket.property_name}</span>
                <span className="text-gray-500 ml-1">• {ticket.unit_address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Created {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</span>
            </div>
          </div>

          {/* Status */}
          <div className="mb-4">
            <StatusChip status={ticket.status} />
          </div>

          {/* Vendor info if assigned */}
          {ticket.service_provider && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-800 font-medium">
                Assigned to: {ticket.service_provider}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons - right-aligned at bottom */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(ticket)}
            className="rounded-lg"
          >
            View Details
          </Button>
          {!ticket.service_provider && (
            <Button 
              size="sm"
              onClick={() => onAssignVendor(ticket)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Assign Vendor
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};