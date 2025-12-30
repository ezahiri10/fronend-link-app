interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  type = "button", 
  disabled, 
  variant = "primary",
  fullWidth 
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-md font-semibold text-sm transition-all focus:outline-none";
  
  const variantClasses = variant === "primary"
    ? "bg-primary text-white hover:opacity-90 disabled:opacity-50 focus:shadow-[2px_2px_10px_3px_#BEADFF]"
    : "bg-white border border-primary text-primary hover:bg-primary-soft focus:shadow-[2px_2px_10px_3px_#BEADFF]";
  
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${widthClass} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
