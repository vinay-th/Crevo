import { useCallback } from 'react';

export const useEditor = () => {
  const inti = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: any;
      initialContainer: HTMLDivElement;
    }) => {
      console.log('useEditor inti');
    },
    []
  );

  return { inti };
};
