
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell, Check, Clock, MessageCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

// Simulated notification data
const notifications = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Upcoming team meeting at 2:00 PM',
    time: '1 hour ago',
    type: 'reminder',
    read: false
  },
  {
    id: 2,
    title: 'New Message',
    description: 'You have a new message from Alex',
    time: '3 hours ago',
    type: 'message',
    read: false
  },
  {
    id: 3,
    title: 'Project Update',
    description: 'Your project "Website Redesign" has been updated',
    time: '1 day ago',
    type: 'update',
    read: true
  },
  {
    id: 4,
    title: 'New Community Post',
    description: 'Sarah shared a new post in the Design community',
    time: '2 days ago',
    type: 'community',
    read: true
  }
];

// Icon mapping for notification types
const getIcon = (type: string) => {
  switch (type) {
    case 'reminder':
      return <Clock className="h-5 w-5 text-amber-500" />;
    case 'message':
      return <MessageCircle className="h-5 w-5 text-blue-500" />;
    case 'update':
      return <Bell className="h-5 w-5 text-green-500" />;
    case 'community':
      return <Users className="h-5 w-5 text-purple-500" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

const NotificationsPage = () => {
  // Mark notifications as read when page is viewed
  useEffect(() => {
    // Dispatch event to clear notification badge
    window.dispatchEvent(
      new CustomEvent('app:notification', { 
        detail: { hasUnread: false }
      })
    );
  }, []);
  
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-8">
        <motion.h2 
          className="text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Notifications
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </motion.div>
      </header>
      
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`overflow-hidden transition-all duration-300 hover:shadow-apple ${notification.read ? 'bg-card/50' : 'bg-card border-l-4 border-l-primary'}`}>
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="mt-1 rounded-full p-2 bg-muted">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <CardDescription className="mt-1.5 text-base">
                    {notification.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <div className="flex items-center gap-2 ml-auto">
                  {!notification.read && (
                    <Button size="sm" variant="ghost">
                      <Check className="mr-1 h-4 w-4" />
                      Mark as read
                    </Button>
                  )}
                  <Button size="sm">View details</Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
