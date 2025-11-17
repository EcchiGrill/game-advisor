'use client';

import { toast } from 'react-toastify';
import { LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Page() {
  return (
    <div className="flex items-center flex-col p-10 gap-3">
      <h1 className="text-4xl flex gap-2 items-center ">
        <LayoutTemplate className="h-8 w-8 mt-1" />
        Game Advisor
      </h1>
      <Button onClick={() => toast.info('Click!')} size="lg">
        Click!
      </Button>
    </div>
  );
}
