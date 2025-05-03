import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Course, CourseModule, Lesson } from './Courses';
import { 
  PlusIcon, TrashIcon, FileTextIcon, ImageIcon, FileVideoIcon, 
  BookOpenIcon, ArrowLeftIcon, CheckIcon, FilePlusIcon, FileIcon
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ResourceUploader from '../components/admin/ResourceUploader';

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

// Course creation form schema
const courseFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  instructor: z.string().optional(),
  duration: z.string().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).default("Beginner"),
  thumbnail: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

const CourseCreation = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [activeTab, setActiveTab] = useState("basics");
  const [currentEditingModule, setCurrentEditingModule] = useState<CourseModule | null>(null);
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
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [uploadContentType, setUploadContentType] = useState<'video' | 'image' | 'pdf' | 'text'>('text');

  // Initialize form
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: '',
      description: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      thumbnail: '',
    },
  });

  // Function to handle file uploads
  const handleFileUploaded = (fileUrl: string, fileName: string, fileType: string) => {
    // For thumbnail upload
    if (activeTab === "basics" && uploadContentType === "image") {
      setThumbnailUrl(fileUrl);
      form.setValue("thumbnail", fileUrl);
      toast.success("Thumbnail uploaded successfully");
      return;
    }

    // For lesson content upload
    if (activeTab === "content") {
      setNewLesson({
        ...newLesson,
        content: fileUrl,
      });
      toast.success(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} content uploaded successfully`);
    }
  };

  const handleAddModule = () => {
    if (!newModule.title) {
      toast.error("Please provide a module title");
      return;
    }

    const id = `module-${Date.now()}`;
    const module: CourseModule = {
      id,
      title: newModule.title,
      lessons: [],
    };

    setModules([...modules, module]);
    setNewModule({ title: '' });
    toast.success("Module added successfully");
  };

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
    toast.success("Module deleted successfully");
  };

  const handleAddLesson = () => {
    if (!currentEditingModule) {
      toast.error("Please select a module first");
      return;
    }

    if (!newLesson.title || !newLesson.content) {
      toast.error("Please provide lesson title and content");
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
      ...currentEditingModule,
      lessons: [...currentEditingModule.lessons, lesson],
    };

    setModules(modules.map(module => 
      module.id === currentEditingModule.id ? updatedModule : module
    ));

    setCurrentEditingModule(updatedModule);
    setNewLesson({
      title: '',
      type: 'text',
      content: '',
      duration: '',
      description: '',
      attachments: [],
      quizQuestions: [],
    });

    toast.success("Lesson added successfully");
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const updatedLessons = module.lessons.filter(lesson => lesson.id !== lessonId);
    const updatedModule = { ...module, lessons: updatedLessons };
    
    setModules(modules.map(m => m.id === moduleId ? updatedModule : m));
    
    if (currentEditingModule?.id === moduleId) {
      setCurrentEditingModule(updatedModule);
    }
    
    toast.success("Lesson deleted successfully");
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

    toast.success("Attachment added");
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

    toast.success("Quiz question added");
  };

  const removeQuizQuestion = (index: number) => {
    const updatedQuestions = [...(newLesson.quizQuestions || [])];
    updatedQuestions.splice(index, 1);
    setNewLesson({
      ...newLesson,
      quizQuestions: updatedQuestions
    });
  };

  const onSubmit = (data: CourseFormValues) => {
    if (modules.length === 0) {
      toast.error("Please add at least one module to the course");
      return;
    }

    // Create a new course with the form data and modules
    const id = `course-${Date.now()}`;
    const course: Course = {
      id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail || thumbnailUrl || '/lovable-uploads/a2ea3c4d-d4cd-4312-a22a-d688c1c49ec2.png',
      instructor: data.instructor || '',
      duration: data.duration || '',
      level: data.level,
      modules: modules,
    };

    // Store the course in localStorage to ensure it's available for the course manager
    const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    localStorage.setItem('courses', JSON.stringify([...existingCourses, course]));

    // In a real application, this would save to the backend
    toast.success("Course created successfully");
    navigate('/admin');
  };

  return (
    <main>
      <PageHeader 
        title="Create New Course"
        description="Build a comprehensive course structure with modules, lessons, and multimedia content."
      />

      <section className="py-12 bg-white">
        <div className="container-custom">
          <Button 
            variant="outline" 
            className="mb-8"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>

          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="basics">Course Basics</TabsTrigger>
                  <TabsTrigger value="modules">Modules & Structure</TabsTrigger>
                  <TabsTrigger value="content">Add Lesson Content</TabsTrigger>
                </TabsList>

                {/* Course Basics Tab */}
                <TabsContent value="basics">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-maroon mb-6">Course Information</h2>
                      <p className="text-gray-600 mb-6">Fill in the basic details about your course.</p>

                      <Form {...form}>
                        <form className="space-y-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Course Title *</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Fundamentals of Kriyayoga" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description *</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Provide a detailed description of the course" 
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="instructor"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Instructor</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Swami Parameshwarananda" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Duration</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 8 hours" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="level"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Level</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a level" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Beginner">Beginner</SelectItem>
                                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                                      <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div>
                              <FormField
                                control={form.control}
                                name="thumbnail"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Thumbnail URL</FormLabel>
                                    <FormControl>
                                      <div className="flex gap-2">
                                        <Input 
                                          placeholder="Image URL" 
                                          {...field} 
                                          value={thumbnailUrl || field.value}
                                          onChange={(e) => {
                                            field.onChange(e);
                                            setThumbnailUrl('');
                                          }}
                                        />
                                      </div>
                                    </FormControl>
                                    <FormDescription>
                                      Provide a URL to an image or upload one below
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="mt-2">
                                <Label>Upload Thumbnail</Label>
                                <div className="mt-1">
                                  <ResourceUploader
                                    onFileUploaded={handleFileUploaded}
                                    acceptedTypes="image/*"
                                    fileType="image"
                                  />
                                </div>
                              </div>

                              {thumbnailUrl && (
                                <div className="mt-4 border rounded-md overflow-hidden max-w-xs">
                                  <img
                                    src={thumbnailUrl}
                                    alt="Thumbnail preview"
                                    className="w-full h-auto"
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button 
                              type="button" 
                              onClick={() => {
                                form.trigger(["title", "description"]).then((isValid) => {
                                  if (isValid) {
                                    setActiveTab("modules");
                                  }
                                });
                              }}
                              className="bg-saffron hover:bg-saffron/90"
                            >
                              Continue to Modules
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </TabsContent>

                {/* Modules & Structure Tab */}
                <TabsContent value="modules">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-maroon mb-6">Course Structure</h2>
                      <p className="text-gray-600 mb-6">Define the modules that make up your course.</p>

                      {/* Add Module Section */}
                      <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h3 className="text-lg font-semibold mb-4">Add New Module</h3>
                        <div className="flex gap-4">
                          <div className="flex-grow">
                            <Input
                              placeholder="Module Title"
                              value={newModule.title}
                              onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                            />
                          </div>
                          <Button 
                            onClick={handleAddModule}
                            className="bg-saffron hover:bg-saffron/90"
                          >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Module
                          </Button>
                        </div>
                      </div>

                      {/* Module List */}
                      {modules.length === 0 ? (
                        <div className="text-center py-16 border border-dashed rounded-md">
                          <BookOpenIcon className="h-12 w-12 mx-auto text-gray-400" />
                          <h3 className="mt-4 text-lg font-medium">No modules added yet</h3>
                          <p className="mt-2 text-gray-500">Add modules to organize your course content</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {modules.map((module, index) => (
                            <Card key={module.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <span className="bg-gray-200 text-gray-700 h-8 w-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                                      {index + 1}
                                    </span>
                                    <h4 className="text-lg font-medium">{module.title}</h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={() => {
                                        setCurrentEditingModule(module);
                                        setActiveTab("content");
                                      }}
                                    >
                                      Add Lessons
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => handleDeleteModule(module.id)}
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                {module.lessons.length > 0 && (
                                  <div className="mt-4 pl-11">
                                    <h5 className="text-sm font-medium text-gray-500 mb-2">Lessons:</h5>
                                    <ul className="space-y-2">
                                      {module.lessons.map((lesson, lessonIndex) => (
                                        <li key={lesson.id} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                          <div className="flex items-center">
                                            {lesson.type === 'video' && <FileVideoIcon className="h-4 w-4 mr-2 text-blue-500" />}
                                            {lesson.type === 'text' && <FileTextIcon className="h-4 w-4 mr-2 text-green-500" />}
                                            {lesson.type === 'image' && <ImageIcon className="h-4 w-4 mr-2 text-purple-500" />}
                                            <span>{lessonIndex + 1}. {lesson.title}</span>
                                          </div>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                          >
                                            <TrashIcon className="h-3 w-3" />
                                          </Button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between pt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab("basics")}
                        >
                          Back to Basics
                        </Button>
                        <Button 
                          onClick={() => setActiveTab("content")}
                          className="bg-saffron hover:bg-saffron/90"
                          disabled={modules.length === 0}
                        >
                          Continue to Content
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Add Lesson Content Tab */}
                <TabsContent value="content">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-maroon mb-6">Lesson Content</h2>
                      
                      {/* Module Selection */}
                      {modules.length > 0 ? (
                        <div className="mb-6">
                          <Label htmlFor="moduleSelect" className="block mb-2">Select Module to Add Content</Label>
                          <Select 
                            value={currentEditingModule?.id || ''} 
                            onValueChange={(value) => {
                              const module = modules.find(m => m.id === value);
                              setCurrentEditingModule(module || null);
                            }}
                          >
                            <SelectTrigger id="moduleSelect" className="w-full md:w-1/2">
                              <SelectValue placeholder="Choose a module" />
                            </SelectTrigger>
                            <SelectContent>
                              {modules.map((module) => (
                                <SelectItem key={module.id} value={module.id}>
                                  {module.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                          <p className="text-yellow-700">
                            Please add at least one module in the previous step before adding lesson content.
                          </p>
                        </div>
                      )}

                      {currentEditingModule && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold">
                            Adding content to: {currentEditingModule.title}
                          </h3>

                          {/* Lesson Creator */}
                          <div className="bg-gray-50 p-6 rounded-lg">
                            <Tabs defaultValue="basic" className="w-full">
                              <TabsList>
                                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger value="content">Content</TabsTrigger>
                                <TabsTrigger value="upload">Upload Content</TabsTrigger>
                                <TabsTrigger value="attachments">Attachments</TabsTrigger>
                                <TabsTrigger value="quiz">Quiz Questions</TabsTrigger>
                              </TabsList>

                              {/* Basic Lesson Info */}
                              <TabsContent value="basic" className="space-y-4 pt-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="lessonTitle">Lesson Title *</Label>
                                  <Input
                                    id="lessonTitle"
                                    value={newLesson.title}
                                    onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                                    placeholder="Enter a clear, descriptive title"
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <Label htmlFor="lessonDescription">Description</Label>
                                  <Textarea
                                    id="lessonDescription"
                                    placeholder="Brief description of this lesson"
                                    value={newLesson.description || ''}
                                    onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="lessonType">Content Type</Label>
                                    <Select 
                                      value={newLesson.type}
                                      onValueChange={(value) => setNewLesson({...newLesson, type: value as 'video' | 'text' | 'image'})}
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
                                    <Label htmlFor="lessonDuration">Duration</Label>
                                    <Input
                                      id="lessonDuration"
                                      placeholder="e.g., 15 min"
                                      value={newLesson.duration || ''}
                                      onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
                                    />
                                  </div>
                                </div>
                              </TabsContent>

                              {/* Lesson Content */}
                              <TabsContent value="content" className="space-y-4 pt-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="lessonContent">Content *</Label>
                                  {newLesson.type === 'text' ? (
                                    <Textarea
                                      id="lessonContent"
                                      placeholder="Enter text content"
                                      value={newLesson.content || ''}
                                      onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                                      className="min-h-[300px]"
                                    />
                                  ) : newLesson.type === 'video' ? (
                                    <div className="space-y-2">
                                      <Input
                                        id="lessonContent"
                                        placeholder="Enter YouTube embed URL (https://www.youtube.com/embed/...)"
                                        value={newLesson.content || ''}
                                        onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                                      />
                                      <p className="text-xs text-gray-500">
                                        Use the embed URL format: https://www.youtube.com/embed/VIDEO_ID
                                      </p>
                                      
                                      {newLesson.content && (
                                        <div className="mt-4 border rounded-md overflow-hidden aspect-video">
                                          <iframe
                                            width="100%"
                                            height="100%"
                                            src={newLesson.content}
                                            title="Video preview"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                          ></iframe>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      <Input
                                        id="lessonContent"
                                        placeholder="Enter image URL"
                                        value={newLesson.content || ''}
                                        onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                                      />
                                      
                                      {newLesson.content && (
                                        <div className="mt-4 border rounded-md overflow-hidden">
                                          <img
                                            src={newLesson.content}
                                            alt="Image preview"
                                            className="w-full h-auto max-h-[300px] object-contain"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </TabsContent>

                              {/* Upload Content Tab */}
                              <TabsContent value="upload" className="space-y-4 pt-4">
                                <div className="mb-6">
                                  <Label>Content Type</Label>
                                  <Select
                                    value={uploadContentType}
                                    onValueChange={(value) => {
                                      setUploadContentType(value as 'video' | 'image' | 'pdf' | 'text');
                                      setNewLesson({
                                        ...newLesson,
                                        type: value as 'video' | 'image' | 'text',
                                      });
                                    }}
                                  >
                                    <SelectTrigger className="w-full md:w-1/3 mb-4">
                                      <SelectValue placeholder="Select content type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">Video</SelectItem>
                                      <SelectItem value="image">Image</SelectItem>
                                      <SelectItem value="pdf">PDF</SelectItem>
                                      <SelectItem value="text">Text Document</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  <div className="my-4">
                                    <ResourceUploader
                                      onFileUploaded={handleFileUploaded}
                                      acceptedTypes={
                                        uploadContentType === 'video' 
                                          ? 'video/*' 
                                          : uploadContentType === 'image' 
                                            ? 'image/*' 
                                            : uploadContentType === 'pdf' 
                                              ? 'application/pdf' 
                                              : 'text/*,.doc,.docx'
                                      }
                                      fileType={uploadContentType}
                                    />
                                  </div>
                                  
                                  {newLesson.content && (
                                    <div className="mt-6 p-4 bg-white border rounded-md">
                                      <h3 className="text-lg font-medium mb-2">Content Preview</h3>
                                      {uploadContentType === 'image' && (
                                        <div className="border rounded-md overflow-hidden">
                                          <img 
                                            src={newLesson.content} 
                                            alt="Content preview" 
                                            className="max-w-full h-auto"
                                          />
                                        </div>
                                      )}
                                      {uploadContentType === 'video' && (
                                        <div className="border rounded-md overflow-hidden">
                                          <video 
                                            src={newLesson.content}
                                            controls
                                            className="max-w-full h-auto"
                                          >
                                            Your browser does not support the video tag.
                                          </video>
                                        </div>
                                      )}
                                      {(uploadContentType === 'pdf' || uploadContentType === 'text') && (
                                        <div className="flex items-center space-x-2">
                                          {uploadContentType === 'pdf' 
                                            ? <FileTextIcon className="h-6 w-6 text-red-500" />
                                            : <FileTextIcon className="h-6 w-6 text-green-500" />
                                          }
                                          <div>
                                            <p className="font-medium">Content uploaded successfully</p>
                                            <p className="text-sm text-gray-500">{newLesson.content}</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </TabsContent>

                              {/* Attachments */}
                              <TabsContent value="attachments" className="space-y-4 pt-4">
                                <div className="mb-6">
                                  <h3 className="text-sm font-medium mb-4">Add Supplementary Materials</h3>
                                  
                                  <div className="space-y-4 mb-6 p-4 bg-white border rounded-md">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="attachmentTitle">Title</Label>
                                        <Input
                                          id="attachmentTitle"
                                          placeholder="e.g., Course Handbook"
                                          value={newAttachment.title}
                                          onChange={(e) => setNewAttachment({...newAttachment, title: e.target.value})}
                                        />
                                      </div>
                                      
                                      <div className="grid gap-2">
                                        <Label htmlFor="attachmentType">Type</Label>
                                        <Select 
                                          value={newAttachment.type}
                                          onValueChange={(value) => setNewAttachment({
                                            ...newAttachment, 
                                            type: value as 'pdf' | 'audio' | 'document'
                                          })}
                                        >
                                          <SelectTrigger id="attachmentType">
                                            <SelectValue placeholder="Select type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="audio">Audio</SelectItem>
                                            <SelectItem value="document">Document</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                    
                                    <div className="grid gap-2">
                                      <Label htmlFor="attachmentUrl">URL</Label>
                                      <Input
                                        id="attachmentUrl"
                                        placeholder="Link to the file"
                                        value={newAttachment.url}
                                        onChange={(e) => setNewAttachment({...newAttachment, url: e.target.value})}
                                      />
                                    </div>
                                    
                                    <Button 
                                      type="button" 
                                      onClick={handleAddAttachment}
                                      className="mt-2"
                                    >
                                      <FilePlusIcon className="mr-2 h-4 w-4" /> Add Attachment
                                    </Button>
                                  </div>
                                  
                                  {/* Attachments List */}
                                  {newLesson.attachments && newLesson.attachments.length > 0 ? (
                                    <div className="border rounded-md divide-y">
                                      {newLesson.attachments.map((attachment, index) => (
                                        <div
