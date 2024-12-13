import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { protectServer } from './features/auth/utils';
export default async function Home() {
  await protectServer();
  return <div>You are logged in</div>;
}
