'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useFailModal } from '../store/use-failed-modal';

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const FailModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useFailModal();

  const handleClose = () => {
    router.replace('/');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/images/logo.png" alt="Logo" width={55} height={55} />
          <DialogTitle className="text-center">
            Something went wrong
          </DialogTitle>
          <DialogDescription className="text-center">
            We could not process your payment
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button className="w-full" onClick={handleClose}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
