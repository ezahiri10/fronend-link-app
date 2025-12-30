interface ClipboardToastProps {
  visible: boolean;
}

export function ClipboardToast({ visible }: ClipboardToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-[#333333] text-white px-6 py-4 rounded-xl flex items-center gap-2 shadow-lg">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M8.91 14.49L5.42 11L4 12.42L8.91 17.33L18 8.24L16.58 6.82L8.91 14.49Z"
            fill="white"
          />
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap">
          The link has been copied to your clipboard!
        </span>
      </div>
    </div>
  );
}
