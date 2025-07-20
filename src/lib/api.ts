const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'hospital' | 'admin';
    phoneNumber?: string;
  };
  token: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'hospital';
  phoneNumber: string;
}

export interface BloodRequest {
  _id: string;
  title: string;
  description: string;
  requestedBy: {
    _id: string;
    name: string;
    email: string;
  };
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  quantity: number;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'fulfilled' | 'rejected';
  dateNeeded: string;
  responses?: Array<{
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  bloodGroup: string;
  quantity: number;
  expiryDate: string;
  status: 'available' | 'reserved' | 'expired';
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'hospital' | 'admin';
  phoneNumber?: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Hospital {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Something went wrong');
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User profile
  async getProfile(): Promise<ApiResponse<LoginResponse['user']>> {
    return this.request<LoginResponse['user']>('/auth/profile');
  }

  // Blood requests endpoints
  async getBloodRequests(): Promise<ApiResponse<BloodRequest[]>> {
    const response = await this.request<unknown[]>('/blood-requests/get-blood-requests');
    console.log('Blood requests response:', response.data);
    
    // Transform the response data if needed
    if (response.success && response.data) {
      const { transformBloodRequests } = await import('./transformers');
      const transformedData = transformBloodRequests(response.data.data as unknown[]);
      return {
        success: true,
        data: transformedData,
      };
    }
    
    return response as ApiResponse<BloodRequest[]>;
  }

  async createBloodRequest(requestData: Partial<BloodRequest>): Promise<ApiResponse<BloodRequest>> {
    return this.request<BloodRequest>('/blood-requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async updateBloodRequest(id: string, requestData: Partial<BloodRequest>): Promise<ApiResponse<BloodRequest>> {
    return this.request<BloodRequest>(`/blood-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  }

  async deleteBloodRequest(id: string): Promise<ApiResponse> {
    return this.request(`/blood-requests/${id}`, {
      method: 'DELETE',
    });
  }

  // Hospital endpoints
  async getHospitalInventory(): Promise<ApiResponse<InventoryItem[]>> {
    return this.request<InventoryItem[]>('/hospital/inventory');
  }

  async updateInventory(inventoryData: Partial<InventoryItem>): Promise<ApiResponse<InventoryItem>> {
    return this.request<InventoryItem>('/hospital/inventory', {
      method: 'POST',
      body: JSON.stringify(inventoryData),
    });
  }

  // Admin endpoints
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/admin/users');
  }

  async getHospitals(): Promise<ApiResponse<Hospital[]>> {
    return this.request<Hospital[]>('/admin/hospitals');
  }

  async approveHospital(hospitalId: string): Promise<ApiResponse> {
    return this.request(`/admin/hospitals/${hospitalId}/approve`, {
      method: 'PUT',
    });
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;
