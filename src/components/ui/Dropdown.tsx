import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

interface DropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Dropdown({
  label,
  value,
  options,
  error,
  disabled = false,
  onChange,
  placeholder = 'Select an option',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className={`block text-xs font-regular mb-1 ${error ? 'text-error' : 'text-text-dark'}`}>
          {label}
        </label>
      )}

      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full h-12 px-4 rounded-md
          flex items-center justify-between
          text-sm font-regular
          transition-all
          focus:shadow-[2px_2px_10px_3px_#BEADFF]
          shadow-sm hover:shadow-md
          ${disabled 
            ? 'bg-bg-light border border-border-default text-text-gray cursor-not-allowed' 
            : error
              ? 'bg-white border border-error focus:shadow-focus'
              : isOpen
                ? 'bg-white border border-primary focus:shadow-focus'
                : 'bg-white border border-border-default hover:border-primary'
          }
        `}
      >
        {/* Left side: Icon + Text */}
        <div className="flex items-center gap-3 min-w-0 flex-1 ">
          {selectedOption?.icon && (
            <img
              src={selectedOption.icon}
              alt=""
              className="w-4 h-4 flex-shrink-0"
            />
          )}
          <span className={selectedOption ? 'text-text-dark' : 'text-text-gray'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        {/* Right side: Chevron */}
        <svg
          className={`w-4 h-4 flex-shrink-0 text-text-gray transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-md border border-border-default max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={`
                  w-full h-12 px-4
                  flex items-center gap-3
                  text-sm font-regular text-left
                  transition-colors
                  ${isSelected
                    ? 'bg-primary-soft text-primary'
                    : 'bg-white text-text-dark hover:bg-bg-light'
                  }
                `}
              >
                {option.icon && (
                  <img
                    src={option.icon}
                    alt=""
                    className="w-4 h-4 flex-shrink-0"
                  />
                )}
                <span className="truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
