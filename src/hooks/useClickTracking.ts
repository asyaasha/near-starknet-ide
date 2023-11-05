import { useCallback, useEffect } from 'react';

export function useClickTracking() {
  const onClickEvent = useCallback((event: PointerEvent) => {
    switch (event.pointerType) {
      case 'touch':
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', onClickEvent);

    return () => {
      window.removeEventListener('pointerdown', onClickEvent);
    };
  }, [onClickEvent]);
}
