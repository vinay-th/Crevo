import Link from 'next/link';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: '700',
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 hover:opacity-75 h-[68px] px-4 ">
        <div className="size-10 relative">
          <Image
            src="/images/logo-alpha.png"
            alt="Crevo Logo"
            height={400}
            width={400}
          />
        </div>
        <h1 className={cn(font.className, 'absolute text-xl left-10')}>
          Crevo
        </h1>
      </div>
    </Link>
  );
};
