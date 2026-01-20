"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimals?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimals = 0,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000;
    const startValue = direction === "down" ? value : 0;
    const endValue = value;

    setIsAnimating(true);

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setDisplayValue(currentValue);

      if (progress < 1) {
        intervalRef.current = setTimeout(animate, 16);
      } else {
        setIsAnimating(false);
      }
    };

    const timeoutId = setTimeout(() => {
      animate();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [value, direction, delay]);

  const formatValue = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toString();
  };

  return (
    <span className={cn("tabular-nums", className)}>
      {formatValue(displayValue)}
    </span>
  );
}
