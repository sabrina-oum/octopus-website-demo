"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  className?: string;
  children: ReactNode;
};

export function Reveal({ className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // "pending" until this script runs. If it never runs, the CSS shows the content after 3 s.
  const [state, setState] = useState<"pending" | "hidden" | "shown">("pending");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setState("shown");
        observer.disconnect();
      } else {
        setState("hidden");
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={state} className={className}>
      {children}
    </div>
  );
}
