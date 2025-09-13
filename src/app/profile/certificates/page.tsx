'use client';

import { useState, useMemo } from 'react';
import { Award, Download, Building, Calendar, Search } from 'lucide-react';

// Mock data for demonstration
const receivedCertificates = [
  {
    id: 1,
    title: 'Certified JavaScript Developer',
    issuer: 'Tech Academy',
    date: '2024-08-16',
    imageUrl: 'https://images.unsplash.com/photo-1621871993333-18a1a7472636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    title: 'Advanced UI/UX Principles',
    issuer: 'Design Institute',
    date: '2024-07-22',
    imageUrl: 'https://images.unsplash.com/photo-1600815899485-d633c643a856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    title: 'Public Speaking Mastery',
    issuer: 'Communication Experts',
    date: '2024-06-06',
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-df876c3b5b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
];

export default function CertificatesReceivedPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredCertificates = useMemo(() => {
    let certificates = receivedCertificates.filter(cert =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    certificates.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return certificates;
  }, [searchQuery, sortBy]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificates Received</h1>
      <p className="text-gray-600 mb-8">A collection of all the certificates you have earned.</p>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search certificates..."
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

      {/* Certificate Grid */}
      {filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCertificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <img src={cert.imageUrl} alt={cert.title} className="w-full h-40 object-cover" />
              <div className="p-6">
                  <div className="flex items-start mb-3">
                      <Award className="h-8 w-8 text-amber-500 mr-4 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">{cert.title}</h3>
                  </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Issued by {cert.issuer}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-5">
                   <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <button className="w-full inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">No Certificates Found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
