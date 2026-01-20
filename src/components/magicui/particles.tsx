import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export function Particles({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    if (!context || !canvasRef.current || !canvasContainerRef.current) return;

    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    const circles: Circle[] = [];

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawCircle = (circle: Circle, update = false) => {
      if (context) {
        const { x, y, translateX, translateY, size, alpha } = circle;
        context.save();
        context.translate(translateX, translateY);
        context.beginPath();
        context.arc(x, y, size, 0, 2 * Math.PI);
        // Handle both hex and hsl color formats
        let fillColor = color;
        if (color.startsWith("hsl")) {
          fillColor = color.replace(")", `,${alpha})`).replace("hsl", "hsla");
        } else if (color.startsWith("#")) {
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          fillColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          fillColor = color.replace("rgb", "rgba").replace(")", `,${alpha})`);
        }
        context.fillStyle = fillColor;
        context.fill();
        context.restore();

        if (!update) {
          circle.targetAlpha = parseFloat((Math.random() * 0.5 + 0.1).toFixed(1));
          circle.magnetism = 0.1 + Math.random() * 4;
        }
      }
    };

    const circleParams = (): Circle => {
      const x = Math.floor(Math.random() * canvas.width);
      const y = Math.floor(Math.random() * canvas.height);
      const translateX = 0;
      const translateY = 0;
      const pSize = Math.floor(Math.random() * 2) + size;
      const alpha = 0;
      const targetAlpha = parseFloat((Math.random() * 0.5 + 0.1).toFixed(1));
      const dx = (Math.random() - 0.5) * 0.1;
      const dy = (Math.random() - 0.5) * 0.1;
      const magnetism = 0.1 + Math.random() * 4;
      return {
        x,
        y,
        translateX,
        translateY,
        size: pSize,
        alpha,
        targetAlpha,
        dx,
        dy,
        magnetism,
      };
    };

    for (let i = 0; i < quantity; i++) {
      circles.push(circleParams());
    }

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach((circle, i) => {
        if (circle.alpha < circle.targetAlpha) {
          circle.alpha += 0.01;
        }
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha -= 0.01;
        }
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX +=
          (Math.random() - 0.5) * 0.1 * circle.magnetism;
        circle.translateY +=
          (Math.random() - 0.5) * 0.1 * circle.magnetism;

        if (
          circle.x < 0 ||
          circle.x > canvas.width ||
          circle.y < 0 ||
          circle.y > canvas.height
        ) {
          circles[i] = circleParams();
        }

        drawCircle(circle, true);
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [context, quantity, staticity, ease, size, color, vx, vy, refresh]);

  return (
    <div ref={canvasContainerRef} className={cn("absolute inset-0", className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
