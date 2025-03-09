import { useCallback } from 'react';
import { useActionCreators } from '..';
import { offerActions } from '../../store/slices/offer';

export function useHoverCard(offerId: string, isSupportsHover: boolean | undefined) {
  const { setidFocusCard } = useActionCreators(offerActions);

  const handleMouseEnter = useCallback(() => {
    if (isSupportsHover) {
      setidFocusCard(offerId);
    }
  }, [offerId, isSupportsHover, setidFocusCard]);

  const handleMouseLeave = useCallback(() => {
    if (isSupportsHover) {
      setidFocusCard(null);
    }
  }, [isSupportsHover, setidFocusCard]);


  return {
    handleMouseEnter,
    handleMouseLeave
  };
}
