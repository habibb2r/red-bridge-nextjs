import { BloodRequest } from '@/lib/api';

// API Response types - Updated to match actual MongoDB schema
interface ApiBloodRequest {
  _id: string;
  title: string;
  description: string;
  requestedBy: {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
  };
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  quantity: number;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'fulfilled' | 'rejected';
  dateNeeded: string;
  responses?: Array<{
    _id: string;
    // Reference to donorResponses collection
  }>;
  createdAt: string;
  updatedAt: string;
}

interface BloodRequestSubmission {
  title: string;
  description: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  quantity: number;
  urgency: 'low' | 'medium' | 'high';
  dateNeeded: string;
}

// Transform API response to internal format
export function transformBloodRequest(apiRequest: ApiBloodRequest): BloodRequest {
  return {
    _id: apiRequest._id,
    title: apiRequest.title,
    description: apiRequest.description,
    requestedBy: {
      _id: apiRequest.requestedBy._id,
      name: apiRequest.requestedBy.name,
      email: apiRequest.requestedBy.email,
    },
    bloodGroup: apiRequest.bloodGroup,
    quantity: apiRequest.quantity,
    urgency: apiRequest.urgency,
    status: apiRequest.status,
    dateNeeded: apiRequest.dateNeeded,
    responses: apiRequest.responses || [],
    createdAt: apiRequest.createdAt,
    updatedAt: apiRequest.updatedAt,
  };
}

// Transform multiple blood requests
export function transformBloodRequests(apiRequests: unknown[]): BloodRequest[] {
  return apiRequests.map(request => transformBloodRequest(request as ApiBloodRequest));
}

// Transform internal format for API submission
export function transformForApi(internalRequest: BloodRequestSubmission) {
  return {
    title: internalRequest.title,
    description: internalRequest.description,
    bloodGroup: internalRequest.bloodGroup,
    quantity: internalRequest.quantity,
    urgency: internalRequest.urgency,
    dateNeeded: internalRequest.dateNeeded,
    // Add any other fields your API expects
  };
}
