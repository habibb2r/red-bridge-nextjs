'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Activity, Users, Droplets, Calendar, MapPin, Phone, Eye } from 'lucide-react';

export default function HospitalPortal() {
  const [hospitalStats] = useState({
    totalInventory: 248,
    criticalLevels: 3,
    donorsRegistered: 1250,
    requestsFulfilled: 156
  });

  const [bloodInventory] = useState([
    { bloodGroup: 'A+', available: 45, minimum: 20, status: 'good' },
    { bloodGroup: 'A-', available: 12, minimum: 15, status: 'low' },
    { bloodGroup: 'B+', available: 38, minimum: 20, status: 'good' },
    { bloodGroup: 'B-', available: 8, minimum: 10, status: 'critical' },
    { bloodGroup: 'AB+', available: 15, minimum: 10, status: 'good' },
    { bloodGroup: 'AB-', available: 5, minimum: 8, status: 'low' },
    { bloodGroup: 'O+', available: 67, minimum: 30, status: 'good' },
    { bloodGroup: 'O-', available: 9, minimum: 15, status: 'critical' },
  ]);

  const [pendingRequests] = useState([
    {
      id: '1',
      title: 'Emergency Surgery - O- Blood Needed',
      description: 'Patient requires immediate surgery, urgent need for O- blood',
      bloodGroup: 'O-',
      quantity: 4,
      urgency: 'Critical',
      dateNeeded: new Date('2024-01-20'),
      location: 'Downtown Medical Center',
      contact: '+1 (555) 123-4567',
      status: 'open'
    },
    {
      id: '2',
      title: 'Post-operative Care - A+ Blood',
      description: 'Patient recovering from major surgery needs blood transfusion',
      bloodGroup: 'A+',
      quantity: 2,
      urgency: 'High',
      dateNeeded: new Date('2024-01-21'),
      location: 'City General Hospital',
      contact: '+1 (555) 987-6543',
      status: 'open'
    },
    {
      id: '3',
      title: 'Cancer Treatment - B+ Blood',
      description: 'Chemotherapy patient needs regular blood transfusions',
      bloodGroup: 'B+',
      quantity: 3,
      urgency: 'Medium',
      dateNeeded: new Date('2024-01-22'),
      location: 'Oncology Center',
      contact: '+1 (555) 456-7890',
      status: 'open'
    }
  ]);

  const getInventoryStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald-500';
      case 'low': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Low': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleFulfillRequest = (requestId: string) => {
    alert(`Fulfilling request ${requestId}`);
  };

  const handleViewDetails = (requestId: string) => {
    alert(`Viewing details for request ${requestId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <Building2 className="h-10 w-10 text-green-500 mr-3" />
            Hospital Portal
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage blood inventory and donation requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-100 flex items-center">
                <Droplets className="h-4 w-4 mr-2" />
                Total Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{hospitalStats.totalInventory}</div>
              <p className="text-green-100 text-sm">units available</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-100 flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Critical Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{hospitalStats.criticalLevels}</div>
              <p className="text-red-100 text-sm">blood types</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-100 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Registered Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{hospitalStats.donorsRegistered}</div>
              <p className="text-blue-100 text-sm">active donors</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-100 flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Requests Fulfilled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{hospitalStats.requestsFulfilled}</div>
              <p className="text-purple-100 text-sm">this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blood Inventory */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <Droplets className="h-6 w-6 text-red-500 mr-2" />
                Blood Inventory
              </CardTitle>
              <CardDescription>Current blood stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bloodInventory.map((item) => (
                  <div key={item.bloodGroup} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-red-600">{item.bloodGroup}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.available} units</p>
                        <p className="text-sm text-gray-600">Min: {item.minimum} units</p>
                      </div>
                    </div>
                    <Badge className={`${getInventoryStatusColor(item.status)} text-white`}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                Pending Requests
              </CardTitle>
              <CardDescription>Blood requests awaiting fulfillment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800">{request.title}</h3>
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Droplets className="h-4 w-4 text-red-500 mr-2" />
                        <span className="font-medium">{request.bloodGroup}</span>
                        <span className="ml-1">({request.quantity} units)</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                        <span>{request.dateNeeded.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-green-500 mr-2" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-purple-500 mr-2" />
                        <span>{request.contact}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleViewDetails(request.id)}
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleFulfillRequest(request.id)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Fulfill Request
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Quick Actions</CardTitle>
            <CardDescription>Common hospital portal tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <div>Manage Donors</div>
                </div>
              </Button>
              <Button className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                <div className="text-center">
                  <Activity className="h-6 w-6 mx-auto mb-2" />
                  <div>Update Inventory</div>
                </div>
              </Button>
              <Button className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                <div className="text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2" />
                  <div>Schedule Drives</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
