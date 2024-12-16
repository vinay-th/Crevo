'use client';
import { FailModal } from '@/app/features/subscription/components/FailModal';
import { SubscriptionModal } from '@/app/features/subscription/components/SubscriptionModal';
import { useEffect, useState } from 'react';

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <FailModal />
      <SubscriptionModal />
    </>
  );
};
