import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UrgencyChip } from '@/components/ui/urgency-chip';
import { StatusChip } from '@/components/ui/status-chip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Ticket } from '@/pages/Tickets';

interface TicketsTableProps {
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
}

type SortField = 'ticket_id' | 'property_name' | 'urgency' | 'status' | 'created_at';
type SortDirection = 'asc' | 'desc';

export const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onTicketSelect }) => {
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'created_at') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      className="h-auto p-0 font-semibold hover:bg-transparent"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </Button>
  );

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">🎫</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No tickets found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or create a new ticket to get started.
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Create First Ticket
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-32">
              <SortableHeader field="ticket_id">Ticket ID</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader field="property_name">Property</SortableHeader>
            </TableHead>
            <TableHead className="min-w-48">Issue Description</TableHead>
            <TableHead className="w-36">
              <SortableHeader field="urgency">Urgency</SortableHeader>
            </TableHead>
            <TableHead className="w-36">
              <SortableHeader field="status">Status</SortableHeader>
            </TableHead>
            <TableHead className="w-48">Assigned Vendor</TableHead>
            <TableHead className="w-32">
              <SortableHeader field="created_at">Created</SortableHeader>
            </TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTickets.map((ticket) => (
            <TableRow
              key={ticket.ticket_id}
              className="hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => onTicketSelect(ticket)}
            >
              <TableCell className="font-medium">
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:text-primary/80 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTicketSelect(ticket);
                  }}
                >
                  {ticket.ticket_id}
                </Button>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-foreground">{ticket.property_name}</div>
                  <div className="text-sm text-muted-foreground">{ticket.unit_address}</div>
                </div>
              </TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-foreground">{truncateText(ticket.issue_description)}</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{ticket.issue_description}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <UrgencyChip urgency={ticket.urgency} />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <StatusChip status={ticket.status} />
                </div>
              </TableCell>
              <TableCell>
                {ticket.service_provider ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/avatar-${ticket.service_provider.replace(/\s+/g, '').toLowerCase()}.jpg`} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {ticket.service_provider.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{ticket.service_provider}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Unassigned</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Ticket
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};