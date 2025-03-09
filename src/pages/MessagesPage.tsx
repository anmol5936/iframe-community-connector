
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send } from 'lucide-react';
import { motion } from 'framer-motion';

// Simulated conversation data
const conversations = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: 'AJ',
    lastMessage: 'Sure, let me check the documents.',
    time: '10:30 AM',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Sarah Williams',
    avatar: 'SW',
    lastMessage: 'When is the meeting scheduled?',
    time: 'Yesterday',
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: 'Michael Brown',
    avatar: 'MB',
    lastMessage: 'Thanks for the update!',
    time: 'Yesterday',
    unread: 0,
    online: true
  },
  {
    id: 4,
    name: 'Product Team',
    avatar: 'PT',
    lastMessage: 'New designs are ready for review',
    time: '2 days ago',
    unread: 0,
    online: false,
    isGroup: true
  }
];

// Simulated messages for the current conversation
const messages = [
  {
    id: 1,
    content: 'Hi there! How are you?',
    time: '10:00 AM',
    sender: 'them',
    senderName: 'Alex Johnson'
  },
  {
    id: 2,
    content: 'I\'m doing well, thanks for asking! How about you?',
    time: '10:05 AM',
    sender: 'me'
  },
  {
    id: 3,
    content: 'Pretty good. I wanted to ask about the project status.',
    time: '10:15 AM',
    sender: 'them',
    senderName: 'Alex Johnson'
  },
  {
    id: 4,
    content: 'Sure, we\'re making good progress. The design phase is almost complete, and we\'ll be moving to development next week.',
    time: '10:20 AM',
    sender: 'me'
  },
  {
    id: 5,
    content: 'That sounds great! Do you have any updated documents?',
    time: '10:25 AM',
    sender: 'them',
    senderName: 'Alex Johnson'
  },
  {
    id: 6,
    content: 'I\'ll share them with you this afternoon.',
    time: '10:30 AM',
    sender: 'me'
  }
];

const MessagesPage = () => {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <Card className="h-full overflow-hidden border shadow-apple-sm">
        <div className="grid h-full" style={{ gridTemplateColumns: '280px 1fr' }}>
          {/* Conversations sidebar */}
          <div className="border-r">
            <CardHeader className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100%-56px)]">
              <div className="px-2 py-2 space-y-1">
                {conversations.map((conversation, index) => (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-auto py-3 rounded-lg ${conversation.id === 1 ? 'bg-muted' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage alt={conversation.name} />
                            <AvatarFallback className="text-xs">
                              {conversation.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center">
                            <p className="text-sm font-medium">{conversation.name}</p>
                            <p className="ml-auto text-xs text-muted-foreground">
                              {conversation.time}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unread > 0 && (
                          <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat area */}
          <div className="flex flex-col h-full">
            <CardHeader className="border-b py-3 px-6">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage alt="Alex Johnson" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Alex Johnson</CardTitle>
                  <CardDescription className="text-xs">Online</CardDescription>
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-end gap-2 max-w-[80%]">
                      {message.sender === 'them' && (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">AJ</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div 
                          className={`rounded-2xl px-4 py-2 text-sm ${
                            message.sender === 'me' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          {message.content}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{message.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessagesPage;
