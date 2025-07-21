"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BloodRequestForm from "@/components/blood-request/BloodRequestForm";
import BloodRequestCard from "@/components/blood-request/BloodRequestCard";
import { BloodRequest } from "@/lib/api";
import { Heart, Users, Building2, Activity, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import apiService from "@/lib/api";
import { Toaster } from "sonner";
import BloodGroupCompatibility from "@/components/home-components/BloodGroupCompatibility";
import WhyDonateBlood from "@/components/home-components/WhyDonateBlood";
import DonorStories from "@/components/home-components/DonorStories";
import FAQ from "@/components/home-components/FAQ";
import { GiHeartBeats } from "react-icons/gi";

export default function Home() {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blood requests from API
  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getBloodRequests();
        console.log("responsse", response);
        if (response.success && response.data) {
          setBloodRequests(response.data);
        } else {
          setError(response.error || "Failed to fetch blood requests");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequests();
  }, []);

  const handleContactRequester = (request: BloodRequest) => {
    alert(
      `Contact info: ${request.requestedBy.email}\nRequester: ${request.requestedBy.name}`
    );
  };

  const handleNewRequest = () => {
    // Refresh the blood requests after a new one is created
    window.location.reload(); // Simple refresh for now
  };

  const stats = [
    {
      title: "Active Requests",
      value: bloodRequests.filter((request) => request.status === "open")
        .length,
      icon: Activity,
      color: "text-red-500",
    },
    {
      title: "Total Donors",
      value: "1,234",
      icon: Users,
      color: "text-emerald-500",
    },
    {
      title: "Hospitals",
      value: "45",
      icon: Building2,
      color: "text-blue-500",
    },
    {
      title: "Lives Saved",
      value: "892",
      icon: Heart,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <Toaster position="top-center" duration={5000} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-24 overflow-hidden">
        {/* Animated floating blood drops background with framer-motion */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-red-400/30"
              style={{
                left: `${10 + i * 10}%`,
                top: `${10 + (i % 2 === 0 ? 0 : 10)}%`,
                width: `${18 + (i % 3) * 8}px`,
                height: `${24 + (i % 4) * 8}px`,
                filter: "blur(1.5px)",
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center gap-3 relative z-10">
          {/* Animated Heart/Blood Drop Icon */}
          <motion.span
            className="inline-flex items-center justify-center pb-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 10,
              delay: 0.2,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 0.95, 1.1, 1],
                filter: [
                  "drop-shadow(0 0 0 #ef4444)",
                  "drop-shadow(0 0 8px #ef4444)",
                  "drop-shadow(0 0 0 #ef4444)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <GiHeartBeats 
                size={60}
                color="#c79191"
                style={{ stroke: "#fff", strokeWidth: 2 }}
              />
            </motion.div>
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: 0.4,
            }}
          >
            Save Lives, Donate Blood
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-4 opacity-95 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 14,
              delay: 0.6,
            }}
          >
            Every drop counts. Your donation can be the difference between life
            and death for someone in need.
          </motion.p>
          <motion.p
            className="text-base md:text-lg mb-8 text-red-100/90 max-w-xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 16,
              delay: 0.8,
            }}
          >
            Join our community of heroes and help us bridge the gap between
            donors and those in urgent need of blood.
          </motion.p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-full min-w-max">
              <motion.button
                onClick={() => {
                  const form = document.querySelector("#blood-request-form");
                  if (form) form.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-red-600 font-bold text-lg shadow-lg hover:bg-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 10,
                  delay: 1.1,
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 0.95, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-6 h-6 text-red-500" />
                </motion.span>
                Become a Donor
              </motion.button>
            </div>
            {/* The form anchor for smooth scroll */}
              <BloodRequestForm onSubmit={handleNewRequest} />
        
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:scale-105 transition-transform duration-200 border-gray-100"
                >
                  <CardHeader className="pb-2">
                    <Icon className={`h-10 w-10 mx-auto ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl md:text-3xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <p className="text-gray-600 font-medium">{stat.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Urgent Blood Requests Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Current Urgent Blood Requests
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help save lives by responding to these urgent blood requests
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              <span className="ml-2 text-lg">Loading blood requests...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
              <p className="font-medium">Error loading blood requests:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Blood Requests Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bloodRequests.filter((request) => request.urgency === "high")
                .length > 0 ? (
                bloodRequests
                  .filter((request) => request.urgency === "high")
                  .map((request) => (
                    <BloodRequestCard
                      key={request._id}
                      request={request}
                      onContact={handleContactRequester}
                    />
                  ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No blood requests found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or check back later for new
                    requests.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <BloodGroupCompatibility />
      <WhyDonateBlood />
      <DonorStories />
      <FAQ />
    </div>
  );
}
