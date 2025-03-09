
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.header 
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.28, 0.84, 0.42, 1] }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            className="h-8 w-8 rounded-md bg-primary flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary-foreground font-bold">C</span>
          </motion.div>
          <h1 className="text-lg font-medium">{title}</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
