import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  day: string;
  tickets: number;
}

interface MiniChartProps {
  data: ChartData[];
}

export const MiniChart: React.FC<MiniChartProps> = ({ data }) => {
  const maxTickets = Math.max(...data.map(d => d.tickets));
  
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground text-lg">Ticket Volume (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-48 gap-4">
          {data.map((item, index) => {
            const height = (item.tickets / maxTickets) * 100;
            const isMaxDay = item.tickets === maxTickets && item.tickets > 0;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t-md transition-all duration-300 min-h-[4px] ${
                    isMaxDay 
                      ? 'bg-gradient-to-t from-destructive to-destructive/50 hover:from-destructive/80 hover:to-destructive/40'
                      : 'bg-gradient-to-t from-primary to-primary/50 hover:from-primary/80 hover:to-primary/40'
                  }`}
                  style={{ height: `${Math.max(height, 4)}%` }}
                />
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${isMaxDay ? 'text-destructive' : 'text-foreground'}`}>
                    {item.tickets}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.day}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};