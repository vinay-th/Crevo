import { useSubscriptionModal } from '../store/use-subscription-modal';

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = true; // TODO: Check if user is subscribed

  return {
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
