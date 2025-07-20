'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, User, Building2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Heart },
    { href: '/user', label: 'User Portal', icon: User },
    { href: '/hospital', label: 'Hospital Portal', icon: Building2 },
    { href: '/admin', label: 'Admin Panel', icon: Shield },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Heart className="h-8 w-8 text-red-500 group-hover:text-red-600 transition-colors" />
            <span className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">Red Bridge</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-red-500 hover:bg-red-50">
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
