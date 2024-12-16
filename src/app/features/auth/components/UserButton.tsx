'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard, Crown, Loader, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { usePaywall } from '../../subscription/hooks/use-paywall';

export const UserButton = () => {
  const { shouldBlock, isLoading } = usePaywall();
  const session = useSession();

  if (session.status === 'loading') {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === 'unauthenticated' || !session.data) {
    return null;
  }

  const name = session.data?.user?.name!;
  const imageUrl = session.data?.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && !isLoading && (
          <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-sm">
              <Crown className="size-3 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        )}
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={imageUrl || ''} />
          <AvatarFallback className="bg-blue-500 font-medium text-white">
            {name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-60">
        <DropdownMenuItem disabled={false} onClick={() => {}} className="h-10">
          <CreditCard className="mr-2 h-4 w-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={false}
          onClick={() => signOut()}
          className="h-10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
