import React from 'react';
import { Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TranscriptViewerProps {
  transcript: string;
  searchTerm: string;
  callDuration: number;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ 
  transcript, 
  searchTerm, 
  callDuration 
}) => {
  const keywords = ['emergency', 'urgent', 'address', 'leak', 'repair', 'maintenance', 'problem', 'issue'];

  const highlightText = (text: string) => {
    let highlightedText = text;

    // Highlight search term
    if (searchTerm && searchTerm.length > 2) {
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-300 dark:bg-yellow-600">$1</mark>');
    }

    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="text-primary font-medium">$1</span>');
    });

    return highlightedText;
  };

  const parseTranscript = () => {
    const lines = transcript.split('\n\n');
    const segments = [];
    let timeOffset = 0;

    lines.forEach((line, index) => {
      if (line.trim()) {
        const speakerMatch = line.match(/^(Agent|Caller|Vendor):\s*(.*)/);
        
        if (speakerMatch) {
          segments.push({
            id: index,
            speaker: speakerMatch[1],
            content: speakerMatch[2],
            timestamp: Math.floor((timeOffset / lines.length) * callDuration),
          });
        } else if (line.includes('Voicemail:')) {
          segments.push({
            id: index,
            speaker: 'Voicemail',
            content: line.replace('Voicemail: ', ''),
            timestamp: 0,
          });
        } else {
          // Handle continuation of previous speaker
          if (segments.length > 0) {
            segments[segments.length - 1].content += ' ' + line.trim();
          }
        }
        
        timeOffset += 30; // Approximate 30 seconds per segment
      }
    });

    return segments;
  };

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'Agent':
        return 'text-blue-500';
      case 'Caller':
        return 'text-green-500';
      case 'Vendor':
        return 'text-purple-500';
      case 'Voicemail':
        return 'text-amber-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const segments = parseTranscript();

  return (
    <ScrollArea className="h-96">
      <div className="space-y-4 pr-4">
        {segments.map((segment) => (
          <div key={segment.id} className="flex gap-4">
            {/* Timestamp */}
            <div className="flex-shrink-0 w-16 pt-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatTimestamp(segment.timestamp)}</span>
              </div>
            </div>

            {/* Speaker and Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-semibold ${getSpeakerColor(segment.speaker)}`}>
                  {segment.speaker}:
                </span>
              </div>
              <div 
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(segment.content) 
                }}
              />
            </div>
          </div>
        ))}

        {/* Empty state for very short transcripts */}
        {segments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transcript available</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};