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
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90', 
          icon: '🚨',
          label: 'Emergency'
        };
      case 'urgent':
        return { 
          className: 'bg-warning text-white hover:bg-warning/90', 
          icon: '⚡',
          label: 'Urgent'
        };
      case 'standard':
        return { 
          className: 'bg-muted text-muted-foreground hover:bg-muted/80', 
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
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => {
          const statusConfig = getStatusConfig(activity.status);
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer border border-border/50 hover:border-border"
            >
              <div className="flex-shrink-0 pt-0.5">
                <Badge 
                  variant="secondary" 
                  className={`${statusConfig.className} border-0 font-medium text-xs px-2.5 py-1`}
                >
                  <span className="mr-1.5 text-xs">{statusConfig.icon}</span>
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">
                    Ticket #{activity.ticketId}
                  </p>
                  <time className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.timestamp}
                  </time>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {activity.property}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
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