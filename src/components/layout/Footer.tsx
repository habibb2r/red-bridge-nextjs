import Link from 'next/link';
import {  Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import logo from '@/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src={logo} alt="Logo" height={60} />
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              Connecting blood donors with those in need. Save lives, one donation at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-800 hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-800 hover:text-red-400 transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-gray-800 hover:text-red-400 transition-colors">How It Works</Link></li>
              <li><Link href="/contact" className="text-gray-800 hover:text-red-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* For Users */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">For Users</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/user" className="text-gray-800 hover:text-red-400 transition-colors">Request Blood</Link></li>
              <li><Link href="/user" className="text-gray-800 hover:text-red-400 transition-colors">Donate Blood</Link></li>
              <li><Link href="/user" className="text-gray-800 hover:text-red-400 transition-colors">My Requests</Link></li>
              <li><Link href="/hospital" className="text-gray-800 hover:text-red-400 transition-colors">Hospital Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-800">
                <Phone className="h-4 w-4 text-red-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-800">
                <Mail className="h-4 w-4 text-red-400" />
                <span>contact@redbridge.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-800">
                <MapPin className="h-4 w-4 text-red-400" />
                <span>123 Health St, Medical City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p className="text-gray-800 font-semibold">&copy; 2025 Red Bridge. All rights reserved. <span className="text-red-400">Saving lives together.</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
