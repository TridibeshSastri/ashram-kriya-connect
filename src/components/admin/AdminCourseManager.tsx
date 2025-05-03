
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../pages/Courses';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilIcon, TrashIcon, PlusIcon, FileTextIcon } from 'lucide-react';
import { toast } from 'sonner';

const AdminCourseManager = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Load courses from localStorage on component mount
  useEffect(() => {
    try {
      const storedCourses = localStorage.getItem('courses');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      }
    } catch (error) {
      console.error("Error loading courses from localStorage:", error);
      toast.error("Failed to load courses");
    }
  }, []);

  const handleDeleteCourse = (courseId: string) => {
    try {
      // Remove the course from the state
      const updatedCourses = courses.filter(course => course.id !== courseId);
      setCourses(updatedCourses);
      
      // Update localStorage
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course");
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = (courseId: string) => {
    // In a real app, this would navigate to an edit page
    toast.info("Edit functionality will be implemented in the future");
  };

  const handleCreateCourse = () => {
    navigate('/course-creation');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-maroon">Courses Management</h2>
          <Button 
            className="bg-saffron hover:bg-saffron/90"
            onClick={handleCreateCourse}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Create New Course
          </Button>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-md">
            <FileTextIcon className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No courses found</h3>
            <p className="mt-2 text-gray-500">Create your first course to get started</p>
            <Button 
              className="mt-4 bg-saffron hover:bg-saffron/90"
              onClick={handleCreateCourse}
            >
              Create New Course
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.modules?.length || 0} modules</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditCourse(course.id)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700" 
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminCourseManager;
