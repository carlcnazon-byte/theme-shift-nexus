import React from 'react';
import { TicketCard } from './TicketCard';
import type { Ticket } from '@/pages/Tickets';

interface TicketGridProps {
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
}

export const TicketGrid: React.FC<TicketGridProps> = ({
  tickets,
  onTicketSelect
}) => {
  const handleAssignVendor = (ticket: Ticket) => {
    // For now, just open the ticket details
    // In a real app, this would open an assign vendor modal
    onTicketSelect(ticket);
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No tickets found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.ticket_id}
          ticket={ticket}
          onViewDetails={onTicketSelect}
          onAssignVendor={handleAssignVendor}
        />
      ))}
    </div>
  );
};