
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import HomePage from '@/pages/HomePage';
import NotificationsPage from '@/pages/NotificationsPage';
import MessagesPage from '@/pages/MessagesPage';
import CommunityPage from '@/pages/CommunityPage';

const Index = () => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/notifications':
        return 'Notifications';
      case '/messages':
        return 'Messages';
      case '/community':
        return 'Community';
      default:
        return 'Dashboard';
    }
  };
  
  const handleRefresh = () => {
    // Create a refresh event that each page can listen to
    window.dispatchEvent(new CustomEvent('app:refresh'));
    toast.success('Refreshing content');
  };
  
  // Example of receiving notifications from any page
  useEffect(() => {
    const handleNotification = (event: CustomEvent) => {
      const { hasUnread } = event.detail;
      setHasNotifications(hasUnread);
      
      // If we're not on the notifications page, show a toast
      if (location.pathname !== '/notifications' && hasUnread) {
        toast('New notification received', {
          action: {
            label: 'View',
            onClick: () => navigate('/notifications')
          },
        });
      }
    };
    
    window.addEventListener('app:notification' as any, handleNotification as EventListener);
    
    return () => {
      window.removeEventListener('app:notification' as any, handleNotification as EventListener);
    };
  }, [location.pathname, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={getPageTitle()} />
      
      <NavigationBar 
        onRefresh={handleRefresh}
        hasNotifications={hasNotifications}
      />
      
      <main className="flex-1 container py-6">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.28, 0.84, 0.42, 1] }}
          className="h-full"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
