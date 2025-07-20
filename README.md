# Red Bridge - Blood Donation Platform

Red Bridge is a comprehensive blood donation platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS. It connects blood donors with those in need and provides dedicated portals for users, hospitals, and administrators.

## 🩸 Features

### Home Page
- **Blood Request Creation**: Easy-to-use form for creating blood donation requests
- **Filter & Sort**: Advanced filtering by blood group, urgency, location, and status
- **Request Display**: Beautiful card-based layout showing all active blood requests
- **Real-time Statistics**: Live stats showing active requests, donors, hospitals, and lives saved

### User Portal (`/user`)
- **Personal Dashboard**: View and manage your blood requests
- **Request Management**: Create, edit, and delete blood requests
- **Profile Information**: Manage personal details and donation preferences
- **Statistics**: Track your donation activity and requests

### Hospital Portal (`/hospital`)
- **Blood Inventory Management**: Monitor blood stock levels with visual indicators
- **Nearby Requests**: View local blood requests that can be fulfilled
- **Hospital Profile**: Manage hospital information and contact details
- **Inventory Alerts**: Visual warnings for low and critical blood stock levels

### Admin Portal (`/admin`)
- **User Management**: View and manage registered users
- **Hospital Management**: Oversee partner hospitals and their verification
- **Request Monitoring**: Monitor all blood requests across the platform
- **Analytics Dashboard**: Comprehensive overview with statistics and trends
- **Activity Logs**: Track recent system activities

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **UI Components**: Custom shadcn/ui components
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React useState and useEffect

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin portal page
│   ├── hospital/          # Hospital portal page
│   ├── user/              # User portal page
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with CSS variables
├── components/
│   ├── blood-request/     # Blood request related components
│   │   ├── BloodRequestForm.tsx
│   │   ├── BloodRequestCard.tsx
│   │   └── FilterSort.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                # Reusable UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       └── badge.tsx
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
└── types/
    └── index.ts           # TypeScript type definitions
```

## 🎨 Key Components

### Reusable UI Components
- **Button**: Customizable button with variants (default, outline, ghost, etc.)
- **Card**: Flexible card component with header, content, and footer
- **Dialog**: Modal dialogs for forms and confirmations
- **Input/Textarea**: Form input components with consistent styling
- **Select**: Dropdown select component with search capability
- **Badge**: Status and category indicators

### Blood Request Components
- **BloodRequestForm**: Comprehensive form for creating blood requests
- **BloodRequestCard**: Display component for blood request information
- **FilterSort**: Advanced filtering and sorting functionality

### Layout Components
- **Header**: Navigation with role-based menu items
- **Footer**: Site information and quick links

## 🔧 Configuration

### CSS Variables
The project uses CSS variables for theming with light/dark mode support:
- Color scheme variables for consistent theming
- Responsive design with mobile-first approach
- Custom font family integration (Geist Sans/Mono)

### TypeScript Types
Comprehensive type definitions for:
- Blood group types (A+, A-, B+, B-, AB+, AB-, O+, O-)
- Urgency levels (Low, Medium, High, Critical)
- User roles (user, admin, hospital)
- Blood request status (open, fulfilled, cancelled)

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Adaptive navigation
- Touch-friendly interactions

## 🎯 Future Enhancements

- **Authentication**: User login/registration system
- **Real-time Notifications**: WebSocket integration for live updates
- **Geolocation**: GPS-based location services for nearby requests
- **Payment Integration**: Donation and support features
- **API Integration**: Backend API for data persistence
- **Push Notifications**: Mobile app notifications
- **Advanced Analytics**: Detailed reporting and insights
- **Multi-language Support**: Internationalization (i18n)

## 🤝 Contributing

This project follows modern React and Next.js best practices:
- Component-based architecture
- TypeScript for type safety
- Reusable component library
- Consistent code formatting
- Responsive design principles

## 📄 License

This project is designed as a demonstration of modern web development practices for blood donation platforms.

---

Built with ❤️ for saving lives through technology.
