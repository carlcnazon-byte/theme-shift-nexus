import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, FileText, Ticket, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Call } from '@/pages/Calls';

interface CallsListProps {
  calls: Call[];
  selectedCall: Call | null;
  onCallSelect: (call: Call) => void;
}

export const CallsList: React.FC<CallsListProps> = ({ calls, selectedCall, onCallSelect }) => {
  const getDirectionIcon = (call: Call) => {
    switch (call.direction) {
      case 'inbound':
        return <PhoneIncoming className="h-4 w-4 text-green-500" />;
      case 'outbound':
        return <PhoneOutgoing className="h-4 w-4 text-blue-500" />;
      case 'missed':
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (call: Call) => {
    switch (call.status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-300">Completed</Badge>;
      case 'missed':
        return <Badge className="bg-red-500/20 text-red-300">Missed</Badge>;
      case 'voicemail':
        return <Badge className="bg-amber-500/20 text-amber-300">Voicemail</Badge>;
      default:
        return null;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQualityStars = (quality?: number) => {
    if (!quality) return null;
    
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < quality
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (calls.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">📞</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No calls found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border h-[calc(100vh-280px)]">
      <CardContent className="p-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {calls.map((call) => (
              <div
                key={call.id}
                className={`
                  p-4 rounded-lg border cursor-pointer transition-all duration-200
                  ${selectedCall?.id === call.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-background border-border hover:bg-accent/50'
                  }
                `}
                onClick={() => onCallSelect(call)}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getDirectionIcon(call)}
                    <span className="font-medium text-foreground">
                      {call.contact_name || 'Unknown Caller'}
                    </span>
                  </div>
                  {getStatusBadge(call)}
                </div>

                {/* Phone Number */}
                <div className="text-sm text-muted-foreground mb-2">
                  {call.phone_number}
                </div>

                {/* Duration and Time */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDuration(call.call_duration)}</span>
                    </div>
                    {call.call_quality && renderQualityStars(call.call_quality)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(call.created_at), { addSuffix: true })}
                  </span>
                </div>

                {/* Associated Ticket */}
                {call.ticket_id && (
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary font-medium">
                      {call.ticket_id}
                    </span>
                  </div>
                )}

                {/* Summary */}
                {call.summary && (
                  <div className="flex items-start gap-2">
                    <FileText className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {call.summary}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};