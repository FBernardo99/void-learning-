import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
export function usePageAnimation(
  pageRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const elements = page.querySelectorAll("[data-animate]");

    gsap.fromTo(
      elements,
      { opacity: 0, x: -60 },
  {
    opacity: 1,
    x: 0,
    duration: 0.7,
    stagger: 0.1,
    clearProps: "all",
  }
);
  }, [pageRef]);
}
