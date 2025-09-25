import React, { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { Phone, Clock, Ticket, User, FileText, Play, Pause, Volume2, Download, Copy, Search, UserPlus, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CallStatusChip } from '@/components/ui/call-status-chip';
import { Call } from '@/pages/Calls';
import { AudioPlayer } from '@/components/calls/AudioPlayer';
import { TranscriptViewer } from '@/components/calls/TranscriptViewer';

interface CallDetailsProps {
  call: Call;
}

export const CallDetails: React.FC<CallDetailsProps> = ({ call }) => {
  const [transcriptSearch, setTranscriptSearch] = useState('');

  const getDirectionIcon = () => {
    switch (call.direction) {
      case 'inbound':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'outbound':
        return <Phone className="h-4 w-4 text-blue-500" />;
      case 'missed':
        return <Phone className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(call.transcript);
    // You could add a toast notification here
  };

  const extractedData = [
    { label: 'Property Address', value: '123 Oak Street, Apt 4B' },
    { label: 'Issue Type', value: 'Water Leak Emergency' },
    { label: 'Urgency Level', value: 'Emergency' },
    { label: 'Service Required', value: 'Plumbing' },
  ];

  return (
    <div className="space-y-6">
      {/* Call Header */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {getDirectionIcon()}
                <CardTitle className="text-xl">
                  {call.contact_name || 'Unknown Caller'}
                </CardTitle>
                <CallStatusChip status={call.status} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{call.phone_number}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDuration(call.call_duration)}</span>
                </div>
                <span>{formatDistanceToNow(new Date(call.created_at), { addSuffix: true })}</span>
              </div>
              {call.ticket_id && (
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-primary" />
                  <span className="text-primary font-medium">{call.ticket_id}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ClipboardList className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Assign Vendor
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Audio Player */}
      <AudioPlayer audioUrl={call.audio_url} />

      {/* Extracted Data */}
      {call.direction === 'inbound' && call.status === 'completed' && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Extracted Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extractedData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <p className="text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transcript Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Call Transcript
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  placeholder="Search transcript..."
                  className="pl-7 h-8 w-48"
                  value={transcriptSearch}
                  onChange={(e) => setTranscriptSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyTranscript}>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TranscriptViewer 
            transcript={call.transcript} 
            searchTerm={transcriptSearch}
            callDuration={call.call_duration}
          />
        </CardContent>
      </Card>

      {/* Call Metadata */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Call Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Call Time</p>
                <p className="text-foreground">{format(new Date(call.created_at), 'MMM dd, yyyy HH:mm')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p className="text-foreground">{formatDuration(call.call_duration)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Direction</p>
                <p className="text-foreground capitalize">{call.direction}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Call Quality</p>
                <div className="flex items-center gap-2">
                  <span className="text-foreground">{call.call_quality}/5</span>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full mr-1 ${
                          i < (call.call_quality || 0)
                            ? 'bg-yellow-400'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {call.ticket_id && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Associated Ticket</p>
                  <p className="text-primary font-medium">{call.ticket_id}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-foreground capitalize">{call.status}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};