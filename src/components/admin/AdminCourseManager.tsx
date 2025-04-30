
import { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, BookOpenIcon, FileTextIcon, CheckIcon, ImageIcon, FileVideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCourses, Course, CourseModule, Lesson } from '../../pages/Courses';
import { useToast } from '@/hooks/use-toast';

const AdminCourseManager = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    thumbnail: '',
  });
  const [newModule, setNewModule] = useState<Partial<CourseModule>>({
    title: '',
  });
  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: '',
    type: 'text',
    content: '',
    duration: '',
  });
  
  const { toast } = useToast();

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    toast({
      title: "Course deleted",
      description: "The course has been successfully removed.",
    });
  };

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const id = newCourse.title.toLowerCase().replace(/\s+/g, '-');
    const course: Course = {
      id,
      title: newCourse.title || '',
      description: newCourse.description || '',
      thumbnail: newCourse.thumbnail || '/lovable-uploads/a2ea3c4d-d4cd-4312-a22a-d688c1c49ec2.png',
      instructor: newCourse.instructor || '',
      duration: newCourse.duration || '',
      level: newCourse.level as 'Beginner' | 'Intermediate' | 'Advanced' || 'Beginner',
      modules: [],
    };

    setCourses([...courses, course]);
    setNewCourse({
      title: '',
      description: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      thumbnail: '',
    });
    setIsAddCourseOpen(false);
    toast({
      title: "Course added",
      description: "New course has been successfully created.",
    });
  };

  const handleAddModule = () => {
    if (!currentCourse || !newModule.title) {
      toast({
        title: "Error",
        description: "Please fill in the module title.",
        variant: "destructive"
      });
      return;
    }

    const id = `module-${Date.now()}`;
    const module: CourseModule = {
      id,
      title: newModule.title,
      lessons: [],
    };

    const updatedCourse = {
      ...currentCourse,
      modules: [...currentCourse.modules, module],
    };

    setCourses(courses.map(course => 
      course.id === currentCourse.id ? updatedCourse : course
    ));

    setCurrentCourse(updatedCourse);
    setNewModule({ title: '' });
    setIsAddModuleOpen(false);
    toast({
      title: "Module added",
      description: "New module has been successfully added to the course.",
    });
  };

  const handleAddLesson = () => {
    if (!currentCourse || !currentModule || !newLesson.title || !newLesson.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const id = `lesson-${Date.now()}`;
    const lesson: Lesson = {
      id,
      title: newLesson.title,
      type: newLesson.type as 'video' | 'text' | 'image',
      content: newLesson.content,
      duration: newLesson.duration,
    };

    const updatedModule = {
      ...currentModule,
      lessons: [...currentModule.lessons, lesson],
    };

    const updatedModules = currentCourse.modules.map(module => 
      module.id === currentModule.id ? updatedModule : module
    );

    const updatedCourse = {
      ...currentCourse,
      modules: updatedModules,
    };

    setCourses(courses.map(course => 
      course.id === currentCourse.id ? updatedCourse : course
    ));

    setCurrentCourse(updatedCourse);
    setCurrentModule(updatedModule);
    setNewLesson({
      title: '',
      type: 'text',
      content: '',
      duration: '',
    });
    setIsAddLessonOpen(false);
    toast({
      title: "Lesson added",
      description: "New lesson has been successfully added to the module.",
    });
  };

  const handleDeleteModule = (courseId: string, moduleId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const updatedModules = course.modules.filter(module => module.id !== moduleId);
    const updatedCourse = { ...course, modules: updatedModules };
    
    setCourses(courses.map(c => c.id === courseId ? updatedCourse : c));
    
    if (currentCourse?.id === courseId) {
      setCurrentCourse(updatedCourse);
    }
    
    toast({
      title: "Module deleted",
      description: "The module has been successfully removed.",
    });
  };

  const handleDeleteLesson = (courseId: string, moduleId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const updatedLessons = module.lessons.filter(lesson => lesson.id !== lessonId);
    const updatedModule = { ...module, lessons: updatedLessons };
    const updatedModules = course.modules.map(m => m.id === moduleId ? updatedModule : m);
    const updatedCourse = { ...course, modules: updatedModules };
    
    setCourses(courses.map(c => c.id === courseId ? updatedCourse : c));
    
    if (currentCourse?.id === courseId) {
      setCurrentCourse(updatedCourse);
      if (currentModule?.id === moduleId) {
        setCurrentModule(updatedModule);
      }
    }
    
    toast({
      title: "Lesson deleted",
      description: "The lesson has been successfully removed.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="details">Course Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-maroon">Course Management</h2>
              <Button 
                className="bg-saffron hover:bg-saffron/90"
                onClick={() => setIsAddCourseOpen(true)}
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Modules</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium flex items-center">
                        <BookOpenIcon className="mr-2 h-4 w-4 text-saffron" />
                        {course.title}
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.level}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.modules.length}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setCurrentCourse(course)}
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
          </TabsContent>
          
          <TabsContent value="details">
            {currentCourse ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-maroon">{currentCourse.title}</h2>
                  <Button 
                    className="bg-saffron hover:bg-saffron/90"
                    onClick={() => setIsAddModuleOpen(true)}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" /> Add Module
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Instructor</p>
                    <p>{currentCourse.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Level</p>
                    <p>{currentCourse.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p>{currentCourse.duration}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Modules</h3>
                  
                  {currentCourse.modules.length === 0 ? (
                    <p className="text-gray-500">No modules added yet. Click "Add Module" to create your first module.</p>
                  ) : (
                    <div className="space-y-4">
                      {currentCourse.modules.map((module) => (
                        <Card key={module.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-md font-medium">{module.title}</h4>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => {
                                    setCurrentModule(module);
                                    setIsAddLessonOpen(true);
                                  }}
                                >
                                  <PlusIcon className="h-4 w-4" /><span className="ml-1">Add Lesson</span>
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-700" 
                                  onClick={() => handleDeleteModule(currentCourse.id, module.id)}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {module.lessons.length > 0 ? (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {module.lessons.map((lesson) => (
                                    <TableRow key={lesson.id}>
                                      <TableCell className="font-medium flex items-center">
                                        {lesson.type === 'video' && <FileVideoIcon className="mr-2 h-4 w-4 text-blue-500" />}
                                        {lesson.type === 'text' && <FileTextIcon className="mr-2 h-4 w-4 text-green-500" />}
                                        {lesson.type === 'image' && <ImageIcon className="mr-2 h-4 w-4 text-purple-500" />}
                                        {lesson.title}
                                      </TableCell>
                                      <TableCell className="capitalize">{lesson.type}</TableCell>
                                      <TableCell>{lesson.duration || '-'}</TableCell>
                                      <TableCell>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="text-red-500 hover:text-red-700" 
                                          onClick={() => handleDeleteLesson(currentCourse.id, module.id, lesson.id)}
                                        >
                                          <TrashIcon className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <p className="text-gray-500 text-sm">No lessons added yet.</p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No course selected</h3>
                <p className="mt-1 text-gray-500">Select a course from the Courses tab to view and edit its details.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Course Dialog */}
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Create a new course to share with devotees. You can add modules and lessons later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 8 hours"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="level">Level</Label>
                  <Select 
                    value={newCourse.level}
                    onValueChange={(value) => setNewCourse({...newCourse, level: value as any})}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  placeholder="Image URL"
                  value={newCourse.thumbnail}
                  onChange={(e) => setNewCourse({...newCourse, thumbnail: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddCourse}>
                Add Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Module Dialog */}
        <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Module</DialogTitle>
              <DialogDescription>
                Add a new module to {currentCourse?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="moduleTitle">Module Title *</Label>
                <Input
                  id="moduleTitle"
                  value={newModule.title}
                  onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModuleOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddModule}>
                Add Module
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Lesson Dialog */}
        <Dialog open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Lesson</DialogTitle>
              <DialogDescription>
                Add a new lesson to {currentModule?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="lessonTitle">Lesson Title *</Label>
                <Input
                  id="lessonTitle"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lessonType">Type</Label>
                <Select 
                  value={newLesson.type}
                  onValueChange={(value) => setNewLesson({...newLesson, type: value as any})}
                >
                  <SelectTrigger id="lessonType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lessonContent">Content *</Label>
                {newLesson.type === 'text' ? (
                  <Textarea
                    id="lessonContent"
                    placeholder="Enter text content"
                    value={newLesson.content}
                    onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                    className="min-h-[100px]"
                  />
                ) : newLesson.type === 'video' ? (
                  <div className="space-y-2">
                    <Input
                      id="lessonContent"
                      placeholder="Enter YouTube embed URL (https://www.youtube.com/embed/...)"
                      value={newLesson.content}
                      onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">
                      Use the embed URL format: https://www.youtube.com/embed/VIDEO_ID
                    </p>
                  </div>
                ) : (
                  <Input
                    id="lessonContent"
                    placeholder="Enter image URL"
                    value={newLesson.content}
                    onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lessonDuration">Duration (optional)</Label>
                <Input
                  id="lessonDuration"
                  placeholder="e.g., 15 min"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddLessonOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddLesson}>
                Add Lesson
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminCourseManager;
