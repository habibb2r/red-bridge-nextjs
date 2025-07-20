'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Loader2 } from 'lucide-react';
import { BloodGroup, Urgency } from '@/types';
import apiService from '@/lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
        // Map urgency to lowercase for API
        const urgencyMap: Record<Urgency, 'low' | 'medium' | 'high' | 'critical'> = {
          'Low': 'low',
          'Medium': 'medium', 
          'High': 'high',
          'Critical': 'critical'
        };

        const requestData = {
          title: formData.title,
          description: formData.description,
          bloodGroup: formData.bloodGroup,
          quantity: formData.quantity,
          urgency: urgencyMap[formData.urgency as Urgency],
          dateNeeded: formData.dateNeeded,
          location: formData.location,
          contactInfo: formData.contactInfo,
          status: 'active' as const,
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2 bg-white text-red-600 hover:bg-red-50 border-2 border-white hover:border-red-100 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="h-4 w-4" />
          <span>Create Blood Request</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Create New Blood Request</DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill out the form below to request blood. Your request will be visible to potential donors.
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Urgent Blood Needed for Surgery"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group *</Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                <SelectTrigger>
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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
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
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information *</Label>
              <Input
                id="contactInfo"
                placeholder="Phone number or email"
                value={formData.contactInfo}
                onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                required
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
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600 shadow-lg" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Creating Request...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BloodRequestForm;
