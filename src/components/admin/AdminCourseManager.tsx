import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PencilIcon, TrashIcon, PlusIcon, BookOpenIcon, FileTextIcon, 
  CheckIcon, ImageIcon, FileVideoIcon, FilePlusIcon, FileIcon
} from 'lucide-react';
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { mockCourses, Course, CourseModule, Lesson } from '../../pages/Courses';
import { useToast } from '@/hooks/use-toast';
import { toast } from "@/components/ui/sonner";

// Enhanced lesson type with additional fields
interface EnhancedLesson extends Lesson {
  description?: string;
  attachments?: {
    type: 'pdf' | 'audio' | 'document';
    title: string;
    url: string;
  }[];
  quizQuestions?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const AdminCourseManager = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [newModule, setNewModule] = useState<Partial<CourseModule>>({
    title: '',
  });
  const [newLesson, setNewLesson] = useState<Partial<EnhancedLesson>>({
    title: '',
    type: 'text',
    content: '',
    duration: '',
    description: '',
    attachments: [],
    quizQuestions: [],
  });
  const [activeAttachmentTab, setActiveAttachmentTab] = useState<string>('content');
  const [newAttachment, setNewAttachment] = useState({
    type: 'pdf' as 'pdf' | 'audio' | 'document',
    title: '',
    url: '',
  });
  const [newQuizQuestion, setNewQuizQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });
  
  const { toast: useToastHook } = useToast();

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    useToastHook({
      title: "Course deleted",
      description: "The course has been successfully removed.",
    });
  };

  const handleAddModule = () => {
    if (!currentCourse || !newModule.title) {
      useToastHook({
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
    toast.success("Module added successfully");
  };

  const handleAddAttachment = () => {
    if (!newAttachment.title || !newAttachment.url) {
      toast.error("Please fill in all attachment fields");
      return;
    }

    setNewLesson({
      ...newLesson,
      attachments: [...(newLesson.attachments || []), { ...newAttachment }]
    });

    setNewAttachment({
      type: 'pdf',
      title: '',
      url: '',
    });
  };

  const removeAttachment = (index: number) => {
    const updatedAttachments = [...(newLesson.attachments || [])];
    updatedAttachments.splice(index, 1);
    setNewLesson({
      ...newLesson,
      attachments: updatedAttachments
    });
  };

  const handleAddQuizQuestion = () => {
    if (!newQuizQuestion.question || newQuizQuestion.options.some(option => !option)) {
      toast.error("Please fill in all question fields");
      return;
    }

    setNewLesson({
      ...newLesson,
      quizQuestions: [...(newLesson.quizQuestions || []), { ...newQuizQuestion }]
    });

    setNewQuizQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  };

  const removeQuizQuestion = (index: number) => {
    const updatedQuestions = [...(newLesson.quizQuestions || [])];
    updatedQuestions.splice(index, 1);
    setNewLesson({
      ...newLesson,
      quizQuestions: updatedQuestions
    });
  };

  const handleAddLesson = () => {
    if (!currentCourse || !currentModule || !newLesson.title || !newLesson.content) {
      useToastHook({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const id = `lesson-${Date.now()}`;
    const lesson: EnhancedLesson = {
      id,
      title: newLesson.title,
      type: newLesson.type as 'video' | 'text' | 'image',
      content: newLesson.content,
      duration: newLesson.duration,
      description: newLesson.description,
      attachments: newLesson.attachments,
      quizQuestions: newLesson.quizQuestions,
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
      description: '',
      attachments: [],
      quizQuestions: [],
    });
    setIsAddLessonOpen(false);
    toast.success("Lesson added successfully");
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
    
    useToastHook({
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
    
    useToastHook({
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
                onClick={() => navigate('/course-creation')}
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Create New Course
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
                                    <TableHead>Attachments</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {module.lessons.map((lesson) => {
                                    const enhancedLesson = lesson as EnhancedLesson;
                                    return (
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
                                          {enhancedLesson.attachments?.length || 0} files
                                        </TableCell>
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
                                    );
                                  })}
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

        {/* Remove Add Course Dialog */}
        
        {/* ... keep existing code (Add Module Dialog and Add Lesson Dialog) */}
      </CardContent>
    </Card>
  );
};

export default AdminCourseManager;
