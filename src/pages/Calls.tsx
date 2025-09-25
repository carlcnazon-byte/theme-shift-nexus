import React, { useState, useMemo } from 'react';
import { CallsFilterBar } from '@/components/calls/CallsFilterBar';
import { CallsList } from '@/components/calls/CallsList';
import { CallDetails } from '@/components/calls/CallDetails';

export interface Call {
  id: string;
  phone_number: string;
  contact_name?: string;
  call_duration: number;
  transcript: string;
  audio_url: string;
  ticket_id?: string;
  created_at: string;
  direction: 'inbound' | 'outbound' | 'missed';
  call_quality?: number;
  status: 'completed' | 'missed' | 'voicemail';
  summary?: string;
}

export interface CallFilters {
  tab: 'all' | 'incoming' | 'outgoing' | 'voicemails';
  dateRange: { from?: Date; to?: Date } | null;
  duration: 'all' | 'short' | 'medium' | 'long';
  hasTicket: 'all' | 'yes' | 'no';
  search: string;
}

const Calls = () => {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [filters, setFilters] = useState<CallFilters>({
    tab: 'all',
    dateRange: null,
    duration: 'all',
    hasTicket: 'all',
    search: '',
  });

  // Mock call data
  const mockCalls: Call[] = [
    {
      id: '1',
      phone_number: '+1 (555) 123-4567',
      contact_name: 'Sarah Johnson',
      call_duration: 245,
      transcript: `Agent: Good morning, this is Property Management Services. How can I help you today?

Caller: Hi, this is Sarah Johnson from Apartment 4B at 123 Oak Street. I have an emergency situation - there's water leaking from my bathroom ceiling and it's causing damage to my furniture and walls.

Agent: I'm so sorry to hear about that, Sarah. A water leak is definitely an emergency. Can you tell me more about where exactly the water is coming from?

Caller: It seems to be coming from the apartment above me. The water is dripping consistently and there's already a stain on my ceiling that's getting bigger. I've placed buckets to catch the water but it's really concerning.

Agent: Absolutely, we need to get this addressed immediately. I'm going to dispatch our emergency plumbing team to your location right away. They should be there within 30 minutes. In the meantime, please continue using the buckets and if possible, move any valuable items away from the affected area.

Caller: Thank you so much. Should I contact my upstairs neighbor?

Agent: We'll handle that - I'm going to have our maintenance team check the unit above you as well. I'm creating a priority ticket for this issue right now. Your ticket number is TK-2024-001.

Caller: Perfect, thank you for the quick response.

Agent: Of course, Sarah. Is there anything else I can help you with today?

Caller: No, that covers it. I really appreciate the fast service.

Agent: You're welcome. Our team will be there soon. Have a great day!`,
      audio_url: '/mock-audio-1.wav',
      ticket_id: 'TK-2024-001',
      created_at: '2024-01-15T08:30:00Z',
      direction: 'inbound',
      call_quality: 4,
      status: 'completed',
      summary: 'Emergency water leak report from tenant, plumbing dispatched',
    },
    {
      id: '2',
      phone_number: '+1 (555) 987-6543',
      contact_name: 'Mike Rodriguez',
      call_duration: 180,
      transcript: `Agent: Property Management Services, this is Jennifer speaking.

Caller: Hi Jennifer, this is Mike Rodriguez. I'm calling about the HVAC system in Unit 12 at Riverside Condos. It's not heating properly and my tenants are complaining about cold temperatures.

Agent: I understand your concern, Mike. When did you first notice the heating issue?

Caller: It started yesterday evening. The system is running but it's just not producing warm air. The thermostat is set to 72 but it's only maintaining about 58 degrees inside.

Agent: That's definitely not acceptable for your tenants. Let me get our HVAC specialist scheduled for you. Are you available for a service call this afternoon?

Caller: Yes, any time after 2 PM would work. The tenants are getting pretty frustrated.

Agent: I completely understand. I'm scheduling Climate Control Experts to come out at 2:30 PM today. I'm also creating a ticket to track this issue - your reference number is TK-2024-002.

Caller: Great, thank you. What should I tell my tenants about timing?

Agent: You can let them know that our technician will be there by 2:30 PM and we expect to have heat restored within a few hours of diagnosis.

Caller: Perfect, I'll call them right now. Thanks for the quick response.

Agent: You're welcome, Mike. We'll keep you updated on the progress.`,
      audio_url: '/mock-audio-2.wav',
      ticket_id: 'TK-2024-002',
      created_at: '2024-01-14T14:22:00Z',
      direction: 'inbound',
      call_quality: 5,
      status: 'completed',
      summary: 'HVAC heating issue at Riverside Condos, technician scheduled',
    },
    {
      id: '3',
      phone_number: '+1 (555) 456-7890',
      contact_name: 'Emergency Plumbing Co.',
      call_duration: 95,
      transcript: `Agent: Hi, this is Jennifer from Property Management Services returning your call.

Vendor: Hi Jennifer, this is Tom from Emergency Plumbing Co. I'm calling about the water leak job at 123 Oak Street, Apartment 4B.

Agent: Yes, how did it go? Were you able to identify the source?

Vendor: We found the issue - it was a burst pipe in the unit above. We've shut off the water to that apartment and completed the repair. The leak has stopped completely.

Agent: That's great news. What about the damage to the tenant's apartment below?

Vendor: There's some ceiling damage and water staining. I'd recommend having a restoration company assess it for potential mold issues. The tenant mentioned some of her furniture got wet too.

Agent: I'll arrange for a restoration assessment. Can you send me the invoice for today's work?

Vendor: Absolutely, I'll email it over within the hour. The total came to $485 for emergency service and parts.

Agent: Perfect. Thanks for the quick response on this one, Tom.

Vendor: No problem, always happy to help with emergencies.`,
      audio_url: '/mock-audio-3.wav',
      ticket_id: 'TK-2024-001',
      created_at: '2024-01-15T12:15:00Z',
      direction: 'outbound',
      call_quality: 4,
      status: 'completed',
      summary: 'Follow-up call with plumber - leak repaired, restoration needed',
    },
    {
      id: '4',
      phone_number: '+1 (555) 321-0987',
      contact_name: 'Unknown Caller',
      call_duration: 35,
      transcript: 'Voicemail: Hi, this is calling about a maintenance request for the garbage disposal in my apartment. It\'s making weird noises and not working properly. Please call me back at this number. Thanks.',
      audio_url: '/mock-audio-4.wav',
      created_at: '2024-01-13T16:45:00Z',
      direction: 'missed',
      call_quality: 3,
      status: 'voicemail',
      summary: 'Voicemail about garbage disposal issue',
    },
    {
      id: '5',
      phone_number: '+1 (555) 654-3210',
      contact_name: 'Lisa Chen',
      call_duration: 320,
      transcript: `Agent: Property Management Services, this is David.

Caller: Hi David, this is Lisa Chen. I'm the property manager for Downtown Plaza. I need to discuss a recurring electrical issue we've been having in Suite 201.

Agent: Of course, Lisa. What kind of electrical problems are you experiencing?

Caller: We've had three separate incidents in the past month where outlets in the conference room have been sparking. It's becoming a safety concern for our tenants.

Agent: That's definitely a priority safety issue. Have you had any electrical work done recently?

Caller: Not recently, but the building was renovated about two years ago. I'm worried there might be a wiring issue that wasn't caught during the renovation.

Agent: I understand your concern. This sounds like something that needs immediate attention from a certified electrician. Let me get PowerTech Electric scheduled for an emergency inspection.

Caller: How soon can they get out there?

Agent: They're one of our fastest responders for electrical emergencies. I can have them there this afternoon. Are you available around 3 PM?

Caller: Yes, that works perfectly. Should I evacuate the conference room until then?

Agent: Yes, please keep that room closed off and post a sign warning people not to use those outlets. I'm creating a high-priority ticket for this - TK-2024-004.

Caller: Thank you, David. I really appreciate the quick response on this.

Agent: Safety is our top priority. I'll call you personally once the electrician completes their inspection.

Caller: Perfect, I'll be waiting for your call.`,
      audio_url: '/mock-audio-5.wav',
      ticket_id: 'TK-2024-004',
      created_at: '2024-01-12T10:30:00Z',
      direction: 'inbound',
      call_quality: 5,
      status: 'completed',
      summary: 'Electrical safety issue - sparking outlets, emergency inspection scheduled',
    },
  ];

  const filteredCalls = useMemo(() => {
    return mockCalls.filter((call) => {
      // Tab filter
      if (filters.tab === 'incoming' && call.direction !== 'inbound') return false;
      if (filters.tab === 'outgoing' && call.direction !== 'outbound') return false;
      if (filters.tab === 'voicemails' && call.status !== 'voicemail') return false;

      // Search filter
      if (filters.search && !call.phone_number.toLowerCase().includes(filters.search.toLowerCase()) &&
          !call.contact_name?.toLowerCase().includes(filters.search.toLowerCase()) &&
          !call.transcript.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Duration filter
      if (filters.duration === 'short' && call.call_duration > 60) return false;
      if (filters.duration === 'medium' && (call.call_duration <= 60 || call.call_duration > 300)) return false;
      if (filters.duration === 'long' && call.call_duration <= 300) return false;

      // Ticket filter
      if (filters.hasTicket === 'yes' && !call.ticket_id) return false;
      if (filters.hasTicket === 'no' && call.ticket_id) return false;

      // Date range filter
      if (filters.dateRange?.from || filters.dateRange?.to) {
        const callDate = new Date(call.created_at);
        if (filters.dateRange.from && callDate < filters.dateRange.from) return false;
        if (filters.dateRange.to && callDate > filters.dateRange.to) return false;
      }

      return true;
    });
  }, [mockCalls, filters]);

  const handleFilterChange = (newFilters: Partial<CallFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleCallSelect = (call: Call) => {
    setSelectedCall(call);
  };

  // Auto-select first call if none selected
  React.useEffect(() => {
    if (!selectedCall && filteredCalls.length > 0) {
      setSelectedCall(filteredCalls[0]);
    }
  }, [filteredCalls, selectedCall]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Calls & Communications
        </h1>
        <p className="text-muted-foreground">
          Review call transcripts and manage communications history.
        </p>
      </div>

      {/* Filter Bar */}
      <CallsFilterBar
        filters={filters}
        onFiltersChange={handleFilterChange}
        totalResults={filteredCalls.length}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Calls List - 40% width on desktop */}
        <div className="lg:col-span-2">
          <CallsList
            calls={filteredCalls}
            selectedCall={selectedCall}
            onCallSelect={handleCallSelect}
          />
        </div>

        {/* Call Details - 60% width on desktop */}
        <div className="lg:col-span-3">
          {selectedCall ? (
            <CallDetails call={selectedCall} />
          ) : (
            <div className="flex items-center justify-center h-96 bg-card border border-border rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Select a Call
                </h3>
                <p className="text-muted-foreground">
                  Choose a call from the list to view transcript and details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calls;