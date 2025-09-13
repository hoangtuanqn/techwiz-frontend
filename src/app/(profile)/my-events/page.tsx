'use client';

import { useState, useMemo } from 'react';
import { Ticket, Calendar, Clock, Search } from 'lucide-react';

// Mock data for demonstration
const attendedEvents = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    date: '2024-08-15',
    time: '09:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    title: 'Advanced Design Workshop',
    date: '2024-07-21',
    time: '01:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
  },
  {
    id: 3,
    title: 'Startup Pitch Night',
    date: '2024-06-05',
    time: '06:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
];

export default function EventsAttendedPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredEvents = useMemo(() => {
    let events = attendedEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    events.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return events;
  }, [searchQuery, sortBy]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Events Attended</h1>
      <p className="text-gray-600 mb-8">Here is a list of events you have participated in.</p>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-lg border-gray-300 pl-10 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>
      </div>

      {/* Event Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 truncate">{event.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-5">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{event.time}</span>
                </div>
                <button className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-100 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-200 transition-colors">
                  <Ticket className="h-4 w-4 mr-2" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">No Events Found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
