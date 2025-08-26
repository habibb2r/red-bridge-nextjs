export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Urgency = 'Low' | 'Medium' | 'High' | 'Critical';

export type UserRole = 'user' | 'admin' | 'hospital';

export interface BloodRequest {
  id: string;
  title: string;
  description: string;
  bloodGroup: BloodGroup;
  quantity: number;
  urgency: Urgency;
  dateNeeded: Date;
  requesterId: string;
  requesterName: string;
  contactInfo: string;
  address: string;
  // Some components use `location`; keep it optional for compatibility
  location?: string;
  createdAt: Date;
  status: 'open' | 'fulfilled' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bloodGroup?: BloodGroup;
  phone: string;
  location: string;
  isAvailableToDonate: boolean;
  createdAt: Date;
}

export interface Hospital {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  license: string;
  bloodBankCapacity: number;
  availableBloodTypes: BloodGroup[];
  createdAt: Date;
}
