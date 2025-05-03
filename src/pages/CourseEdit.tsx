
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course } from './Courses';
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

// Define a module structure that aligns with both our form and the Course type
interface ModuleContent {
  text?: string;
  videoUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
}

interface CourseModuleInternal {
  id: string;
  title: string;
  description: string;
  content: ModuleContent;
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
          const internalModules = foundCourse.modules?.map(module => ({
            id: module.id,
            title: module.title,
            description: module.description || '', // Default to empty string if missing
            content: {
              text: module.content?.text || '',
              videoUrl: module.content?.videoUrl || '',
              imageUrl: module.content?.imageUrl || '',
              pdfUrl: module.content?.pdfUrl || '',
            }
          })) || [];
          
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
      description: "",
      content: {}
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

  // Handle file upload for a module
  const handleFileUpload = (
    moduleId: string, 
    type: 'image' | 'video' | 'pdf',
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        setModules(modules.map(module => {
          if (module.id === moduleId) {
            const updatedContent = { ...module.content };
            
            switch (type) {
              case 'image':
                updatedContent.imageUrl = result;
                break;
              case 'video':
                updatedContent.videoUrl = result;
                break;
              case 'pdf':
                updatedContent.pdfUrl = result;
                break;
            }
            
            return {
              ...module,
              content: updatedContent,
            };
          }
          return module;
        }));
      };
      
      if (type === 'pdf') {
        // Store PDF filename since we can't really preview it
        const updatedModules = modules.map(module => {
          if (module.id === moduleId) {
            return {
              ...module,
              content: {
                ...module.content,
                pdfUrl: file.name, // Just store the file name for UI purposes
              }
            };
          }
          return module;
        });
        setModules(updatedModules);
      } else {
        // Read image/video as data URL
        reader.readAsDataURL(file);
      }
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}`);
    }
  };

  // Update module text content
  const handleTextContentChange = (moduleId: string, text: string) => {
    setModules(
      modules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              content: {
                ...module.content,
                text,
              },
            }
          : module
      )
    );
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
        module => !module.title || !module.description
      );
      
      if (incompleteModule) {
        toast.error("Please complete all module titles and descriptions");
        return;
      }

      // Get existing courses
      const storedCourses = localStorage.getItem('courses');
      const courses: Course[] = storedCourses ? JSON.parse(storedCourses) : [];
      
      // Convert our internal modules format to Course modules format
      const courseModules = modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        content: module.content,
        lessons: [] // Add empty lessons array to satisfy CourseModule type
      }));
      
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`module-title-${module.id}`}>Module Title</Label>
                              <Input
                                id={`module-title-${module.id}`}
                                value={module.title}
                                onChange={(e) => handleModuleChange(module.id, 'title', e.target.value)}
                                placeholder="Enter module title"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`module-desc-${module.id}`}>Module Description</Label>
                              <Input
                                id={`module-desc-${module.id}`}
                                value={module.description}
                                onChange={(e) => handleModuleChange(module.id, 'description', e.target.value)}
                                placeholder="Enter module description"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor={`module-content-${module.id}`}>Module Content</Label>
                            <Textarea
                              id={`module-content-${module.id}`}
                              value={module.content.text || ""}
                              onChange={(e) => handleTextContentChange(module.id, e.target.value)}
                              placeholder="Enter module content text"
                              className="min-h-24"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <Label htmlFor={`module-video-${module.id}`}>Upload Video</Label>
                              <div className="mt-2 flex items-center">
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
                                  onClick={() => document.getElementById(`module-video-${module.id}`)?.click()}
                                  className="w-full"
                                >
                                  <UploadIcon className="mr-2 h-4 w-4" />
                                  {module.content.videoUrl ? "Change Video" : "Upload Video"}
                                </Button>
                              </div>
                              {module.content.videoUrl && (
                                <div className="mt-2">
                                  <video 
                                    src={module.content.videoUrl} 
                                    controls 
                                    className="max-h-32 mt-2 rounded-md"
                                  />
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Label htmlFor={`module-image-${module.id}`}>Upload Image</Label>
                              <div className="mt-2 flex items-center">
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
                                  onClick={() => document.getElementById(`module-image-${module.id}`)?.click()}
                                  className="w-full"
                                >
                                  <UploadIcon className="mr-2 h-4 w-4" />
                                  {module.content.imageUrl ? "Change Image" : "Upload Image"}
                                </Button>
                              </div>
                              {module.content.imageUrl && (
                                <div className="mt-2">
                                  <img 
                                    src={module.content.imageUrl} 
                                    alt="Module image" 
                                    className="max-h-32 mt-2 rounded-md"
                                  />
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <Label htmlFor={`module-pdf-${module.id}`}>Upload PDF</Label>
                              <div className="mt-2 flex items-center">
                                <Input
                                  id={`module-pdf-${module.id}`}
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => handleFileUpload(module.id, 'pdf', e)}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById(`module-pdf-${module.id}`)?.click()}
                                  className="w-full"
                                >
                                  <UploadIcon className="mr-2 h-4 w-4" />
                                  {module.content.pdfUrl ? "Change PDF" : "Upload PDF"}
                                </Button>
                              </div>
                              {module.content.pdfUrl && (
                                <div className="mt-2 text-sm text-gray-600">
                                  File: {module.content.pdfUrl}
                                </div>
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
