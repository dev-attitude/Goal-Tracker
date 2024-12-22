'use client';

import Link from "next/link";
import {
  ChartBarIcon,
  FlagIcon,
  BookOpenIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Goals', href: '/goals', icon: FlagIcon },
  { name: 'Trading Journal', href: '/journal', icon: BookOpenIcon },
  { name: 'Analysis', href: '/analysis', icon: ChartPieIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const publicPaths = ['/', '/about', '/contact', '/pricing'];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isPublicPath = publicPaths.includes(pathname);

  // If it's a public path or user is not authenticated, show only navbar
  if (isPublicPath || !isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-16">
          {children}
        </div>
        {isPublicPath && <Footer />}
      </>
    );
  }

  // For authenticated routes, show both navbar and sidebar
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100 pt-16">
        {/* Sidebar */}
        <aside 
          className="group fixed inset-y-16 z-40 flex w-72 flex-col transition-all duration-300 hover:w-72 data-[collapsed=true]:w-[60px] bg-white border-r border-gray-200"
          data-collapsed={isCollapsed}
        >
          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-50 group-data-[collapsed=true]:justify-center ${
                  pathname === item.href ? 'bg-[#3e7be8]/5 text-[#3e7be8]' : ''
                }`}
              >
                <item.icon className={`h-5 w-5 shrink-0 ${
                  pathname === item.href ? 'text-[#3e7be8]' : 'text-gray-500'
                }`} />
                <span className="text-sm font-medium transition-all duration-300 group-data-[collapsed=true]:hidden">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          >
            <Bars3Icon className="h-4 w-4" />
          </button>
        </aside>

        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'pl-[60px]' : 'pl-72'}`}>
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 