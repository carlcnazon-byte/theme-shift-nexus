import React, { useState, useMemo } from 'react';
import { TicketsFilterBar } from '@/components/tickets/TicketsFilterBar';
import { TicketsTable } from '@/components/tickets/TicketsTable';
import { TicketDrawer } from '@/components/tickets/TicketDrawer';

export interface Ticket {
  ticket_id: string;
  property_name: string;
  unit_address: string;
  issue_description: string;
  urgency: 'emergency' | 'urgent' | 'standard';
  status: 'open' | 'vendor_notified' | 'in_progress' | 'resolved';
  service_provider?: string;
  created_at: string;
  updated_at: string;
}

export interface TicketFilters {
  search: string;
  property: string;
  urgency: string;
  status: string;
  dateRange: { from?: Date; to?: Date } | null;
}

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState<TicketFilters>({
    search: '',
    property: 'all',
    urgency: 'all',
    status: 'all',
    dateRange: null,
  });

  // Sample ticket data
  const sampleTickets: Ticket[] = [
    {
      ticket_id: 'TK-2024-001',
      property_name: 'Sunset Apartments',
      unit_address: '123 Oak Street, Apt 4B',
      issue_description: 'Water leak in bathroom ceiling causing damage to fixtures and walls',
      urgency: 'emergency',
      status: 'in_progress',
      service_provider: 'Emergency Plumbing Co.',
      created_at: '2024-01-15T08:30:00Z',
      updated_at: '2024-01-15T10:15:00Z',
    },
    {
      ticket_id: 'TK-2024-002',
      property_name: 'Riverside Condos',
      unit_address: '456 River Road, Unit 12',
      issue_description: 'HVAC system not heating properly, tenants reporting cold temperatures',
      urgency: 'urgent',
      status: 'vendor_notified',
      service_provider: 'Climate Control Experts',
      created_at: '2024-01-14T14:22:00Z',
      updated_at: '2024-01-14T16:45:00Z',
    },
    {
      ticket_id: 'TK-2024-003',
      property_name: 'Garden View Townhouse',
      unit_address: '789 Park Avenue',
      issue_description: 'Routine maintenance required for common area lighting fixtures',
      urgency: 'standard',
      status: 'resolved',
      service_provider: 'General Maintenance LLC',
      created_at: '2024-01-13T09:15:00Z',
      updated_at: '2024-01-13T17:30:00Z',
    },
    {
      ticket_id: 'TK-2024-004',
      property_name: 'Metro Lofts',
      unit_address: '321 Industrial Blvd, Loft 5A',
      issue_description: 'Electrical outlet sparking in kitchen area, potential fire hazard',
      urgency: 'emergency',
      status: 'open',
      created_at: '2024-01-12T16:45:00Z',
      updated_at: '2024-01-12T16:45:00Z',
    },
    {
      ticket_id: 'TK-2024-005',
      property_name: 'Downtown Plaza',
      unit_address: '654 Metro Plaza, Suite 201',
      issue_description: 'Window blind replacement needed in conference room',
      urgency: 'standard',
      status: 'vendor_notified',
      service_provider: 'Interior Solutions',
      created_at: '2024-01-11T11:20:00Z',
      updated_at: '2024-01-11T13:10:00Z',
    },
    {
      ticket_id: 'TK-2024-006',
      property_name: 'Riverside Condos',
      unit_address: '456 River Road, Unit 8',
      issue_description: 'Garbage disposal making unusual noise and not functioning properly',
      urgency: 'urgent',
      status: 'in_progress',
      service_provider: 'Kitchen & Bath Repair',
      created_at: '2024-01-10T13:30:00Z',
      updated_at: '2024-01-10T15:20:00Z',
    },
  ];

  const filteredTickets = useMemo(() => {
    return sampleTickets.filter((ticket) => {
      const matchesSearch = filters.search === '' || 
        ticket.ticket_id.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.property_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.unit_address.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.issue_description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesProperty = filters.property === '' || filters.property === 'all' || ticket.property_name === filters.property;
      const matchesUrgency = filters.urgency === '' || filters.urgency === 'all' || ticket.urgency === filters.urgency;
      const matchesStatus = filters.status === '' || filters.status === 'all' || ticket.status === filters.status;

      const matchesDateRange = !filters.dateRange || 
        (!filters.dateRange.from && !filters.dateRange.to) ||
        (new Date(ticket.created_at) >= (filters.dateRange.from || new Date(0)) &&
         new Date(ticket.created_at) <= (filters.dateRange.to || new Date()));

      return matchesSearch && matchesProperty && matchesUrgency && matchesStatus && matchesDateRange;
    });
  }, [sampleTickets, filters]);

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseDrawer = () => {
    setSelectedTicket(null);
  };

  const handleFilterChange = (newFilters: Partial<TicketFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      property: 'all',
      urgency: 'all',
      status: 'all',
      dateRange: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Tickets Management
        </h1>
        <p className="text-muted-foreground">
          Track and manage property maintenance tickets efficiently.
        </p>
      </div>

      {/* Filter Bar */}
      <TicketsFilterBar
        filters={filters}
        onFiltersChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalResults={filteredTickets.length}
      />

      {/* Tickets Table */}
      <TicketsTable
        tickets={filteredTickets}
        onTicketSelect={handleTicketSelect}
      />

      {/* Ticket Drawer */}
      <TicketDrawer
        ticket={selectedTicket}
        isOpen={!!selectedTicket}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default Tickets;