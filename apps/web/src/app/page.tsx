import { Header } from '@/components/common/Header';

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex items-center flex-col p-10 gap-3">
        <h1 className="text-4xl flex gap-2 items-center">Game Advisor</h1>
      </div>
    </>
  );
}
