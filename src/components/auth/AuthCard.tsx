
import { ReactNode } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
}

const AuthCard = ({ 
  title, 
  description, 
  footer, 
  children 
}: AuthCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-maroon">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex flex-col items-center text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthCard;
