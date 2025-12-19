import { AlertCircle } from 'lucide-react';

interface ErrorLabelProps {
  message: string;
}

export const ErrorLabel = ({ message }: ErrorLabelProps) => {
  return (
    <div className="flex items-center gap-2 p-3 rounded-md bg-error/10 border border-error/30 text-error text-sm">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};
