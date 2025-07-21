'use client';

import { useState, useEffect } from 'react';
import BloodRequestForm from '@/components/blood-request/BloodRequestForm';
import BloodRequestCard from '@/components/blood-request/BloodRequestCard';
import { BloodRequest } from '@/lib/api';
import { Heart, Users, Building2, Activity, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import apiService from '@/lib/api';
import { Toaster } from 'sonner';
import BloodGroupCompatibility from '@/components/home-components/BloodGroupCompatibility';
import WhyDonateBlood from '@/components/home-components/WhyDonateBlood';
import DonorStories from '@/components/home-components/DonorStories';
import FAQ from '@/components/home-components/FAQ';

export default function Home() {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blood requests from API
  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getBloodRequests();
        console.log('responsse', response)
        if (response.success && response.data) {
          setBloodRequests(response.data);
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


  const handleContactRequester = (request: BloodRequest) => {
    alert(`Contact info: ${request.requestedBy.email}\nRequester: ${request.requestedBy.name}`);
  };

  const handleNewRequest = () => {
    // Refresh the blood requests after a new one is created
    window.location.reload(); // Simple refresh for now
  };

  const stats = [
    {
      title: 'Active Requests',
      value: bloodRequests.filter((request) => request.status === 'open').length,
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
      title: 'Hospitals',
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
      <Toaster position="top-center" duration={5000} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center gap-3">
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:scale-105 transition-transform duration-200 border-gray-100">
                  <CardHeader className="pb-2">
                    <Icon className={`h-10 w-10 mx-auto ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <p className="text-gray-600 font-medium">{stat.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Urgent Blood Requests Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Current Urgent Blood Requests
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help save lives by responding to these urgent blood requests
            </p>
          </div>


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
              {bloodRequests.filter((request) => request.urgency === 'high').length > 0 ? (
                bloodRequests.filter((request) => request.urgency === 'high').map((request) => (
                  <BloodRequestCard
                    key={request._id}
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

      <BloodGroupCompatibility />
      <WhyDonateBlood />
      <DonorStories />
      <FAQ />
    </div>
  );
}



