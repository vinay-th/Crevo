import { useSubscriptionModal } from '../store/use-subscription-modal';
import { useGetSubscription } from '../api/use-get-subscription';

export const usePaywall = () => {
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = !subscription?.active;

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
