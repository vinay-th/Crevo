import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { protectServer } from '@/app/features/auth/utils';
export default async function Home() {
  await protectServer();
  const session = await auth();
  return <div>You are logged in {JSON.stringify(session)}</div>;
}
