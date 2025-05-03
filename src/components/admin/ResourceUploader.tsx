
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileIcon, FileTextIcon, FileVideoIcon, ImageIcon, UploadIcon } from "lucide-react";
import { toast } from "sonner";

interface ResourceUploaderProps {
  onFileUploaded: (fileUrl: string, fileName: string, fileType: string) => void;
  acceptedTypes?: string;
  fileType?: 'video' | 'image' | 'pdf' | 'text';
}

const ResourceUploader = ({ onFileUploaded, acceptedTypes, fileType = 'pdf' }: ResourceUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real application, this would be an actual file upload to a server
      // For now, we'll simulate the upload with a timeout and return a mock URL
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock URL for the uploaded file
      const mockUrl = `/lovable-uploads/${selectedFile.name.replace(/\s+/g, '-')}`;
      const fileName = selectedFile.name;
      const detectedType = getFileType(selectedFile.type);
      
      onFileUploaded(mockUrl, fileName, detectedType);
      toast.success("File uploaded successfully");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload file");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const getFileType = (mimeType: string): string => {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.startsWith('text/') || mimeType === 'application/msword' || 
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'text';
    }
    return 'other';
  };
  
  const getFileIcon = () => {
    switch (fileType) {
      case 'video':
        return <FileVideoIcon className="h-12 w-12 text-blue-500" />;
      case 'image':
        return <ImageIcon className="h-12 w-12 text-purple-500" />;
      case 'pdf':
        return <FileTextIcon className="h-12 w-12 text-red-500" />;
      case 'text':
        return <FileTextIcon className="h-12 w-12 text-green-500" />;
      default:
        return <FileIcon className="h-12 w-12 text-gray-500" />;
    }
  };
  
  const getFileTypeLabel = () => {
    switch (fileType) {
      case 'video':
        return "Video";
      case 'image':
        return "Image";
      case 'pdf':
        return "PDF";
      case 'text':
        return "Document";
      default:
        return "File";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          {getFileIcon()}
          <span className="ml-2">{getFileTypeLabel()} Upload</span>
        </CardTitle>
        <CardDescription>
          Upload {fileType === 'text' ? 'documents' : `${fileType} files`} for your course content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {selectedFile ? (
              <div className="space-y-2">
                <FileIcon className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadIcon className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-sm text-gray-500">
                  Drag and drop or click to upload
                </p>
              </div>
            )}
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              accept={acceptedTypes}
              onChange={handleFileChange}
            />
            <Label
              htmlFor="file-upload"
              className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
            >
              Select File
            </Label>
          </div>
          
          <Button 
            className="w-full"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUploader;
