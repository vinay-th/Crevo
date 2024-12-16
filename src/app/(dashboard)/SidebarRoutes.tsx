'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import { usePaywall } from '../features/subscription/hooks/use-paywall';

const SidebarRoutes = () => {
  const { triggerPaywall } = usePaywall();
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <div className="px-4">
        <Button
          className="w-full rounded-xl border-none hover:opacity-75 transition"
          onClick={() => triggerPaywall()}
          variant={'outline'}
          size={'lg'}
        >
          <Crown className="size-4 mr-2 fill-yellow-500 text-yellow-500" />
          Upgrade to Crevo Pro
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          label="Home"
          href="/"
          icon={Home}
          isActive={pathname === '/'}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          label="Billing"
          href="/"
          icon={CreditCard}
          onClick={() => {}}
        />
        <SidebarItem
          label="Support"
          href="mailto:vinaythakor.5025@gmail.com"
          icon={MessageCircleQuestion}
        />
      </ul>
    </div>
  );
};

export default SidebarRoutes;
