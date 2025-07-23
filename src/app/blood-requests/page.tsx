"use client";

import { useEffect, useState } from "react";
import apiService from "@/lib/api";
import BloodRequestCard from "@/components/blood-request/BloodRequestCard";
import { BloodRequest } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, X, Users, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const URGENCY_LEVELS = ["low", "medium", "high"];
const STATUS_OPTIONS = ["open", "fulfilled", "rejected"];
const SORT_OPTIONS = [
  { value: "dateNeeded", label: "Date Needed" },
  { value: "urgency", label: "Urgency" },
];

const Page = () => {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    bloodGroup: "",
    urgency: "",
    status: "",
    search: "",
  });
  const [sort, setSort] = useState("dateNeeded");

  const handleClear = () => {
    setFilters({ bloodGroup: "", urgency: "", status: "", search: "" });
    setSort("dateNeeded");
  };

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getBloodRequests();
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

  // Filtering and sorting
  const filtered = bloodRequests
    .filter((req) =>
      filters.bloodGroup ? req.bloodGroup === filters.bloodGroup : true
    )
    .filter((req) =>
      filters.urgency ? req.urgency === filters.urgency : true
    )
    .filter((req) =>
      filters.status ? req.status === filters.status : true
    )
    .filter((req) =>
      filters.search
        ? req.title.toLowerCase().includes(filters.search.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sort === "dateNeeded") {
        return new Date(a.dateNeeded).getTime() - new Date(b.dateNeeded).getTime();
      }
      if (sort === "urgency") {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.urgency] - order[b.urgency];
      }
      return 0;
    });

  // Stats
  const total = bloodRequests.length;
  const open = bloodRequests.filter(r => r.status === "open").length;
  const fulfilled = bloodRequests.filter(r => r.status === "fulfilled").length;
  const closed = bloodRequests.filter(r => r.status === "rejected").length;

  // Recent activity (last 5 by dateNeeded desc)
  const recent = [...bloodRequests]
    .sort((a, b) => new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-6 text-center">All Blood Requests</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-4">
            <Users className="w-7 h-7 text-blue-500 mb-1" />
            <span className="text-2xl font-bold text-gray-800">{total}</span>
            <span className="text-gray-500 text-sm">Total Requests</span>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-4">
            <AlertCircle className="w-7 h-7 text-red-500 mb-1" />
            <span className="text-2xl font-bold text-gray-800">{open}</span>
            <span className="text-gray-500 text-sm">Open</span>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-4">
            <CheckCircle className="w-7 h-7 text-emerald-500 mb-1" />
            <span className="text-2xl font-bold text-gray-800">{fulfilled}</span>
            <span className="text-gray-500 text-sm">Fulfilled</span>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-4">
            <Heart className="w-7 h-7 text-pink-500 mb-1" />
            <span className="text-2xl font-bold text-gray-800">{closed}</span>
            <span className="text-gray-500 text-sm">Closed</span>
          </div>
        </div>

        {/* Sticky Filters & Sorting */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end gap-4 mb-8 bg-white/80 rounded-xl shadow p-4 sticky top-2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-black">
            <Select value={filters.bloodGroup} onValueChange={v => setFilters(f => ({ ...f, bloodGroup: v }))}>
              <SelectTrigger className="bg-white border border-red-200 rounded-lg">
                <SelectValue placeholder="Blood Group" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_GROUPS.map(bg => (
                  <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.urgency} onValueChange={v => setFilters(f => ({ ...f, urgency: v }))}>
              <SelectTrigger className="bg-white border border-red-200 rounded-lg">
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                {URGENCY_LEVELS.map(u => (
                  <SelectItem key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={v => setFilters(f => ({ ...f, status: v }))}>
              <SelectTrigger className="bg-white border border-red-200 rounded-lg">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(s => (
                  <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Search by title or location..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              className="bg-white border border-red-200 rounded-lg"
            />
          </div>
          <div className="flex md:flex-row justify-between gap-2 items-end mt-2 md:mt-0 ">
            <div className="flex flex-col gap-2">
              <span className="text-black font-medium">Sort by:</span>
              <Select value={sort} onValueChange={v => setSort(v)}>
                <SelectTrigger className="bg-white border text-black border-red-200 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-100 transition-all duration-150 ml-0 md:ml-2 mt-2 md:mt-6 text-sm font-semibold"
              title="Clear filters & sorting"
              type="button"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        </motion.div>

        {/* Loading/Error State */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            <span className="ml-2 text-lg">Loading blood requests...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8 text-center">
            <p className="font-medium">Error loading blood requests:</p>
            <p>{error}</p>
          </div>
        ) : (
          <div>
            {/* Recent Activity Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-3 flex items-center gap-2"><Heart className="w-5 h-5 text-red-500" /> Recent Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {recent.length > 0 ? recent.map(req => (
                  <motion.div
                    key={req._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="h-full"
                  >
                    <BloodRequestCard request={req} />
                  </motion.div>
                )) : <span className="text-gray-400">No recent activity.</span>}
              </div>
            </div>

            {/* How to Respond Section */}
            <div className="mb-8 bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> How to Respond</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Review the request details and urgency before contacting.</li>
                <li>Contact the requester only if you are eligible and available to donate.</li>
                <li>Bring a valid ID and any required documents to the donation site.</li>
                <li>Follow up with the requester or hospital after your donation.</li>
                <li>Share the request with friends and family to help spread the word.</li>
              </ul>
            </div>

            {/* Animated Blood Requests Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              <AnimatePresence>
                {filtered.length > 0 ? (
                  filtered.map(request => (
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <BloodRequestCard request={request} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <span className="text-2xl text-gray-400 font-semibold">No blood requests found.</span>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;