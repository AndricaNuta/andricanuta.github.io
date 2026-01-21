import { useCallback, useRef, useMemo } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isAnimatingRef = useRef(false)

  // Compute isDark directly from resolvedTheme - no state needed
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme])

  const toggleTheme = useCallback(async () => {
    // Prevent double-clicks and concurrent animations
    if (isAnimatingRef.current || !buttonRef.current) return
    
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    
    // Pre-compute button position before starting transition (avoid layout thrashing)
    const rect = buttonRef.current.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const maxRadius = Math.hypot(
      Math.max(rect.left, window.innerWidth - rect.left),
      Math.max(rect.top, window.innerHeight - rect.top)
    )
    
    // Check if view transitions are supported
    if (document.startViewTransition) {
      isAnimatingRef.current = true
      
      try {
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setTheme(newTheme)
          })
        })

        // Wait for the transition to be ready
        await transition.ready

        // Use requestAnimationFrame to ensure smooth animation start
        requestAnimationFrame(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)", // Material Design easing for smoother feel
              pseudoElement: "::view-transition-new(root)",
            }
          )
        })

        // Reset flag after animation completes
        transition.finished.finally(() => {
          isAnimatingRef.current = false
        })
      } catch (error) {
        // Fallback if transition fails
        isAnimatingRef.current = false
        setTheme(newTheme)
      }
    } else {
      // Fallback for browsers without view transitions
      setTheme(newTheme)
    }
  }, [resolvedTheme, setTheme, duration])

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("relative", className)}
      aria-label="Toggle theme"
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
          isDark ? "opacity-100" : "opacity-0"
        )}
        style={{ willChange: "opacity" }}
      >
        <Sun className="h-5 w-5" />
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
          !isDark ? "opacity-100" : "opacity-0"
        )}
        style={{ willChange: "opacity" }}
      >
        <Moon className="h-5 w-5" />
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
