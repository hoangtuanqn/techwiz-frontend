import publicApi from "~/libs/apis/publicApi";

// Types
export interface OrganizerEvent {
    id: number;
    title: string;
    summary: string;
    description: string;
    category: string;
    venue: string;
    start_event: string;
    end_event: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    rejection_reason?: string;
    capacity: number;
    booked_count: number;
    mode: 'onsite' | 'online' | 'hybrid';
    note?: string;
    email_contact?: string;
    phone_contact?: string;
    thumbnail?: string;
    created_at: string;
    updated_at: string;
}

export interface OrganizerStats {
    total_events: number;
    approved_events: number;
    pending_events: number;
    rejected_events: number;
    cancelled_events: number;
    total_participants: number;
    monthly_stats: Array<{
        year: number;
        month: number;
        count: number;
    }>;
}

export interface EventParticipant {
    id: number;
    name: string;
    email: string;
    registered_at: string;
    checked_in: boolean;
    checked_in_at?: string;
}

export interface EventWaitlistMember {
    id: number;
    name: string;
    email: string;
    position: number;
    joined_at: string;
}

export interface EventSupporter {
    id: number;
    name: string;
    email: string;
    role: string;
    joined_at: string;
}

export interface OrganizerEventsResponse {
    data: {
        data: OrganizerEvent[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

// API Functions
export const organizerApi = {
    // Get organizer's events
    getMyEvents: (params?: { status?: string; page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.append('status', params.status);
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const url = `/events/organizer/my-events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return publicApi.get<OrganizerEventsResponse>(url);
    },

    // Get organizer statistics
    getStats: () => {
        return publicApi.get<OrganizerStats>('/events/organizer/stats');
    },

    // Update event by organizer
    updateEvent: (eventId: number, data: Partial<OrganizerEvent>) => {
        return publicApi.put<OrganizerEvent>(`/events/${eventId}/organizer-update`, data);
    },

    // Get event participants
    getEventParticipants: (eventId: number) => {
        return publicApi.get<EventParticipant[]>(`/events/${eventId}/organizer-participants`);
    },

    // Get event waitlist
    getEventWaitlist: (eventId: number) => {
        return publicApi.get<EventWaitlistMember[]>(`/events/${eventId}/organizer-waitlist`);
    },

    // Get event supporters
    getEventSupporters: (eventId: number) => {
        return publicApi.get<EventSupporter[]>(`/events/${eventId}/organizer-supporters`);
    },
};
