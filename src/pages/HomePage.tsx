
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Welcome to Community Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect, collaborate, and stay informed in one elegant space
          </p>
        </motion.div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-apple-sm transition-transform duration-300 ease-apple hover:translate-y-[-5px]">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with important alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View notifications from your team, projects, and system alerts. Never miss an important update.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-apple-sm transition-transform duration-300 ease-apple hover:translate-y-[-5px]">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communication made simple</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Direct and group messaging with your team. Share ideas, files, and collaborate in real-time.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-apple-sm transition-transform duration-300 ease-apple hover:translate-y-[-5px]">
            <CardHeader>
              <CardTitle>Activity Stream</CardTitle>
              <CardDescription>Your personalized feed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                See what's happening across your organization with a personalized activity stream.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="shadow-apple-sm transition-transform duration-300 ease-apple hover:translate-y-[-5px]">
            <CardHeader>
              <CardTitle>Community</CardTitle>
              <CardDescription>Connect with your network</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join discussions, share knowledge, and build relationships across your organization.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
