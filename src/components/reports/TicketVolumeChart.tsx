import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TicketVolumeData {
  date: string;
  count: number;
  urgency: string;
  emergency: number;
  urgent: number;
  standard: number;
}

interface TicketVolumeChartProps {
  data: TicketVolumeData[];
}

export const TicketVolumeChart: React.FC<TicketVolumeChartProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{formatDate(label)}</p>
          <div className="space-y-1 mt-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry.dataKey === 'count' ? 'Total' : entry.dataKey}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#14b8a6" 
            strokeWidth={3}
            dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#14b8a6', strokeWidth: 2, fill: '#14b8a6' }}
            name="Total Tickets"
          />
          <Line 
            type="monotone" 
            dataKey="emergency" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
            strokeDasharray="5 5"
            name="Emergency"
          />
          <Line 
            type="monotone" 
            dataKey="urgent" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
            strokeDasharray="5 5"
            name="Urgent"
          />
          <Line 
            type="monotone" 
            dataKey="standard" 
            stroke="#6b7280" 
            strokeWidth={2}
            dot={{ fill: '#6b7280', strokeWidth: 2, r: 3 }}
            strokeDasharray="5 5"
            name="Standard"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};