import { useEffect, useState, useRef, useCallback } from "react";

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 1.0
}) => {
  useEffect(() => {
    let observer;
    if(target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root, rootMargin, threshold
      });

      observer.observe(target.current);
    }

    return () => {
      observer && observer.disconnect();
    }
  }, [target, rootMargin, threshold])
}





export const useInfiniteScroll = (targetEl) => {
  const observerRef = useRef(null);
  const [intersecting, setIntersecting] = useState(false);
  // const observer = new IntersectionObserver(entries => setIntersecting(entries.some(entry => entry.isIntersecting)));

  const getObserver = useCallback(() => {
    if(!observerRef.current) {
      observerRef.current = new IntersectionObserver(entries => setIntersecting(entries.some(entry => entry.isIntersecting)));
    }
    return observerRef.current;
  }, [observerRef.current])

  useEffect(() => {
    if(targetEl.current) {
      getObserver().observe(targetEl.current);
    }

    return () => {
      getObserver().disconnect();
    }
  }, [getObserver, targetEl.current]);  
  return intersecting;
}

export default useInfiniteScroll; 