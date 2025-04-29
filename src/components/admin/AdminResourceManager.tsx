
import { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, FileTextIcon } from 'lucide-react';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock resources data
const mockResources = [
  {
    id: 1,
    title: 'Introduction to Kriyayoga',
    type: 'pdf',
    category: 'yoga',
    uploadDate: '2025-01-15',
    downloadCount: 156,
    fileSize: '2.4 MB',
    url: '/resources/introduction-to-kriyayoga.pdf'
  },
  {
    id: 2,
    title: 'Meditation Techniques for Beginners',
    type: 'pdf',
    category: 'meditation',
    uploadDate: '2025-02-10',
    downloadCount: 243,
    fileSize: '3.8 MB',
    url: '/resources/meditation-techniques-beginners.pdf'
  },
  {
    id: 3,
    title: 'Bhagavad Gita Study Guide',
    type: 'pdf',
    category: 'scriptures',
    uploadDate: '2025-02-28',
    downloadCount: 187,
    fileSize: '5.1 MB',
    url: '/resources/bhagavad-gita-study-guide.pdf'
  },
  {
    id: 4,
    title: 'Morning Chants Audio',
    type: 'audio',
    category: 'chants',
    uploadDate: '2025-03-05',
    downloadCount: 312,
    fileSize: '12.6 MB',
    url: '/resources/morning-chants.mp3'
  }
];

// Mock blog posts data
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Path of Self-Realization',
    author: 'Swami Parameshwarananda',
    publishDate: '2025-03-15',
    category: 'philosophy',
    views: 1245,
    status: 'published'
  },
  {
    id: 2,
    title: 'Understanding Karma in Daily Life',
    author: 'Dr. Aditi Sharma',
    publishDate: '2025-03-22',
    category: 'lifestyle',
    views: 982,
    status: 'published'
  },
  {
    id: 3,
    title: 'Benefits of Morning Meditation',
    author: 'Yogi Ramdev',
    publishDate: 'n/a',
    category: 'meditation',
    views: 0,
    status: 'draft'
  }
];

const AdminResourceManager = () => {
  const [resources, setResources] = useState(mockResources);
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const handleDeleteBlogPost = (id: number) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  const publishBlogPost = (id: number) => {
    setBlogPosts(blogPosts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          status: 'published',
          publishDate: new Date().toISOString().split('T')[0]
        };
      }
      return post;
    }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="resources">Resources & Downloads</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-maroon">Resources Management</h2>
              <Button className="bg-saffron hover:bg-saffron/90">
                <PlusIcon className="mr-2 h-4 w-4" /> Add Resource
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium flex items-center">
                        <FileTextIcon className="mr-2 h-4 w-4 text-saffron" />
                        {resource.title}
                      </TableCell>
                      <TableCell className="uppercase text-xs">{resource.type}</TableCell>
                      <TableCell>{resource.category}</TableCell>
                      <TableCell>{resource.uploadDate}</TableCell>
                      <TableCell>{resource.downloadCount}</TableCell>
                      <TableCell>{resource.fileSize}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700" 
                            onClick={() => handleDeleteResource(resource.id)}
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
          
          <TabsContent value="blog">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-maroon">Blog Post Management</h2>
              <Button className="bg-saffron hover:bg-saffron/90">
                <PlusIcon className="mr-2 h-4 w-4" /> Add Blog Post
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.publishDate}</TableCell>
                      <TableCell>{post.views}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {post.status === 'draft' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-500 hover:text-green-700"
                              onClick={() => publishBlogPost(post.id)}
                            >
                              <CheckIcon className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700" 
                            onClick={() => handleDeleteBlogPost(post.id)}
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminResourceManager;
