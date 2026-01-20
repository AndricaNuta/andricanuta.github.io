import { useCallback, useEffect, useRef, useState } from "react"
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
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    
    // Check if view transitions are supported
    if (document.startViewTransition) {
      await document.startViewTransition(() => {
        flushSync(() => {
          setIsDark(newTheme === "dark")
          setTheme(newTheme)
        })
      }).ready

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } else {
      // Fallback for browsers without view transitions
      setIsDark(newTheme === "dark")
      setTheme(newTheme)
    }
  }, [resolvedTheme, setTheme, duration])

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(className)}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
