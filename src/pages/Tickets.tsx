import React, { useState, useMemo, useEffect } from 'react';
import { Grid, Table, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TicketsFilterBar } from '@/components/tickets/TicketsFilterBar';
import { TicketsTable } from '@/components/tickets/TicketsTable';
import { TicketGrid } from '@/components/tickets/TicketGrid';
import { TicketDrawer } from '@/components/tickets/TicketDrawer';
import { CreateTicketModal } from '@/components/tickets/CreateTicketModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Ticket {
  ticket_id: string;
  property_name: string;
  unit_address: string;
  issue_description: string;
  urgency: 'emergency' | 'urgent' | 'standard';
  status: 'open' | 'vendor_notified' | 'in_progress' | 'resolved' | 'canceled';
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
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TicketFilters>({
    search: '',
    property: 'all',
    urgency: 'all',
    status: 'all',
    dateRange: null,
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          properties (property_name),
          tenants (unit_number),
          vendors (company_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTickets: Ticket[] = (data || []).map((ticket: any) => ({
        ticket_id: ticket.ticket_id,
        property_name: ticket.properties?.property_name || 'Unknown Property',
        unit_address: ticket.tenants?.unit_number || ticket.unit_number || 'N/A',
        issue_description: ticket.issue_description,
        urgency: ticket.urgency as 'emergency' | 'urgent' | 'standard',
        status: ticket.status as 'open' | 'vendor_notified' | 'in_progress' | 'resolved' | 'canceled',
        service_provider: ticket.vendors?.company_name,
        created_at: ticket.created_at,
        updated_at: ticket.updated_at,
      }));

      setTickets(formattedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tickets',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
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
  }, [tickets, filters]);

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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tickets Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage property maintenance tickets efficiently.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Ticket
          </Button>
          
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="default"
            onClick={() => setViewMode('cards')}
            className="gap-2"
          >
            <Grid className="w-4 h-4" />
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="default"
            onClick={() => setViewMode('table')}
            className="gap-2"
          >
            <Table className="w-4 h-4" />
            Table
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <TicketsFilterBar
        filters={filters}
        onFiltersChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalResults={filteredTickets.length}
      />

      {/* Tickets Display */}
      {viewMode === 'cards' ? (
        <TicketGrid
          tickets={filteredTickets}
          onTicketSelect={handleTicketSelect}
        />
      ) : (
        <TicketsTable
          tickets={filteredTickets}
          onTicketSelect={handleTicketSelect}
        />
      )}

      {/* Ticket Drawer */}
      <TicketDrawer
        ticket={selectedTicket}
        isOpen={!!selectedTicket}
        onClose={handleCloseDrawer}
      />

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTicketCreated={fetchTickets}
      />
    </div>
  );
};

export default Tickets;