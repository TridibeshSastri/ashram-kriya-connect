
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Users, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data for mentor dashboard
const mockCourses = [
  { id: 1, name: 'Introduction to Kriyayoga', students: 24, nextSession: '2025-05-12', status: 'active' },
  { id: 2, name: 'Advanced Meditation Techniques', students: 15, nextSession: '2025-05-15', status: 'active' },
  { id: 3, name: 'Philosophy of Yogananda', students: 18, nextSession: '2025-05-20', status: 'upcoming' },
];

const mockStudents = [
  { id: 1, name: 'Amrita Patel', progress: 75, course: 'Introduction to Kriyayoga', lastActive: '2025-05-02' },
  { id: 2, name: 'Rahul Sharma', progress: 50, course: 'Introduction to Kriyayoga', lastActive: '2025-05-03' },
  { id: 3, name: 'Priya Mehta', progress: 90, course: 'Advanced Meditation Techniques', lastActive: '2025-05-01' },
];

const mockSchedule = [
  { id: 1, type: 'Live Session', title: 'Kriya Techniques Q&A', date: '2025-05-12', time: '18:00 - 19:30', attendees: 22 },
  { id: 2, type: 'Workshop', title: 'Meditation Workshop', date: '2025-05-18', time: '10:00 - 12:00', attendees: 15 },
  { id: 3, type: 'Office Hours', title: 'Student Consultations', date: '2025-05-20', time: '17:00 - 19:00', attendees: 5 },
];

const MentorDashboard = () => {
  const { userData, signOut } = useAuth();
  const navigate = useNavigate();

  if (!userData) {
    return null; // Should be caught by ProtectedRoute
  }

  return (
    <main>
      <PageHeader
        title={`Welcome, ${userData.fullName || 'Mentor'}`}
        description="Manage your courses and students with the ASKSMS mentor dashboard."
      />

      <section className="py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/course-creation')}>Create New Course</Button>
              <Button variant="outline" onClick={() => signOut()}>Log Out</Button>
            </div>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-8">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
                        <Badge className={course.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-blue-100 text-blue-800 hover:bg-blue-100'}>
                          {course.status === 'active' ? 'Active' : 'Upcoming'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Students Enrolled</p>
                          <p className="font-medium">{course.students}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Next Session</p>
                          <p className="font-medium">{course.nextSession}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/course-edit/${course.id}`)}>
                          Manage Course
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="students" className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon">Your Students</h2>
              {mockStudents.map((student) => (
                <Card key={student.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-saffron" />
                          <h3 className="text-lg font-semibold">{student.name}</h3>
                        </div>
                        <p className="text-muted-foreground mb-2">Course: {student.course}</p>
                        <p className="text-sm text-muted-foreground">Last active: {student.lastActive}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span>Progress:</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {student.progress}%
                          </Badge>
                        </div>
                        <Button size="sm" className="flex items-center gap-1">
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon">Your Schedule</h2>
              {mockSchedule.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-saffron" />
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                        </div>
                        <Badge className="mb-2">{event.type}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.time}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Attendees:</span>
                          <span className="ml-2 font-medium">{event.attendees}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Manage Session
                        </Button>
                      </div>
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

export default MentorDashboard;
