import React from 'react';
import { BarChart, Clock, AlertTriangle } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActionsPanel } from '@/components/dashboard/QuickActionsPanel';
import { MiniChart } from '@/components/dashboard/MiniChart';

const Index = () => {
  // Sample dashboard data
  const kpiData = [
    {
      title: 'Active Tickets',
      value: '247',
      icon: BarChart,
      gradient: 'bg-gradient-to-br from-teal-500 to-teal-600',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Urgent Issues',
      value: '18',
      icon: '🚨',
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Response Time',
      value: '2.4h',
      icon: Clock,
      gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Vendor Performance',
      value: '94%',
      icon: '⭐',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      trend: { value: 3, isPositive: true }
    }
  ];

  const recentActivities = [
    {
      id: '1',
      timestamp: '2 min ago',
      ticketId: 'TK-2024-001',
      property: '123 Oak Street, Apt 4B',
      status: 'emergency' as const,
      description: 'Water leak reported - maintenance dispatched'
    },
    {
      id: '2',
      timestamp: '15 min ago',
      ticketId: 'TK-2024-002',
      property: '456 River Road, Unit 12',
      status: 'urgent' as const,
      description: 'HVAC system malfunction - vendor assigned'
    },
    {
      id: '3',
      timestamp: '1 hour ago',
      ticketId: 'TK-2024-003',
      property: '789 Park Avenue',
      status: 'standard' as const,
      description: 'Routine maintenance completed'
    },
    {
      id: '4',
      timestamp: '2 hours ago',
      ticketId: 'TK-2024-004',
      property: '321 Industrial Blvd',
      status: 'urgent' as const,
      description: 'Electrical issue reported'
    },
    {
      id: '5',
      timestamp: '3 hours ago',
      ticketId: 'TK-2024-005',
      property: '654 Metro Plaza',
      status: 'standard' as const,
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

  const chartData = [
    { day: 'Mon', tickets: 45 },
    { day: 'Tue', tickets: 52 },
    { day: 'Wed', tickets: 38 },
    { day: 'Thu', tickets: 61 },
    { day: 'Fri', tickets: 55 },
    { day: 'Sat', tickets: 28 },
    { day: 'Sun', tickets: 22 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Property Management Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor tickets, track performance, and manage your properties efficiently.
        </p>
      </div>

      {/* KPI Cards - 4 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Mini Chart Section */}
      <MiniChart data={chartData} />

      {/* Main Content - Activity Feed + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
