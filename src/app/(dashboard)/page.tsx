import { auth } from '@/auth';
import { protectServer } from '@/app/features/auth/utils';
import Banner from './Banner';
import ProjectsSection from './ProjectsSection';
export default async function Home() {
  await protectServer();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <ProjectsSection />
    </div>
  );
}
