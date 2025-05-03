
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course, CourseModule, Lesson } from './Courses';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrashIcon, 
  PlusIcon, 
  ArrowLeftIcon,
  UploadIcon,
} from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  instructor: z.string().min(2, { message: "Instructor name is required" }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
});

// Define a module structure that aligns with our form
interface CourseModuleInternal {
  id: string;
  title: string;
  content: string;
  lessons: LessonInternal[];
}

// Define a lesson structure for our internal use
interface LessonInternal {
  id: string;
  title: string;
  type: 'video' | 'text' | 'image';
  content: string;
  duration?: string;
}

const CourseEdit = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModuleInternal[]>([]);
  const [loading, setLoading] = useState(true);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      level: "Beginner",
    },
  });

  // Load course data
  useEffect(() => {
    if (!courseId) {
      navigate('/admin');
      return;
    }

    try {
      const storedCourses = localStorage.getItem('courses');
      if (storedCourses) {
        const courses: Course[] = JSON.parse(storedCourses);
        const foundCourse = courses.find(c => c.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
          
          // Convert course modules to our internal format
          const internalModules = foundCourse.modules?.map(module => {
            // For each module, convert its lessons to our internal format
            const internalLessons = module.lessons.map(lesson => ({
              id: lesson.id,
              title: lesson.title,
              type: lesson.type,
              content: lesson.content,
              duration: lesson.duration
            }));
            
            return {
              id: module.id,
              title: module.title,
              content: '', // Initialize with empty content
              lessons: internalLessons
            };
          }) || [];
          
          setModules(internalModules);
          
          // Set form values
          form.reset({
            title: foundCourse.title,
            description: foundCourse.description,
            instructor: foundCourse.instructor,
            level: foundCourse.level as "Beginner" | "Intermediate" | "Advanced",
          });
        } else {
          toast.error("Course not found");
          navigate('/admin');
        }
      } else {
        toast.error("No courses found");
        navigate('/admin');
      }
    } catch (error) {
      console.error("Error loading course:", error);
      toast.error("Failed to load course data");
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }, [courseId, navigate, form]);

  // Add new module
  const handleAddModule = () => {
    const newModule = {
      id: `module-${Date.now()}`,
      title: "",
      content: "",
      lessons: []
    };
    setModules([...modules, newModule]);
  };

  // Remove module
  const handleRemoveModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
  };

  // Update module field
  const handleModuleChange = (
    moduleId: string,
    field: string,
    value: string
  ) => {
    setModules(
      modules.map(module =>
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    );
  };

  // Handle file upload for a lesson
  const handleFileUpload = (
    moduleId: string, 
    type: 'image' | 'video',
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // Create a new lesson with the uploaded content
        const newLesson = {
          id: `lesson-${Date.now()}`,
          title: type === 'image' ? 'Image Content' : 'Video Content',
          type: type,
          content: result,
          duration: type === 'video' ? '0:00' : undefined
        };
        
        setModules(modules.map(module => {
          if (module.id === moduleId) {
            return {
              ...module,
              lessons: [...module.lessons, newLesson]
            };
          }
          return module;
        }));
      };
      
      // Read image/video as data URL
      reader.readAsDataURL(file);
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}`);
    }
  };

  // Add text lesson to a module
  const handleAddTextLesson = (moduleId: string) => {
    const newLesson = {
      id: `lesson-${Date.now()}`,
      title: "Text Content",
      type: 'text' as const,
      content: '',
    };
    
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: [...module.lessons, newLesson]
        };
      }
      return module;
    }));
  };

  // Update lesson content
  const handleLessonContentChange = (moduleId: string, lessonId: string, content: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                content
              };
            }
            return lesson;
          })
        };
      }
      return module;
    }));
  };

  // Update lesson title
  const handleLessonTitleChange = (moduleId: string, lessonId: string, title: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                title
              };
            }
            return lesson;
          })
        };
      }
      return module;
    }));
  };

  // Remove lesson
  const handleRemoveLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
        };
      }
      return module;
    }));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Validate modules
      if (modules.length === 0) {
        toast.error("Please add at least one module to the course");
        return;
      }

      // Check if any modules are incomplete
      const incompleteModule = modules.find(
        module => !module.title
      );
      
      if (incompleteModule) {
        toast.error("Please complete all module titles");
        return;
      }

      // Get existing courses
      const storedCourses = localStorage.getItem('courses');
      const courses: Course[] = storedCourses ? JSON.parse(storedCourses) : [];
      
      // Convert our internal modules format to Course modules format
      const courseModules: CourseModule[] = modules.map(module => {
        // Convert internal lessons to Course lessons format
        const lessons: Lesson[] = module.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          type: lesson.type,
          content: lesson.content,
          duration: lesson.duration
        }));
        
        return {
          id: module.id,
          title: module.title,
          lessons: lessons
        };
      });
      
      // Update the course
      const updatedCourse: Course = {
        id: courseId!,
        title: values.title,
        description: values.description,
        instructor: values.instructor,
        level: values.level,
        modules: courseModules,
        thumbnail: course?.thumbnail || "/placeholder.svg", // Keep existing image or use placeholder
        duration: course?.duration || "0 hours",
      };
      
      // Replace the course in the array
      const updatedCourses = courses.map(c => 
        c.id === courseId ? updatedCourse : c
      );
      
      // Save to localStorage
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      
      toast.success("Course updated successfully");
      navigate('/admin');
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };
  
  if (loading) {
    return (
      <div className="container-custom py-12 min-h-screen flex justify-center items-center">
        <div className="w-8 h-8 rounded-full border-4 border-t-saffron border-b-saffron animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Button 
        variant="outline" 
        onClick={() => navigate('/admin')}
        className="mb-6"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <PageHeader
        title="Edit Course"
        description="Update course details and content"
      />
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter instructor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter course description" 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a difficulty level" />
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
              
              <div className="border-t pt-6 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Course Modules</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddModule}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" /> Add Module
                  </Button>
                </div>
                
                {modules.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-gray-500">No modules yet. Add your first module to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {modules.map((module, index) => (
                      <div 
                        key={module.id} 
                        className="border rounded-md p-6 space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold">Module {index + 1}</h4>
                          <Button 
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveModule(module.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`module-title-${module.id}`}>Module Title</Label>
                            <Input
                              id={`module-title-${module.id}`}
                              value={module.title}
                              onChange={(e) => handleModuleChange(module.id, 'title', e.target.value)}
                              placeholder="Enter module title"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Module Content</Label>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddTextLesson(module.id)}
                              >
                                Add Text
                              </Button>
                              
                              <div>
                                <Input
                                  id={`module-image-${module.id}`}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(module.id, 'image', e)}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById(`module-image-${module.id}`)?.click()}
                                >
                                  Add Image
                                </Button>
                              </div>
                              
                              <div>
                                <Input
                                  id={`module-video-${module.id}`}
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) => handleFileUpload(module.id, 'video', e)}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById(`module-video-${module.id}`)?.click()}
                                >
                                  Add Video
                                </Button>
                              </div>
                            </div>
                            
                            {/* Lesson list */}
                            <div className="mt-4 space-y-4">
                              {module.lessons.length === 0 ? (
                                <div className="text-sm text-gray-500 p-4 border border-dashed rounded-md text-center">
                                  No content yet. Add some using the buttons above.
                                </div>
                              ) : (
                                module.lessons.map((lesson, lessonIndex) => (
                                  <div key={lesson.id} className="border rounded-md p-4">
                                    <div className="flex justify-between items-center mb-2">
                                      <div className="flex items-center">
                                        <span className="text-sm font-semibold mr-2">
                                          {lesson.type === 'text' ? 'Text' : 
                                           lesson.type === 'image' ? 'Image' : 'Video'}
                                        </span>
                                        <Input
                                          value={lesson.title}
                                          onChange={(e) => handleLessonTitleChange(module.id, lesson.id, e.target.value)}
                                          className="text-sm h-8 w-48"
                                          placeholder="Lesson title"
                                        />
                                      </div>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveLesson(module.id, lesson.id)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    
                                    {lesson.type === 'text' ? (
                                      <Textarea
                                        value={lesson.content}
                                        onChange={(e) => handleLessonContentChange(module.id, lesson.id, e.target.value)}
                                        placeholder="Enter lesson text content"
                                        className="min-h-24"
                                      />
                                    ) : lesson.type === 'image' ? (
                                      <div className="mt-2">
                                        <img
                                          src={lesson.content}
                                          alt="Lesson image"
                                          className="max-h-32 rounded-md"
                                        />
                                      </div>
                                    ) : (
                                      <div className="mt-2">
                                        <video
                                          src={lesson.content}
                                          controls
                                          className="max-h-32 rounded-md"
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => navigate('/admin')}
                  className="mr-4"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-saffron hover:bg-saffron/90"
                >
                  Update Course
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseEdit;
