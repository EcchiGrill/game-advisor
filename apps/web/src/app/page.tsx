'use client';
import { toast } from 'react-toastify';
import { LayoutTemplate } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex items-center flex-col p-10 gap-3">
      <h1 className="text-4xl flex gap-2 items-center">
        <LayoutTemplate className="h-8 w-8 mt-1" />
        Game Advisor
      </h1>
      <button
        type="button"
        className="p-2 px-10 text-lg outline-none rounded-md bg-neutral-200 hover:bg-neutral-300"
        onClick={() => toast.info('Click!')}
      >
        Click!
      </button>
    </div>
  );
}
