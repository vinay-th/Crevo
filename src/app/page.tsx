import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/editor/test">
        <Button>Click me</Button>
      </Link>
    </div>
  );
}
