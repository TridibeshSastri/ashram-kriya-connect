
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, FileText, ShoppingBag } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data
const mockCourses = [
  { id: 1, name: 'Introduction to Kriyayoga', progress: 60, lastAccessed: '2025-03-28' },
  { id: 2, name: 'Advanced Meditation Techniques', progress: 25, lastAccessed: '2025-04-15' },
  { id: 3, name: 'Philosophy of Yogananda', progress: 40, lastAccessed: '2025-04-20' },
];

const mockPurchases = [
  { id: 1, name: 'Kriyayoga Initiation Program', status: 'completed', date: '2025-02-15', amount: 108 },
  { id: 2, name: 'Monthly Yajna Donation', status: 'completed', date: '2025-03-10', amount: 51 },
  { id: 3, name: 'Spiritual Retreat Booking', status: 'pending', date: '2025-05-20', amount: 251 },
];

const mockResources = [
  { id: 1, name: 'Meditation Audio Guide', type: 'audio', downloadedOn: '2025-03-05' },
  { id: 2, name: 'Kriya Postures Handbook', type: 'pdf', downloadedOn: '2025-03-15' },
  { id: 3, name: 'Daily Practice Journal', type: 'pdf', downloadedOn: '2025-04-10' },
];

const DevoteeDashboard = () => {
  const navigate = useNavigate();
  const [devotee, setDevotee] = useState<{name: string; email: string;} | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('devoteeUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser.isAuthenticated) {
          navigate('/devotee-auth');
          return;
        }
        setDevotee(parsedUser);
      } catch (e) {
        navigate('/devotee-auth');
      }
    } else {
      navigate('/devotee-auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('devoteeUser');
    navigate('/devotee-auth');
  };

  if (!devotee) {
    return null; // Will redirect via useEffect
  }

  return (
    <main>
      <PageHeader
        title={`Welcome, ${devotee.name}`}
        description="View and manage your spiritual journey with ASKSMS."
      />

      <section className="py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <p className="text-muted-foreground">{devotee.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>Log Out</Button>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-8">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon">Your Courses</h2>
              {mockCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-saffron" />
                          <h3 className="text-lg font-semibold">{course.name}</h3>
                        </div>
                        <Badge>{course.progress}% Complete</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-saffron h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Last accessed: {course.lastAccessed}</span>
                        <Button size="sm">Continue Learning</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="purchases" className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon">Your Purchases</h2>
              {mockPurchases.map((purchase) => (
                <Card key={purchase.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <ShoppingBag className="h-5 w-5 text-saffron" />
                          <h3 className="text-lg font-semibold">{purchase.name}</h3>
                        </div>
                        <p className="text-muted-foreground">Date: {purchase.date}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                        <p className="font-medium">₹{purchase.amount}</p>
                        <Badge className={
                          purchase.status === 'completed' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }>
                          {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon">Your Resources</h2>
              {mockResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-saffron" />
                        <div>
                          <h3 className="font-semibold">{resource.name}</h3>
                          <p className="text-sm text-muted-foreground">Downloaded on: {resource.downloadedOn}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {resource.type === 'pdf' ? 'View PDF' : 'Play Audio'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default DevoteeDashboard;
