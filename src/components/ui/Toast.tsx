interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-text-dark text-white px-6 py-4 rounded-xl flex items-center gap-2 shadow-md">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M16.25 5L7.5 13.75L3.75 10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
}
