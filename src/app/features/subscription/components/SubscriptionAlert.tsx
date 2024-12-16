'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useFailModal } from '@/app/features/subscription/store/use-failed-modal';
import { useSuccessModal } from '@/app/features/subscription/store/use-success-modal';

export const SubscriptionAlert = () => {
  const params = useSearchParams();

  const { onOpen: onOpenFail } = useFailModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();

  const canceled = params.get('canceled');
  const success = params.get('success');

  useEffect(() => {
    if (canceled) {
      onOpenFail();
    }

    if (success) {
      onOpenSuccess();
    }
  }, [canceled, onOpenFail, onOpenSuccess, success]);

  return null;
};
