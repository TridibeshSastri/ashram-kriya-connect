
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminEventManager from '../components/admin/AdminEventManager';
import AdminUserManager from '../components/admin/AdminUserManager';
import AdminResourceManager from '../components/admin/AdminResourceManager';
import AdminDevoteeManager from '../components/admin/AdminDevoteeManager';
import AdminCourseManager from '../components/admin/AdminCourseManager';
import AdminDonationManager from '../components/admin/AdminDonationManager';
import AdminUserRolesManager from '../components/admin/AdminUserRolesManager';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    navigate('/unauthorized');
    return null;
  }
  
  return (
    <main>
      {/* Page Header */}
      <PageHeader 
        title="Admin Dashboard"
        description="Manage events, user bookings, resources, devotee accounts, courses, and donations for the ashram website."
      />
      
      {/* Admin Dashboard */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <Tabs 
            defaultValue="events" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-8 overflow-x-auto">
              <TabsList className="grid w-full grid-cols-7 lg:w-[1000px]">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="users">User Bookings</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="devotees">Devotees</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="roles">User Roles</TabsTrigger>
              </TabsList>
              
              {activeTab === "courses" && (
                <Button 
                  className="bg-saffron hover:bg-saffron/90 ml-4 whitespace-nowrap"
                  onClick={() => navigate('/course-creation')}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
              )}
            </div>
            
            <TabsContent value="events" className="pt-4">
              <AdminEventManager />
            </TabsContent>
            
            <TabsContent value="users" className="pt-4">
              <AdminUserManager />
            </TabsContent>
            
            <TabsContent value="resources" className="pt-4">
              <AdminResourceManager />
            </TabsContent>

            <TabsContent value="courses" className="pt-4">
              <AdminCourseManager />
            </TabsContent>
            
            <TabsContent value="devotees" className="pt-4">
              <AdminDevoteeManager />
            </TabsContent>
            
            <TabsContent value="donations" className="pt-4">
              <AdminDonationManager />
            </TabsContent>
            
            <TabsContent value="roles" className="pt-4">
              <AdminUserRolesManager />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Admin;
