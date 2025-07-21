'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, User, Building2, Shield, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import logo from '@/images/logo.png'
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter nav items based on user role
  const getNavItems = () => {
    const baseItems = [
      { href: '/', label: 'Home', icon: Heart },
    ];

    if (!user) {
      return baseItems;
    }

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { href: '/admin', label: 'Admin Panel', icon: Shield },
        { href: '/user', label: 'User Portal', icon: User },
        { href: '/hospital', label: 'Hospital Portal', icon: Building2 },
      ];
    }

    if (user.role === 'hospital') {
      return [
        ...baseItems,
        { href: '/hospital', label: 'Hospital Portal', icon: Building2 },
      ];
    }

    // user role
    return [
      ...baseItems,
      { href: '/user', label: 'User Portal', icon: User },
    ];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image src={logo} alt="Red Bridge Logo"  height={80} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center space-x-2 transition-all duration-200",
                      isActive 
                        ? "bg-red-500 hover:bg-red-600 text-white shadow-md" 
                        : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600 hidden lg:block">
                  Hello, {user.name}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-600 hover:text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-red-500 hover:bg-red-50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-600 hover:text-red-500 hover:bg-red-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start space-x-2",
                        isActive 
                          ? "bg-red-500 hover:bg-red-600 text-white" 
                          : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Hello, {user.name}
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-red-500 hover:bg-red-50">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-start bg-red-500 hover:bg-red-600 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
