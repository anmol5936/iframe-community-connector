
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface IFrameConnectorProps {
  iframeId: string;
  src: string;
  title?: string;
  className?: string;
  onMessage?: (data: any) => void;
  onLoad?: () => void;
  active?: boolean;
}

const IFrameConnector: React.FC<IFrameConnectorProps> = ({
  iframeId,
  src,
  title = 'External Content',
  className = '',
  onMessage,
  onLoad,
  active = true
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle iframe load event
  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  // Set up message listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the message is from our iframe
      if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
        if (onMessage) {
          try {
            // Try to parse the data if it's a string
            let parsedData;
            if (typeof event.data === 'string') {
              // Handle both JSON strings and query-string formatted data
              if (event.data.startsWith('{') || event.data.startsWith('[')) {
                parsedData = JSON.parse(event.data);
              } else {
                // Parse query string-like format (e.g., "type=community-notification&unread=true")
                parsedData = Object.fromEntries(
                  event.data.split('&').map(param => {
                    const [key, value] = param.split('=');
                    return [key, decodeURIComponent(value || '')];
                  })
                );
              }
              onMessage(parsedData);
            } else {
              // Already an object
              onMessage(event.data);
            }
          } catch (error) {
            console.error('Error parsing message data:', error);
            onMessage(event.data); // Pass the raw data if parsing fails
          }
        }
      }
    };

    // Add event listener
    window.addEventListener('message', handleMessage);

    // Clean up
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onMessage]);

  // Method to send a message to the iframe
  const sendMessage = (message: string | object) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const messageToSend = typeof message === 'string' ? message : JSON.stringify(message);
        iframeRef.current.contentWindow.postMessage(messageToSend, '*');
      } catch (error) {
        console.error('Error sending message to iframe:', error);
        toast.error('Failed to communicate with content');
      }
    }
  };

  // Expose sendMessage method
  useEffect(() => {
    if (iframeRef.current) {
      (iframeRef.current as any).sendMessage = sendMessage;
    }
  }, [iframeRef.current]);

  // Trigger updates when active state changes
  useEffect(() => {
    if (active && iframeRef.current) {
      sendMessage('type=community-update');
    }
  }, [active]);

  return (
    <div className={`iframe-container animate-fade-in ${className}`}>
      {isLoading && (
        <div className="iframe-loading animate-fade-in">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        id={iframeId}
        src={src}
        title={title}
        className={`w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default IFrameConnector;
