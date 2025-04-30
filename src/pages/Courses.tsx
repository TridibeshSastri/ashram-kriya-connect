import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'image';
  content: string;
  duration?: string;
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

export const mockCourses: Course[] = [
  {
    id: 'kriya-basics',
    title: 'Fundamentals of Kriyayoga',
    description: 'Learn the foundational practices and philosophy of Kriyayoga meditation as taught by our lineage.',
    thumbnail: '/lovable-uploads/a2ea3c4d-d4cd-4312-a22a-d688c1c49ec2.png',
    instructor: 'Swami Parameshwarananda',
    duration: '8 hours',
    level: 'Beginner',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Kriyayoga',
        lessons: [
          {
            id: 'lesson-1',
            title: 'What is Kriyayoga?',
            type: 'video',
            content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '15 min'
          },
          {
            id: 'lesson-2',
            title: 'History and Lineage',
            type: 'text',
            content: 'Kriyayoga is an ancient meditation technique that was revived in modern times by Mahavatar Babaji and brought to wider awareness by Paramhansa Yogananda. The practice involves a series of energization, breathing, and meditation techniques designed to accelerate spiritual growth and bring about a direct experience of the Divine.'
          },
          {
            id: 'lesson-3',
            title: 'The Sacred Tradition',
            type: 'image',
            content: '/images/kriya-meditation.jpg'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Preparation Practices',
        lessons: [
          {
            id: 'lesson-4',
            title: 'Proper Meditation Posture',
            type: 'video',
            content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '12 min'
          },
          {
            id: 'lesson-5',
            title: 'Energization Exercises',
            type: 'text',
            content: 'The energization exercises are a unique system of exercises that teach you how to consciously direct energy (prana) to different parts of your body. Regular practice helps develop greater awareness of subtle energy and prepares the body and mind for deeper meditation.'
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-pranayama',
    title: 'Advanced Pranayama Techniques',
    description: 'Deepen your spiritual practice with advanced breathing techniques from the yoga tradition.',
    thumbnail: '/lovable-uploads/a2ea3c4d-d4cd-4312-a22a-d688c1c49ec2.png',
    instructor: 'Dr. Aditi Sharma',
    duration: '6 hours',
    level: 'Advanced',
    modules: [
      {
        id: 'module-1',
        title: 'Understanding Prana',
        lessons: [
          {
            id: 'lesson-1',
            title: 'The Science of Prana',
            type: 'video',
            content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '20 min'
          }
        ]
      }
    ]
  },
  {
    id: 'meditation-daily',
    title: 'Meditation for Daily Life',
    description: 'Practical approaches to integrate meditation into your busy modern lifestyle.',
    thumbnail: '/lovable-uploads/a2ea3c4d-d4cd-4312-a22a-d688c1c49ec2.png',
    instructor: 'Yogi Ramdev',
    duration: '4 hours',
    level: 'Beginner',
    modules: [
      {
        id: 'module-1',
        title: 'Getting Started',
        lessons: [
          {
            id: 'lesson-1',
            title: 'Creating a Sacred Space',
            type: 'video',
            content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '10 min'
          }
        ]
      }
    ]
  }
];

const CourseCard = ({ course }: { course: Course }) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <div className="aspect-video relative overflow-hidden">
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 bg-saffron text-white text-xs px-2 py-1 rounded">
        {course.level}
      </div>
    </div>
    <CardContent className="p-5">
      <h3 className="text-xl font-semibold text-maroon mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{course.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">by {course.instructor}</span>
        <span className="text-gray-500">{course.duration}</span>
      </div>
      <Link 
        to={`/resources/courses/${course.id}`}
        className="mt-4 inline-block bg-saffron hover:bg-saffron/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors w-full text-center"
      >
        View Course
      </Link>
    </CardContent>
  </Card>
);

const CourseList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {mockCourses.map((course) => (
      <CourseCard key={course.id} course={course} />
    ))}
  </div>
);

const Courses = () => {
  return (
    <main>
      <PageHeader 
        title="Spiritual Courses"
        description="Deepen your spiritual practice with our carefully curated courses taught by experienced instructors."
      />
      
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-maroon mb-2">Available Courses</h2>
            <p className="text-gray-600">
              Explore our collection of courses designed to help you deepen your spiritual practice 
              and understanding of ancient wisdom.
            </p>
          </div>

          <CourseList />
        </div>
      </section>
    </main>
  );
};

export default Courses;
