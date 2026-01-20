import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className,
      )}
    >
      {children}
  </div>
  );
};

export const BentoCard = ({
  className,
  name,
  description,
  href,
  cta,
  background,
  Icon,
}: {
  className?: string;
  name?: string;
  description?: string;
  href?: string;
  cta?: string;
  background?: React.ReactNode;
  Icon?: React.ElementType;
}) => {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-background p-6 shadow-xl transition-shadow hover:shadow-2xl",
        className,
      )}
    >
      {background}
      <div className="pointer-events-none z-10 flex flex-col gap-1">
        {Icon && <Icon className="h-12 w-12 origin-left transform transition-all duration-300 ease-in-out group-hover:scale-75" />}
        {name && (
          <h3 className="text-xl font-semibold text-foreground">
            {name}
          </h3>
        )}
        {description && (
          <p className="max-w-lg text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {href && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex translate-y-10 transform items-center gap-2 text-sm font-semibold text-foreground opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          {cta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4 -translate-x-2 transform transition-all duration-300 ease-in-out group-hover:translate-x-0"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      )}
      <div className="pointer-events-auto absolute inset-0 z-30" />
    </div>
  );
};
