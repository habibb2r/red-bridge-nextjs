'use client';

import { useState } from 'react';
import BloodRequestForm from '@/components/blood-request/BloodRequestForm';
import BloodRequestCard from '@/components/blood-request/BloodRequestCard';
import FilterSort, { FilterOptions, SortOption } from '@/components/blood-request/FilterSort';
import { BloodRequest } from '@/types';
import { Heart, Users, Building2, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Mock data for demonstration
const mockBloodRequests: BloodRequest[] = [
  {
    id: '1',
    title: 'Urgent Blood Needed for Surgery',
    description: 'Patient needs blood transfusion for emergency surgery. Located at City General Hospital.',
    bloodGroup: 'O+',
    quantity: 2,
    urgency: 'Critical',
    dateNeeded: new Date('2025-07-25'),
    requesterId: 'user1',
    requesterName: 'Dr. Sarah Johnson',
    contactInfo: '+1 (555) 123-4567',
    location: 'City General Hospital',
    createdAt: new Date('2025-07-21'),
    status: 'open',
  },
  {
    id: '2',
    title: 'Blood Donation Needed for Cancer Patient',
    description: 'Long-term cancer treatment requires regular blood transfusions.',
    bloodGroup: 'A+',
    quantity: 3,
    urgency: 'High',
    dateNeeded: new Date('2025-07-30'),
    requesterId: 'user2',
    requesterName: 'Memorial Hospital',
    contactInfo: '+1 (555) 987-6543',
    location: 'Memorial Hospital',
    createdAt: new Date('2025-07-20'),
    status: 'open',
  },
  {
    id: '3',
    title: 'Planned Surgery Blood Request',
    description: 'Scheduled surgery next week, need to ensure blood availability.',
    bloodGroup: 'B-',
    quantity: 1,
    urgency: 'Medium',
    dateNeeded: new Date('2025-08-02'),
    requesterId: 'user3',
    requesterName: 'John Smith',
    contactInfo: '+1 (555) 456-7890',
    location: 'St. Mary\'s Hospital',
    createdAt: new Date('2025-07-19'),
    status: 'open',
  },
];

export default function Home() {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(mockBloodRequests);
  const [filteredRequests, setFilteredRequests] = useState<BloodRequest[]>(mockBloodRequests);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>('dateNeeded');

  const handleNewRequest = (formData: { title: string; description: string; bloodGroup: string; quantity: number; urgency: string; dateNeeded: string; contactInfo: string; location: string }) => {
    const newRequest: BloodRequest = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      bloodGroup: formData.bloodGroup as BloodRequest['bloodGroup'],
      quantity: formData.quantity,
      urgency: formData.urgency as BloodRequest['urgency'],
      dateNeeded: new Date(formData.dateNeeded),
      requesterId: 'current-user',
      requesterName: 'Current User',
      contactInfo: formData.contactInfo,
      location: formData.location,
      createdAt: new Date(),
      status: 'open',
    };
    
    const updatedRequests = [newRequest, ...bloodRequests];
    setBloodRequests(updatedRequests);
    applyFiltersAndSort(updatedRequests, filters, sortBy);
  };

  const applyFiltersAndSort = (requests: BloodRequest[], currentFilters: FilterOptions, currentSort: SortOption) => {
    let filtered = [...requests];

    // Apply filters
    if (currentFilters.bloodGroup) {
      filtered = filtered.filter(req => req.bloodGroup === currentFilters.bloodGroup);
    }
    if (currentFilters.urgency) {
      filtered = filtered.filter(req => req.urgency === currentFilters.urgency);
    }
    if (currentFilters.status) {
      filtered = filtered.filter(req => req.status === currentFilters.status);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'dateNeeded':
          return new Date(a.dateNeeded).getTime() - new Date(b.dateNeeded).getTime();
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'urgency':
          const urgencyOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        case 'bloodGroup':
          return a.bloodGroup.localeCompare(b.bloodGroup);
        default:
          return 0;
      }
    });

    setFilteredRequests(filtered);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    applyFiltersAndSort(bloodRequests, newFilters, sortBy);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    applyFiltersAndSort(bloodRequests, filters, newSort);
  };

  const handleContactRequester = (request: BloodRequest) => {
    alert(`Contact info: ${request.contactInfo}\nRequester: ${request.requesterName}`);
  };

  const stats = [
    {
      title: 'Active Requests',
      value: bloodRequests.filter(req => req.status === 'open').length,
      icon: Activity,
      color: 'text-red-500',
    },
    {
      title: 'Total Donors',
      value: '1,234',
      icon: Users,
      color: 'text-emerald-500',
    },
    {
      title: 'Partner Hospitals',
      value: '45',
      icon: Building2,
      color: 'text-blue-500',
    },
    {
      title: 'Lives Saved',
      value: '892',
      icon: Heart,
      color: 'text-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
            Save Lives, Donate Blood
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Connect with those in need and make a difference in your community
          </p>
          <BloodRequestForm onSubmit={handleNewRequest} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:scale-105 transition-transform duration-200 border-gray-100">
                  <CardHeader className="pb-2">
                    <Icon className={`h-10 w-10 mx-auto ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <p className="text-gray-600 font-medium">{stat.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blood Requests Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Current Blood Requests
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help save lives by responding to these urgent blood requests
            </p>
          </div>

          <FilterSort 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <BloodRequestCard
                  key={request.id}
                  request={request}
                  onContact={handleContactRequester}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No blood requests found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later for new requests.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
