interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  type = "text",
  icon,
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label
          className={`text-xs font-normal block ${
            error ? "text-error" : "text-dark-text"
          }`}
        >
          {label}
          {required && <span className="text-error">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full rounded-lg border bg-white
            text-sm font-normal text-dark-text placeholder:text-gray-text
            transition-all duration-150
            ${icon ? "pl-11" : "pl-4"}
            ${error ? "pr-32" : "pr-4"}
            py-3

            ${
              error
                ? "border-error focus:border-error"
                : "border-border-gray focus:border-primary focus:shadow-[2px_2px_10px_3px_#BEADFF]"
            }

            focus:outline-none
            ${!error ? "focus:shadow-[#633CFF_0px_0px_0px_1px]" : ""}
          `}
        />

        {error && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-error">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
