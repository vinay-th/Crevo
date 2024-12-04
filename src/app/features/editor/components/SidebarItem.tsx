import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'w-full h-full aspect-video p-3 py-4 flex flex-col rounded-none',
        isActive && 'bg-muted text-primary'
      )}
    >
      <Icon
        className="stroke-2 shrink-0"
        style={{ width: '1.5rem', height: '1.25rem' }}
      />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};
