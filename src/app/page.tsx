import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
export default async function Home() {
  const session = await auth();
  return <div></div>;
}
