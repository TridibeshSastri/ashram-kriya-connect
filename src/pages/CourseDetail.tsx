
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '../components/PageHeader';

// Import the course types and mock data from Courses.tsx
import { mockCourses } from './Courses';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(mockCourses.find(c => c.id === courseId));

  if (!course) {
    return (
      <main>
        <section className="py-16 bg-gray-50">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold text-maroon mb-6">Course Not Found</h2>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the course you're looking for.
            </p>
            <Link 
              to="/resources/courses"
              className="inline-block bg-saffron hover:bg-saffron/90 text-white px-6 py-2 rounded font-medium transition-colors"
            >
              Back to Courses
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader 
        title={course.title}
        description={course.description}
      />
      
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <Link 
            to="/resources/courses"
            className="mb-6 inline-flex items-center text-saffron hover:text-maroon transition-colors"
          >
            ← Back to All Courses
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-cream text-gray-700 px-3 py-1 rounded-full text-sm">
                  Instructor: {course.instructor}
                </span>
                <span className="bg-cream text-gray-700 px-3 py-1 rounded-full text-sm">
                  Duration: {course.duration}
                </span>
                <span className="bg-cream text-gray-700 px-3 py-1 rounded-full text-sm">
                  Level: {course.level}
                </span>
              </div>
            </div>

            <Tabs defaultValue={course.modules[0].id} className="mt-8">
              <TabsList className="mb-6 overflow-x-auto flex w-full">
                {course.modules.map((module) => (
                  <TabsTrigger key={module.id} value={module.id} className="flex-shrink-0">
                    {module.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {course.modules.map((module) => (
                <TabsContent key={module.id} value={module.id}>
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">{module.title}</h2>
                    
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="border rounded-lg p-5">
                        <h3 className="text-lg font-medium mb-3 text-maroon flex items-center">
                          {lesson.title}
                          {lesson.duration && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                              ({lesson.duration})
                            </span>
                          )}
                        </h3>
                        
                        {lesson.type === 'video' && (
                          <div className="aspect-video">
                            <iframe 
                              className="w-full h-full"
                              src={lesson.content}
                              title={lesson.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        
                        {lesson.type === 'text' && (
                          <div className="prose prose-maroon max-w-none">
                            <p>{lesson.content}</p>
                          </div>
                        )}
                        
                        {lesson.type === 'image' && (
                          <div className="mt-3">
                            <img 
                              src={lesson.content} 
                              alt={lesson.title}
                              className="rounded-md max-h-96 mx-auto"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
