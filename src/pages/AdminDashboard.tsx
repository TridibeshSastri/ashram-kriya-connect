
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  Calendar,
  ShoppingBag,
  FileText,
  Mail,
  Settings,
  PlusIcon,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for admin dashboard
const mockStats = [
  { id: 1, title: 'Total Users', value: '1,247', icon: Users, color: 'bg-blue-100 text-blue-700' },
  { id: 2, title: 'Active Courses', value: '18', icon: BookOpen, color: 'bg-green-100 text-green-700' },
  { id: 3, title: 'Monthly Donations', value: '₹84,523', icon: ShoppingBag, color: 'bg-yellow-100 text-yellow-700' },
  { id: 4, title: 'Upcoming Events', value: '7', icon: Calendar, color: 'bg-purple-100 text-purple-700' },
];

const mockRecentActivity = [
  { id: 1, action: 'New devotee registered', user: 'Anjali Singh', time: '12 minutes ago' },
  { id: 2, action: 'Course completed', user: 'Rahul Patel', course: 'Introduction to Kriyayoga', time: '43 minutes ago' },
  { id: 3, action: 'New donation received', amount: '₹5,100', user: 'Vikram Desai', time: '2 hours ago' },
  { id: 4, action: 'Event booking', event: 'Guru Purnima Celebration', user: 'Multiple users', time: '4 hours ago' },
  { id: 5, action: 'Resource downloaded', resource: 'Meditation Guide.pdf', user: '8 users', time: 'Today' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { userData, signOut, isAdmin } = useAuth();
  
  if (!userData || !isAdmin) {
    return null; // Should be caught by ProtectedRoute
  }
  
  return (
    <main>
      <PageHeader 
        title="Admin Dashboard"
        description="Monitor and manage all aspects of the ASKSMS platform."
      />
      
      <section className="py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <p className="text-muted-foreground">{userData.email}</p>
              <p className="font-medium text-maroon">Administrator</p>
            </div>
            <Button variant="outline" onClick={() => signOut()}>Log Out</Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {mockStats.map((stat) => (
              <Card key={stat.id}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-8 overflow-x-auto">
              <TabsList className="grid grid-cols-7 lg:w-[1000px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="devotees">Devotees</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
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
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <LayoutDashboard className="h-5 w-5 text-saffron" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {mockRecentActivity.map((activity) => (
                        <div key={activity.id} className="border-b pb-3 last:border-0 last:pb-0">
                          <p className="font-medium">{activity.action}</p>
                          <div className="flex text-sm text-muted-foreground">
                            <p>
                              {activity.user}
                              {activity.course ? ` • ${activity.course}` : ''}
                              {activity.event ? ` • ${activity.event}` : ''}
                              {activity.resource ? ` • ${activity.resource}` : ''}
                              {activity.amount ? ` • ${activity.amount}` : ''}
                            </p>
                            <p className="ml-auto">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">View All Activity</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Mail className="h-5 w-5 text-saffron" />
                        Recent Messages
                      </h3>
                      <div className="space-y-4">
                        <div className="border-b pb-3">
                          <p className="font-medium">Contact Form Submission</p>
                          <p className="text-sm text-muted-foreground">From: suresh.kumar@gmail.com • 1 hour ago</p>
                        </div>
                        <div className="border-b pb-3">
                          <p className="font-medium">Question about Kriyayoga Initiation</p>
                          <p className="text-sm text-muted-foreground">From: priya.m@outlook.com • 3 hours ago</p>
                        </div>
                        <div>
                          <p className="font-medium">Donation Receipt Request</p>
                          <p className="text-sm text-muted-foreground">From: vijay.sharma@example.com • Yesterday</p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">View All Messages</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-saffron" />
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate('/admin')}>
                          <Users className="h-4 w-4" />
                          <span>Manage Users</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Edit Resources</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Add Event</span>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4" />
                          <span>View Donations</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Events Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This section allows you to manage all events. You can create, edit, and delete events.
                  </p>
                  <Button onClick={() => navigate('/admin')}>
                    Go to Events Manager
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Courses Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This section allows you to manage all courses. You can create, edit, and delete courses.
                  </p>
                  <Button onClick={() => navigate('/admin')}>
                    Go to Courses Manager
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="devotees" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Devotees Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This section allows you to manage all devotees. You can view devotee details, assign roles, and more.
                  </p>
                  <Button onClick={() => navigate('/admin')}>
                    Go to Devotees Manager
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="donations" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Donations Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This section allows you to manage all donations. You can view donation details, generate reports, and more.
                  </p>
                  <Button onClick={() => navigate('/admin')}>
                    Go to Donations Manager
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Resources Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This section allows you to manage all resources. You can upload, edit, and delete resources.
                  </p>
                  <Button onClick={() => navigate('/admin')}>
                    Go to Resources Manager
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    This section allows you to manage system settings, user roles, and permissions.
                  </p>
                  <Button onClick={() => navigate('/admin')}>
                    Go to Settings Manager
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
