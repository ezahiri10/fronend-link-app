import { useState } from "react";
import { PLATFORMS } from "../../constants/platforms";
import { Dropdown } from "../ui/Dropdown";

interface AddLinkFormProps {
  linkNumber: number;
  onSubmit: (platform: string, url: string) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function AddLinkForm({ linkNumber, onSubmit, onCancel, isPending }: AddLinkFormProps) {
  const [platform, setPlatform] = useState("github");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [platformError, setPlatformError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");
    setPlatformError("");
    
    let hasError = false;
    
    if (!platform) {
      setPlatformError("Can't be empty");
      hasError = true;
    }
    
    if (!url) {
      setUrlError("Can't be empty");
      hasError = true;
    } else {
      try {
        new URL(url);
      } catch {
        setUrlError("Please check the URL");
        hasError = true;
      }
    }
    
    if (hasError) return;
    
    onSubmit(platform, url);
  };

  return (
    <div className="bg-[#FAFAFA] rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700 font-bold flex items-center gap-2">
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M1 1h10M1 5h10" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Link #{linkNumber}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#FFFFFF] text-[#737373] hover:text-red-500 text-sm font-medium px-3 py-1.5 transition"
        >
          Remove
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Platform Dropdown */}
        <Dropdown
          label="Platform"
          value={platform}
          options={PLATFORMS.map((p) => ({
            value: p.value,
            label: p.label,
            icon: p.icon,
          }))}
          error={platformError}
          onChange={(value) => {
            setPlatform(value);
            setPlatformError("");
          }}
        />

        {/* URL Input */}
        <div>
          <label className="text-xs text-[#333333] mb-1 block">Link</label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <input
              type="url"
              placeholder="e.g. https://github.com/username"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setUrlError("");
              }}
              className={`w-full rounded-md border focus:shadow-[2px_2px_10px_3px_#BEADFF]  ${
                urlError
                  ? "border-error focus:shadow-focus"
                  : "border-border-default  focus:border-primary"
              } pl-10 pr-4 py-3 text-sm font-regular text-text-dark placeholder:text-text-gray focus:outline-none transition-all bg-white`}
            />
            {urlError && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#FF3939]">
                {urlError}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-primary text-primary py-2 rounded-md text-sm font-semibold hover:bg-primary-soft transition-all focus:outline-none focus:shadow-[2px_2px_10px_3px_#BEADFF]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-primary text-white py-2 rounded-md text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all focus:outline-none focus:shadow-[2px_2px_10px_3px_#BEADFF]"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
