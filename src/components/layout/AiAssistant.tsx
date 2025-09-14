'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Bot } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import apiService from '@/lib/api';
import { useRouter } from 'next/navigation';


const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);  
    const [bloodRequestModal, setBloodRequestModal] = useState(false);
    const [textareaData, setTextareaData] = useState('');
     const { user, loading } = useAuth();
     const router = useRouter();
    const handleCreateBloodRequest = async () => {
        // Get textarea data
        console.log('Create Blood Request clicked');
        console.log('Textarea data:', textareaData);
        
        if (!textareaData.trim()) {
            alert('Please enter blood request details in the textarea');
            return;
        }
        
        // Process the textarea data here
        console.log('Processing blood request with data:', textareaData);
        
        if(!user) {
            toast.error('You must be logged in to create a blood request.');
            return;
        }

        const data = {
            message: textareaData,
            requestedBy: user.id
        }
        const aiBloodRequest = await apiService.createBloodRequestWithAI(data)
        if(aiBloodRequest?.data?.success){
            toast.success('Blood request created successfully!');
            router.push('/blood-requests');
        }

        // You can add navigation logic here
        // window.location.href = '/blood-requests';
        setIsOpen(false);
        setBloodRequestModal(true);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <motion.button
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-lg font-semibold transition-all duration-200 fixed top-1/2 right-5 z-50"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                >
                    <Bot className="h-4 w-4" />
                    <span>AI Assistant</span>
                </motion.button>
            </DialogTrigger>

            <AnimatePresence>
                {isOpen && (
                    <DialogContent className="max-w-md border-2 border-blue-300 bg-white/95 shadow-2xl p-0">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                            className="text-black overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 py-6 px-6">
                                <Bot className="w-8 h-8 text-white animate-pulse" />
                                <h2 className="text-2xl font-bold text-white tracking-tight">Create blood request with AI</h2>
                            </div>

                            <div className="px-6 py-6">
                                <p className="text-gray-600 text-center mb-6">Must mention blood group with quantity, location and date</p>

                                <div className="space-y-4">
                                   <textarea 
                                       rows={4} 
                                       placeholder='Type texts with blood group, quantity, location and date' 
                                       className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                       value={textareaData}
                                       onChange={(e) => setTextareaData(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-center mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                        className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full px-6"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        className="ml-4 bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6"
                                        onClick={handleCreateBloodRequest}
                                    >Create Blood Request</Button>
                                </div>
                            </div>
                        </motion.div>
                    </DialogContent>
                )}
                {
                    bloodRequestModal && (
                       <DialogContent className="max-w-md border-2 border-blue-300 bg-white/95 shadow-2xl p-0">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                            className=" overflow-hidden"
                        >
                           hello
                        </motion.div>
                    </DialogContent>
                    )
                }
            </AnimatePresence>
        </Dialog>
    );
};

export default AiAssistant;