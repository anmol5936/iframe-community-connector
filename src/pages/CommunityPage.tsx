
import React, { useEffect, useState } from 'react';
import IFrameConnector from '@/components/IFrameConnector';
import { toast } from 'sonner';

const CommunityPage = () => {
  const [isActive, setIsActive] = useState(true);
  
  // Handle messages from the iframe
  const handleMessage = (data: any) => {
    console.log('Message received from iframe:', data);
    
    // If this is a notification message with unread status
    if (data.type === 'community-notification' && data.unread === 'true') {
      // Dispatch a custom event that our Index component listens for
      window.dispatchEvent(
        new CustomEvent('app:notification', { 
          detail: { hasUnread: true }
        })
      );
      
      // Refresh the iframe content
      const iframe = document.getElementById('fragment-41812_iframe') as HTMLIFrameElement;
      if (iframe && (iframe as any).sendMessage) {
        (iframe as any).sendMessage('type=community-update');
      }
    }
  };
  
  // Listen for app refresh events
  useEffect(() => {
    const handleRefresh = () => {
      const iframe = document.getElementById('fragment-41812_iframe') as HTMLIFrameElement;
      if (iframe && (iframe as any).sendMessage) {
        (iframe as any).sendMessage('type=community-update');
        console.log('Refreshing community iframe');
      }
    };
    
    window.addEventListener('app:refresh', handleRefresh);
    
    return () => {
      window.removeEventListener('app:refresh', handleRefresh);
    };
  }, []);
  
  // Set active state when this component mounts/unmounts
  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, []);
  
  return (
    <div className="h-[calc(100vh-10rem)]">
      <IFrameConnector
        iframeId="fragment-41812_iframe"
        src="https://example.com/community-iframe"
        title="Community"
        onMessage={handleMessage}
        active={isActive}
        onLoad={() => toast.success('Community loaded')}
        className="h-full rounded-xl shadow-apple"
      />
    </div>
  );
};

export default CommunityPage;
