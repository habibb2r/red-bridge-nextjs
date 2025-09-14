'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent,  DialogTrigger } from '@/components/ui/dialog';
import { Plus, Heart } from 'lucide-react';
import { BloodGroup, Urgency } from '@/types';
import apiService from '@/lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface BloodRequestFormData {
  title: string;
  description: string;
  bloodGroup: BloodGroup | '';
  quantity: number;
  urgency: Urgency | '';
  dateNeeded: string;
  contactInfo: string;
  location: string;
}

const BloodRequestForm = ({ onSubmit }: { onSubmit?: (data: BloodRequestFormData) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: userLoading } = useAuth();
  const [formData, setFormData] = useState<BloodRequestFormData>({
    title: '',
    description: '',
    bloodGroup: '',
    quantity: 1,
    urgency: '',
    dateNeeded: '',
    contactInfo: '',
    location: '',
  });

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels: Urgency[] = ['Low', 'Medium', 'High', 'Critical'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.description &&
      formData.bloodGroup &&
      formData.urgency &&
      formData.dateNeeded &&
      formData.contactInfo &&
      formData.location
    ) {
      setLoading(true);
      setError(null);
      
      try {
        // Map urgency to lowercase for API; map Critical to 'high' since API supports low/medium/high
        const urgencyMap: Record<Urgency, 'low' | 'medium' | 'high'> = {
          'Low': 'low',
          'Medium': 'medium',
          'High': 'high',
          'Critical': 'high'
        };

        const requestData = {
          title: formData.title,
          description: formData.description,
          bloodGroup: formData.bloodGroup,
          quantity: formData.quantity,
          urgency: urgencyMap[formData.urgency as Urgency],
          dateNeeded: formData.dateNeeded,
          // API expects `address` — use the form location as address
          address: formData.location,
          contactInfo: formData.contactInfo,
          // API status uses 'open'|'fulfilled'|'rejected'
          status: 'open' as const,
        };

        const response = await apiService.createBloodRequest(requestData);
        
        if (response.success) {
          // Call optional callback
          onSubmit?.(formData as BloodRequestFormData & { bloodGroup: BloodGroup; urgency: Urgency });
          
          // Reset form
          setFormData({
            title: '',
            description: '',
            bloodGroup: '',
            quantity: 1,
            urgency: '',
            dateNeeded: '',
            contactInfo: '',
            location: '',
          });
          setIsOpen(false);
        } else {
          setError(response.error || 'Failed to create blood request');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field: keyof BloodRequestFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateRequestClick = () => {
    if (!user && !userLoading) {
      toast.error('Please sign in to create a blood request', {
        description: 'You need to be logged in to submit blood requests.',
        action: {
          label: 'Sign In',
          onClick: () => {
            // You can add navigation to login page here
            window.location.href = '/auth/login';
          },
        },
      });
      return;
    }
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.button
          onClick={handleCreateRequestClick}
          className="flex items-center space-x-2 bg-white text-red-600 hover:bg-red-50 transition-all duration-200 px-4 py-2 rounded-full shadow-lg font-bold "
          whileHover={{ scale: 1.08, boxShadow: "0 0 0 2px #ef4444" }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        >
          <Plus className="h-4 w-4" />
          <span>Create Blood Request</span>
        </motion.button>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && user && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-red-300 bg-white/95 shadow-2xl  p-0">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="text-black overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center gap-3 justify-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 py-6 px-6">
                <Heart className="w-8 h-8 text-white animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Create New Blood Request</h2>
              </div>
              <div className="px-6 pt-6 pb-2">
                <p className="text-gray-600 text-center mb-4">Fill out the form below to request blood. Your request will be visible to potential donors.</p>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Request Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Urgent Blood Needed for Surgery"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                        className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group *</Label>
                      <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                        <SelectTrigger className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about your blood request..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      required
                      className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (units) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                        required
                        className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level *</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateNeeded">Date Needed *</Label>
                      <Input
                        id="dateNeeded"
                        type="date"
                        value={formData.dateNeeded}
                        onChange={(e) => handleInputChange('dateNeeded', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information *</Label>
                      <Input
                        id="contactInfo"
                        placeholder="Phone number or email"
                        value={formData.contactInfo}
                        onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                        required
                        className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="Hospital/City name"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                        className="bg-white border border-red-200 focus:border-red-400 focus:ring-red-200/50 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-6">
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={loading} className="border border-red-200 text-red-500 hover:bg-red-50 rounded-full px-6 py-2 font-semibold">
                      Cancel
                    </Button>
                    <motion.button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-red-500 text-white font-bold text-lg shadow-lg hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
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
                        <Heart className="w-4 h-4 text-white" />
                      </motion.span>
                      {loading ? 'Creating Request...' : 'Submit Request'}
                    </motion.button>
                  </div>
                </motion.form>
              </div>
            </motion.div>
          </DialogContent>
        )}
        {
          isOpen && !user && !userLoading && (
            <DialogContent className="max-w-md border-2 border-red-300 bg-white/95 shadow-2xl rounded-3xl p-6">
              <h2 className="text-xl font-bold text-center mb-4">Please Sign In</h2>
              <p className="text-gray-600 text-center mb-6">You need to be logged in to create blood requests.</p>
              <div className="flex justify-center">
                <Button 
                  onClick={() => window.location.href = '/auth/login'}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                >
                  Sign In
                </Button>
              </div>
            </DialogContent>
          )
        }
      </AnimatePresence>
    </Dialog>
  );
};

export default BloodRequestForm;
