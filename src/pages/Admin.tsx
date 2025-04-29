
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminEventManager from '../components/admin/AdminEventManager';
import AdminUserManager from '../components/admin/AdminUserManager';
import AdminResourceManager from '../components/admin/AdminResourceManager';

const Admin = () => {
  return (
    <main>
      {/* Page Header */}
      <PageHeader 
        title="Admin Dashboard"
        description="Manage events, user bookings, resources, and content for the ashram website."
      />
      
      {/* Admin Dashboard */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-8">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="users">User Bookings</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="pt-4">
              <AdminEventManager />
            </TabsContent>
            
            <TabsContent value="users" className="pt-4">
              <AdminUserManager />
            </TabsContent>
            
            <TabsContent value="resources" className="pt-4">
              <AdminResourceManager />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Admin;
