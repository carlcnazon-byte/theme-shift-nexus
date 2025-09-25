import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  timestamp: string;
  ticketId: string;
  property: string;
  status: 'emergency' | 'urgent' | 'standard';
  description: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getStatusConfig = (status: Activity['status']) => {
    switch (status) {
      case 'emergency':
        return { 
          className: 'bg-red-500 hover:bg-red-600 text-white', 
          icon: '🚨',
          label: 'Emergency'
        };
      case 'urgent':
        return { 
          className: 'bg-amber-500 hover:bg-amber-600 text-white', 
          icon: '⚡',
          label: 'Urgent'
        };
      case 'standard':
        return { 
          className: 'bg-slate-500 hover:bg-slate-600 text-white', 
          icon: '📋',
          label: 'Standard'
        };
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => {
          const statusConfig = getStatusConfig(activity.status);
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0">
                <Badge className={statusConfig.className}>
                  <span className="mr-1">{statusConfig.icon}</span>
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    Ticket #{activity.ticketId}
                  </p>
                  <time className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.property}
                </p>
                <p className="text-sm text-foreground mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
        <div className="pt-4 border-t border-border">
          <Button variant="link" className="w-full text-primary hover:text-primary/80">
            View All Activity →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};