'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Building2, Activity, Eye, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { BloodRequest, User, Hospital } from '@/types';
import { format } from 'date-fns';

// Mock admin data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    bloodGroup: 'O+',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    isAvailableToDonate: true,
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    bloodGroup: 'A+',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, CA',
    isAvailableToDonate: false,
    createdAt: new Date('2025-01-10'),
  },
];

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    email: 'admin@cityhospital.com',
    phone: '+1 (555) 111-2222',
    address: '123 Medical Dr, Health City',
    license: 'HOS-2024-001',
    bloodBankCapacity: 500,
    availableBloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    createdAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    name: 'Memorial Hospital',
    email: 'contact@memorial.com',
    phone: '+1 (555) 333-4444',
    address: '456 Healthcare Ave, Medical City',
    license: 'HOS-2024-002',
    bloodBankCapacity: 300,
    availableBloodTypes: ['A+', 'B+', 'O+', 'AB+'],
    createdAt: new Date('2024-11-15'),
  },
];

const mockAllRequests: BloodRequest[] = [
  {
    id: '1',
    title: 'Emergency Surgery Blood Request',
    description: 'Urgent blood needed for emergency surgery',
    bloodGroup: 'O+',
    quantity: 3,
    urgency: 'Critical',
    dateNeeded: new Date('2025-07-22'),
    requesterId: '1',
    requesterName: 'John Doe',
    contactInfo: '+1 (555) 123-4567',
    address: 'City General Hospital',
    createdAt: new Date('2025-07-21'),
    status: 'open',
  },
  {
    id: '2',
    title: 'Cancer Treatment Support',
    description: 'Regular blood supply needed for ongoing treatment',
    bloodGroup: 'A+',
    quantity: 2,
    urgency: 'High',
    dateNeeded: new Date('2025-07-25'),
    requesterId: '2',
    requesterName: 'Jane Smith',
    contactInfo: '+1 (555) 987-6543',
    address: 'Memorial Hospital',
    createdAt: new Date('2025-07-20'),
    status: 'fulfilled',
  },
];

export default function AdminPortal() {
  const [users] = useState(mockUsers);
  const [hospitals] = useState(mockHospitals);
  const [bloodRequests] = useState(mockAllRequests);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'hospitals' | 'requests'>('overview');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'hospital': return 'bg-blue-500';
      case 'user': return 'bg-green-500';
      default: return 'bg-gray-500';
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

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-green-600',
      change: '+12%',
    },
    {
      title: 'Partner Hospitals',
      value: hospitals.length,
      icon: Building2,
      color: 'text-blue-600',
      change: '+5%',
    },
    {
      title: 'Active Requests',
      value: bloodRequests.filter(req => req.status === 'open').length,
      icon: Activity,
      color: 'text-orange-600',
      change: '-8%',
    },
    {
      title: 'Fulfilled Requests',
      value: bloodRequests.filter(req => req.status === 'fulfilled').length,
      icon: CheckCircle,
      color: 'text-purple-600',
      change: '+15%',
    },
  ];

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">New user registered: John Doe</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Blood request fulfilled: Emergency Surgery</span>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">New hospital partner: Memorial Hospital</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const UsersTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage registered users and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Phone: {user.phone}</span>
                    <span>Location: {user.location}</span>
                    <span>Blood Type: {user.bloodGroup}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  <Badge className={user.isAvailableToDonate ? 'bg-green-500' : 'bg-gray-500'}>
                    {user.isAvailableToDonate ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Joined: {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const HospitalsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Hospital Management</CardTitle>
        <CardDescription>Manage partner hospitals and their information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-gray-600 text-sm">{hospital.email}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Phone: {hospital.phone}</span>
                    <span>License: {hospital.license}</span>
                    <span>Capacity: {hospital.bloodBankCapacity} units</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{hospital.address}</p>
                </div>
                <Badge className="bg-blue-500">Verified</Badge>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Partner since: {format(new Date(hospital.createdAt), 'MMM dd, yyyy')}
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const RequestsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Blood Request Management</CardTitle>
        <CardDescription>Monitor and manage all blood donation requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bloodRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{request.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{request.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Blood Type: {request.bloodGroup}</span>
                    <span>Quantity: {request.quantity} units</span>
                    <span>Urgency: {request.urgency}</span>
                    <span>Location: {request.location}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-500">
                  Created: {format(new Date(request.createdAt), 'MMM dd, yyyy')} by {request.requesterName}
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Status
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <Shield className="h-10 w-10 text-purple-500 mr-3" />
            Admin Portal
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage users, hospitals, and blood donation requests
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'hospitals', label: 'Hospitals', icon: Building2 },
              { id: 'requests', label: 'Requests', icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'overview' | 'users' | 'hospitals' | 'requests')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && <OverviewTab />}
        {selectedTab === 'users' && <UsersTab />}
        {selectedTab === 'hospitals' && <HospitalsTab />}
        {selectedTab === 'requests' && <RequestsTab />}
      </div>
    </div>
  );
}
