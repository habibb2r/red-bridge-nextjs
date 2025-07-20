'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, User, Calendar, MapPin, Droplets, Edit, Trash2 } from 'lucide-react';
import BloodRequestForm from '@/components/blood-request/BloodRequestForm';
import { BloodRequest } from '@/types';
import { format } from 'date-fns';

// Mock user data
const mockUserRequests: BloodRequest[] = [
  {
    id: '1',
    title: 'My Blood Request for Surgery',
    description: 'Need blood for upcoming surgery',
    bloodGroup: 'O+',
    quantity: 2,
    urgency: 'High',
    dateNeeded: new Date('2025-07-30'),
    requesterId: 'current-user',
    requesterName: 'Current User',
    contactInfo: '+1 (555) 123-4567',
    location: 'City General Hospital',
    createdAt: new Date('2025-07-21'),
    status: 'open',
  },
];

export default function UserPortal() {
  const [userRequests, setUserRequests] = useState<BloodRequest[]>(mockUserRequests);

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
    
    setUserRequests([newRequest, ...userRequests]);
  };

  const handleDeleteRequest = (id: string) => {
    if (confirm('Are you sure you want to delete this request?')) {
      setUserRequests(userRequests.filter(req => req.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'fulfilled': return 'bg-blue-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-600';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center">
                <User className="h-10 w-10 text-blue-500 mr-3" />
                User Portal
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage your blood donation requests and profile
              </p>
            </div>
            <BloodRequestForm onSubmit={handleNewRequest} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {userRequests.filter(req => req.status === 'open').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Fulfilled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {userRequests.filter(req => req.status === 'fulfilled').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-100">Blood Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">O+</div>
            </CardContent>
          </Card>
        </div>

        {/* My Requests Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="h-5 w-5 text-red-600 mr-2" />
              My Blood Requests
            </CardTitle>
            <CardDescription>
              View and manage all your blood donation requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userRequests.length > 0 ? (
              <div className="space-y-4">
                {userRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                        <p className="text-gray-600 mt-1">{request.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-red-600" />
                        <span className="font-semibold text-red-600">{request.bloodGroup}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <span className="font-medium">{request.quantity} units</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(request.dateNeeded), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        Created: {format(new Date(request.createdAt), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteRequest(request.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No blood requests yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Create your first blood request to get started.
                </p>
                <BloodRequestForm onSubmit={handleNewRequest} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 text-red-600 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and donation preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900">John Doe</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">john.doe@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Blood Type</label>
                  <p className="text-red-600 font-semibold">O+</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-900">New York, NY</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Available to Donate</label>
                  <p className="text-green-600">Yes</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
