import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ShapeToolProps {
  icon: IconType | LucideIcon;
  iconClassName?: string;
  onClick: () => void;
}

export const ShapeTool = ({
  icon: Icon,
  iconClassName,
  onClick,
}: ShapeToolProps) => {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <Icon className={cn('h-full w-full', iconClassName)} />
    </button>
  );
};
