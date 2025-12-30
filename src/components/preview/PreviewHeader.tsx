import { useNavigate } from "@tanstack/react-router";

interface PreviewHeaderProps {
  onShareLink: () => void;
}

export function PreviewHeader({ onShareLink }: PreviewHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate({ to: "/dashboard/links" })}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-[#633CFF] text-[#633CFF] font-semibold text-sm sm:text-base hover:bg-[#EFEBFF] transition"
          >
            Back to Editor
          </button>

          <button
            onClick={onShareLink}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#633CFF] text-white font-semibold text-sm sm:text-base hover:opacity-90 transition"
          >
            Share Link
          </button>
        </div>
      </div>
    </header>
  );
}
