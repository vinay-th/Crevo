import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="w-[73px] h-[52px] relative shrink-0">
        <Image
          src="/images/logo.png"
          alt="Crevo Logo"
          sizes="73px x 52px"
          priority
          fill
          className="shrink-0 hover:opacity-75 transition"
        />
      </div>
    </Link>
  );
};
