# RedBridge - Blood Donation Platform

A comprehensive blood donation platform built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

### Authentication System
- **Login**: `/auth/login` - User authentication with role-based access
- **Signup**: `/auth/signup` - User registration for donors and hospitals
- **Forgot Password**: `/auth/forgot-password` - Password reset functionality
- **Role-based Access**: Different dashboards for users, hospitals, and admins

### API Integration
- **Base URL**: `http://localhost:5000/api`
- **Endpoints**:
  - `POST /auth/login` - User login
  - `POST /auth/signup` - User registration
  - `POST /auth/forgot-password` - Password reset
  - `GET /auth/profile` - Get user profile
  - `POST /auth/logout` - User logout
  - `GET /blood-requests` - Get all blood requests
  - `POST /blood-requests` - Create new blood request
  - `PUT /blood-requests/:id` - Update blood request
  - `DELETE /blood-requests/:id` - Delete blood request
  - `GET /hospital/inventory` - Get hospital inventory
  - `POST /hospital/inventory` - Update inventory
  - `GET /admin/users` - Get all users (admin only)
  - `GET /admin/hospitals` - Get all hospitals (admin only)

### User Roles
1. **User/Donor**: Can create blood requests, view requests, manage profile
2. **Hospital**: Can manage blood inventory, view requests, manage hospital profile
3. **Admin**: Full system access, user management, hospital approval

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **State Management**: React Context (Authentication)

## 📝 API Service Layer

The application includes a comprehensive API service layer located in `src/lib/api.ts` that handles:

- **Authentication**: Login, signup, logout, password reset
- **Blood Requests**: CRUD operations for blood requests
- **Hospital Management**: Inventory management
- **Admin Operations**: User and hospital management
- **Error Handling**: Comprehensive error handling with TypeScript types
- **Token Management**: Automatic token inclusion in requests

## 🔐 Authentication Flow

1. User visits login/signup pages
2. Credentials are sent to your backend API
3. Backend returns user data and JWT token
4. Token is stored in localStorage
5. Subsequent API calls include the token automatically
6. Role-based navigation and access control

## 🏥 Role-Based Dashboards

### User Portal (`/user`)
- View and create blood requests
- Search and filter available requests
- Manage profile and donation history

### Hospital Portal (`/hospital`)
- Manage blood inventory
- View incoming requests
- Track donations and distributions
- Hospital profile management

### Admin Panel (`/admin`)
- User management
- Hospital approval workflow
- System analytics and reports
- Content moderation

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Configure API**:
   - Ensure your backend API is running on `http://localhost:5000`
   - Update `API_BASE_URL` in `src/lib/api.ts` if needed

4. **Test Authentication**:
   - Visit `http://localhost:3002/auth/login`
   - Try logging in with your backend credentials
   - Check network tab to see API calls

## 📡 API Integration Example

```typescript
// Login example
import apiService from '@/lib/api';

const handleLogin = async (email: string, password: string) => {
  const response = await apiService.login({ email, password });
  
  if (response.success) {
    // User logged in successfully
    console.log('User:', response.data.user);
    console.log('Token:', response.data.token);
  } else {
    // Handle error
    console.error('Login failed:', response.error);
  }
};

// Create blood request example
const createRequest = async (requestData) => {
  const response = await apiService.createBloodRequest(requestData);
  
  if (response.success) {
    console.log('Request created:', response.data);
  } else {
    console.error('Failed to create request:', response.error);
  }
};
```

## 🎨 UI Components

All components are built with shadcn/ui and include:
- **Forms**: Validation with error messages and loading states
- **Cards**: Blood request cards with status indicators
- **Buttons**: Various states (loading, disabled, variants)
- **Alerts**: Success/error notifications
- **Dialogs**: Modal forms and confirmations

## 🔧 Development Notes

- TypeScript types are defined for all API responses
- Error handling is implemented throughout the application
- Loading states are shown during API calls
- Form validation uses Zod schemas
- Responsive design with mobile-first approach

## 📱 Pages Structure

```
/                    - Home page with blood requests
/auth/login          - Login page
/auth/signup         - Registration page
/auth/forgot-password - Password reset page
/user                - User dashboard
/hospital            - Hospital dashboard
/admin               - Admin panel
```

## 🔒 Security Features

- JWT token-based authentication
- Automatic token refresh handling
- Protected routes based on user roles
- Form validation and sanitization
- Error boundary implementation

---

**Note**: Make sure your backend API is running on `http://localhost:5000` and implements the expected endpoints for full functionality.
