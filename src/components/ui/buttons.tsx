import React from "react";

export const PrimaryButton = ({
  onClick,
  children,
  className = "",
  glow = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center overflow-hidden 
        rounded-md px-5 py-2 text-sm font-semibold tracking-wide 
        bg-primary text-primary-foreground
        transition-colors duration-300 ease-out
        hover:bg-primary/90 active:scale-[0.96] 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        cursor-pointer group
        ${
          glow
            ? "shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
            : "hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        }
        ${className}
      `}
    >
      {/* Camada extra de brilho interno se glow for true */}
      {glow && (
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const GhostButton = ({
  onClick,
  children,
  className = "",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-md px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase 
        border border-primary/40 text-muted-foreground bg-transparent
        transition-all duration-200 ease-in-out
        hover:border-primary/50 hover:text-primary hover:bg-primary/10
        active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const IconButton = ({
  onClick,
  label,
  children,
  className = "",
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        flex items-center justify-center rounded-lg p-2 
        text-muted-foreground bg-transparent
        transition-all duration-200
        hover:text-primary hover:bg-primary/10
        active:scale-90 focus-visible:outline-none
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};
