import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActionsPanel } from '@/components/dashboard/QuickActionsPanel';
import { MiniChart } from '@/components/dashboard/MiniChart';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { startOfDay, subDays, format } from 'date-fns';

const Index = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate ticket stats
  const totalTickets = tickets.length;
  const activeTickets = tickets.filter(t => t.status !== 'resolved' && t.status !== 'canceled').length;
  const emergencyTickets = tickets.filter(t => t.urgency === 'emergency' && t.status !== 'resolved').length;
  const urgentTickets = tickets.filter(t => t.urgency === 'urgent' && t.status !== 'resolved').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;

  const kpiData = [
    {
      title: 'Total Tickets',
      value: totalTickets.toString(),
      icon: BarChart,
      gradient: 'bg-gradient-to-br from-primary to-primary/80',
      badge: activeTickets > 0 ? `${activeTickets} active` : undefined
    },
    {
      title: 'Emergency',
      value: emergencyTickets.toString(),
      icon: AlertTriangle,
      gradient: 'bg-gradient-to-br from-destructive to-destructive/80',
      badge: emergencyTickets > 0 ? 'Needs attention' : undefined
    },
    {
      title: 'Urgent',
      value: urgentTickets.toString(),
      icon: Clock,
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
      badge: urgentTickets > 0 ? 'High priority' : undefined
    },
    {
      title: 'Resolved',
      value: resolvedTickets.toString(),
      icon: CheckCircle,
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      badge: `${Math.round((resolvedTickets / (totalTickets || 1)) * 100)}% complete`
    }
  ];

  const recentActivities = [
    {
      id: '1',
      timestamp: '2 min ago',
      ticketId: 'TK-2024-001',
      property: '123 Oak Street, Apt 4B',
      urgency: 'emergency' as const,
      description: 'Water leak reported - maintenance dispatched'
    },
    {
      id: '2',
      timestamp: '15 min ago',
      ticketId: 'TK-2024-002',
      property: '456 River Road, Unit 12',
      urgency: 'urgent' as const,
      description: 'HVAC system malfunction - vendor assigned'
    },
    {
      id: '3',
      timestamp: '1 hour ago',
      ticketId: 'TK-2024-003',
      property: '789 Park Avenue',
      urgency: 'standard' as const,
      description: 'Routine maintenance completed'
    },
    {
      id: '4',
      timestamp: '2 hours ago',
      ticketId: 'TK-2024-004',
      property: '321 Industrial Blvd',
      urgency: 'urgent' as const,
      description: 'Electrical issue reported'
    },
    {
      id: '5',
      timestamp: '3 hours ago',
      ticketId: 'TK-2024-005',
      property: '654 Metro Plaza',
      urgency: 'standard' as const,
      description: 'Painting work scheduled'
    }
  ];

  const recentProperties = [
    'Sunset Apartments - 123 Oak Street',
    'Riverside Condos - 456 River Road',
    'Garden View Townhouse - 789 Park Avenue',
    'Metro Lofts - 321 Industrial Blvd',
    'Downtown Plaza - 654 Metro Plaza'
  ];

  const emergencyContacts = [
    { name: 'Fire Department', phone: '911', role: 'Emergency Services' },
    { name: 'Water Authority', phone: '555-0123', role: 'Utilities' },
    { name: 'Emergency Plumber', phone: '555-0456', role: 'Maintenance' },
    { name: 'Security Service', phone: '555-0789', role: 'Security' }
  ];

  // Mock data for ticket volume (last 7 days)
  const chartData = [
    { day: 'Thu', tickets: 8 },
    { day: 'Fri', tickets: 3 },
    { day: 'Sat', tickets: 12 },
    { day: 'Sun', tickets: 12 },
    { day: 'Mon', tickets: 10 },
    { day: 'Tue', tickets: 5 },
    { day: 'Wed', tickets: 2 }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-1 sm:space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Property Management Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monitor tickets, track performance, and manage your properties efficiently.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {openTickets} Open
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {inProgressTickets} In Progress
            </Badge>
          </div>
        </div>
      </div>

      {/* KPI Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Mini Chart Section */}
      {!loading && <MiniChart data={chartData} />}

      {/* Main Content - Activity Feed + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Activity Feed - 2/3 width */}
        <div className="lg:col-span-2">
          <ActivityFeed activities={recentActivities} />
        </div>
        
        {/* Quick Actions Sidebar - 1/3 width */}
        <div className="lg:col-span-1">
          <QuickActionsPanel 
            recentProperties={recentProperties}
            emergencyContacts={emergencyContacts}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
