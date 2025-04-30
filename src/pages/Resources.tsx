
import {
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'image' | 'course';
  link: string;
}

const ResourceCard = ({ title, description, type, link }: ResourceCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'article':
        return <FileText className="w-6 h-6 text-saffron" />;
      case 'video':
        return <FileVideo className="w-6 h-6 text-saffron" />;
      case 'audio':
        return <FileAudio className="w-6 h-6 text-saffron" />;
      case 'image':
        return <FileImage className="w-6 h-6 text-saffron" />;
      case 'course':
        return <BookOpen className="w-6 h-6 text-saffron" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="mt-1">{getIcon()}</div>
        <div>
          <h3 className="text-lg font-semibold text-maroon mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <Link
            to={link}
            className="text-saffron hover:text-maroon transition-colors font-medium"
          >
            Access Resource →
          </Link>
        </div>
      </div>
    </div>
  );
};

const Resources = () => {
  const resources = [
    {
      title: "Introduction to Kriyayoga",
      description: "A comprehensive guide to understanding the principles and practices of Kriyayoga meditation.",
      type: "article" as const,
      link: "/resources/intro-kriyayoga"
    },
    {
      title: "Guided Meditation Sessions",
      description: "Collection of guided meditation sessions by our Guruji for daily practice.",
      type: "audio" as const,
      link: "/resources/guided-meditations"
    },
    {
      title: "Sacred Ceremonies Gallery",
      description: "Photo documentation of important ceremonies and events at our ashram.",
      type: "image" as const,
      link: "/resources/photo-gallery"
    },
    {
      title: "Spiritual Discourses",
      description: "Video recordings of Guruji's discourses on various spiritual topics.",
      type: "video" as const,
      link: "/resources/discourses"
    },
    {
      title: "Spiritual Courses",
      description: "In-depth courses on various aspects of spirituality, meditation, and yoga practices.",
      type: "course" as const,
      link: "/resources/courses"
    },
    {
      title: "Yoga & Pranayama Guide",
      description: "Detailed instructions for various yoga asanas and pranayama techniques.",
      type: "article" as const,
      link: "/resources/yoga-guide"
    },
    {
      title: "Bhajan Recordings",
      description: "Collection of devotional songs and chants performed at the ashram.",
      type: "audio" as const,
      link: "/resources/bhajans"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-maroon mb-4">Spiritual Resources</h1>
          <div className="w-24 h-1 bg-saffron mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Explore our collection of spiritual resources, including articles, audio recordings, videos, and image galleries to deepen your spiritual practice.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-cream rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-maroon mb-4">Stay Updated</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Subscribe to receive updates when new resources are added and stay connected with our spiritual community.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron"
            />
            <button
              type="submit"
              className="bg-saffron hover:bg-saffron/90 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resources;
