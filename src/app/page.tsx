'use client';

import { useState, useEffect } from 'react';
import BloodRequestForm from '@/components/blood-request/BloodRequestForm';
import BloodRequestCard from '@/components/blood-request/BloodRequestCard';
import FilterSort, { FilterOptions, SortOption } from '@/components/blood-request/FilterSort';
import { BloodRequest as ApiBloodRequest } from '@/lib/api';
import { BloodRequest as ComponentBloodRequest } from '@/types';
import { Heart, Users, Building2, Activity, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import apiService from '@/lib/api';

export default function Home() {
  const [bloodRequests, setBloodRequests] = useState<ApiBloodRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ComponentBloodRequest[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>('dateNeeded');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blood requests from API
  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getBloodRequests();
        
        if (response.success && response.data) {
          setBloodRequests(response.data);
          const transformedRequests = response.data.map(transformToComponentBloodRequest);
          setFilteredRequests(transformedRequests);
        } else {
          setError(response.error || 'Failed to fetch blood requests');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequests();
  }, []);

  const handleNewRequest = () => {
    // Refresh the blood requests after a new one is created
    window.location.reload(); // Simple refresh for now
  };

  // Filter and sort blood requests
  const applyFiltersAndSort = (requests: ComponentBloodRequest[], currentFilters: FilterOptions, currentSort: SortOption) => {
    let filtered = requests;
    
    if (currentFilters.bloodGroup) {
      filtered = filtered.filter(req => req.bloodGroup === currentFilters.bloodGroup);
    }
    
    if (currentFilters.urgency) {
      filtered = filtered.filter(req => req.urgency === currentFilters.urgency);
    }
    
    if (currentFilters.address) {
      filtered = filtered.filter(req => 
        req.address.toLowerCase().includes(currentFilters.address!.toLowerCase())
      );
    }
    
    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (currentSort) {
        case 'urgency':
          const urgencyOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        case 'dateNeeded':
          return new Date(a.dateNeeded).getTime() - new Date(b.dateNeeded).getTime();
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
    
    setFilteredRequests(sorted);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    const transformedRequests = bloodRequests.map(transformToComponentBloodRequest);
    applyFiltersAndSort(transformedRequests, newFilters, sortBy);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    const transformedRequests = bloodRequests.map(transformToComponentBloodRequest);
    applyFiltersAndSort(transformedRequests, filters, newSort);
  };

  // Transform API BloodRequest to component BloodRequest
  const transformToComponentBloodRequest = (apiRequest: ApiBloodRequest): ComponentBloodRequest => {
    return {
      id: apiRequest._id,
      title: apiRequest.title,
      description: apiRequest.description,
      bloodGroup: apiRequest.bloodGroup as ComponentBloodRequest['bloodGroup'],
      quantity: apiRequest.quantity,
      urgency: apiRequest.urgency.charAt(0).toUpperCase() + apiRequest.urgency.slice(1) as ComponentBloodRequest['urgency'], // Convert to Title case
      dateNeeded: new Date(apiRequest.dateNeeded),
      requesterId: apiRequest.requestedBy._id,
      requesterName: apiRequest.requestedBy.name,
      contactInfo: apiRequest.requestedBy.email,
      address: apiRequest.address, // Using requester name as location for now
      createdAt: new Date(apiRequest.createdAt),
      status: apiRequest.status === 'rejected' ? 'cancelled' : apiRequest.status,
    };
  };

  const handleContactRequester = (request: ComponentBloodRequest) => {
    alert(`Contact info: ${request.contactInfo}\nRequester: ${request.requesterName}`);
  };

  const stats = [
    {
      title: 'Active Requests',
      value: filteredRequests.filter((req: ComponentBloodRequest) => req.status === 'open').length,
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

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              <span className="ml-2 text-lg">Loading blood requests...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
              <p className="font-medium">Error loading blood requests:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Blood Requests Grid */}
          {!loading && !error && (
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
          )}
        </div>
      </section>
    </div>
  );
}
