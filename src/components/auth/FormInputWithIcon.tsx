
import { ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputWithIconProps {
  label: string;
  icon: ReactNode;
  placeholder?: string;
  type?: string;
  field: any;
}

const FormInputWithIcon = ({ 
  label, 
  icon, 
  placeholder, 
  type = "text", 
  field 
}: FormInputWithIconProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <div className="absolute left-3 top-2.5">{icon}</div>
          <Input 
            type={type} 
            placeholder={placeholder} 
            className="pl-10" 
            {...field} 
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormInputWithIcon;
