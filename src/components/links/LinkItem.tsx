import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getPlatformInfo } from "../../constants/platforms";
import { Dropdown } from "../ui/Dropdown";
import { Input } from "../ui/Input";

interface LinkItemProps {
  link: {
    id: number;
    platform: string;
    url: string;
  };
  index: number;
  onUpdate: (id: number, platform: string, url: string) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const PLATFORMS = [
  { value: "github", label: "GitHub", icon: "/assets/images/icon-github.svg" },
  { value: "youtube", label: "YouTube", icon: "/assets/images/icon-youtube.svg" },
  { value: "linkedin", label: "LinkedIn", icon: "/assets/images/icon-linkedin.svg" },
  { value: "twitter", label: "Twitter", icon: "/assets/images/icon-twitter.svg" },
  { value: "facebook", label: "Facebook", icon: "/assets/images/icon-facebook.svg" },
  { value: "twitch", label: "Twitch", icon: "/assets/images/icon-twitch.svg" },
  { value: "devto", label: "Dev.to", icon: "/assets/images/icon-devto.svg" },
  { value: "codewars", label: "Codewars", icon: "/assets/images/icon-codewars.svg" },
  { value: "codepen", label: "CodePen", icon: "/assets/images/icon-codepen.svg" },
  { value: "freecodecamp", label: "freeCodeCamp", icon: "/assets/images/icon-freecodecamp.svg" },
  { value: "gitlab", label: "GitLab", icon: "/assets/images/icon-gitlab.svg" },
  { value: "hashnode", label: "Hashnode", icon: "/assets/images/icon-hashnode.svg" },
  { value: "stackoverflow", label: "Stack Overflow", icon: "/assets/images/icon-stackoverflow.svg" },
  { value: "frontendmentor", label: "Frontend Mentor", icon: "/assets/images/icon-frontend-mentor.svg" },
];

export function LinkItem({ link, index, onUpdate, onDelete, isUpdating, isDeleting }: LinkItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPlatform, setEditPlatform] = useState(link.platform);
  const [editUrl, setEditUrl] = useState(link.url);
  const [urlError, setUrlError] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const platformInfo = getPlatformInfo(link.platform);

  const handleEdit = () => {
    setIsEditing(true);
    setEditPlatform(link.platform);
    setEditUrl(link.url);
    setUrlError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditPlatform(link.platform);
    setEditUrl(link.url);
    setUrlError("");
  };

  const handleSave = () => {
    if (!editUrl.trim()) {
      setUrlError("Can't be empty");
      return;
    }

    try {
      new URL(editUrl);
    } catch {
      setUrlError("Please enter a valid URL");
      return;
    }

    if (editPlatform !== link.platform || editUrl !== link.url) {
      onUpdate(link.id, editPlatform, editUrl);
    }
    
    setIsEditing(false);
    setUrlError("");
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-bg-light rounded-lg p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing touch-none focus:outline-none"
          >
            <svg width="12" height="6" viewBox="0 0 12 6" className="text-text-gray">
              <path fill="currentColor" d="M0 0h12v1H0zM0 5h12v1H0z"/>
            </svg>
          </button>
          <span className="text-sm font-semibold text-text-gray">Link #{index + 1}</span>
        </div>
        <button
          onClick={() => onDelete(link.id)}
          disabled={isDeleting}
          className="text-text-gray hover:text-error text-sm font-regular transition-all disabled:opacity-50 focus:outline-none focus:shadow-[2px_2px_10px_3px_#BEADFF]"
        >
          Remove
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <Dropdown label="Platform" value={editPlatform} options={PLATFORMS} onChange={setEditPlatform} />

          <Input
            label="Link"
            type="url"
            value={editUrl}
            onChange={(value) => {
              setEditUrl(value);
              setUrlError("");
            }}
            placeholder="e.g. https://github.com/username"
            error={urlError}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            }
          />

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-border-default text-text-gray text-sm font-semibold hover:bg-bg-light transition-all focus:outline-none focus:shadow-[2px_2px_10px_3px_#BEADFF]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isUpdating}
              className="px-4 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 focus:outline-none focus:shadow-[2px_2px_10px_3px_#BEADFF]"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div onClick={handleEdit} className="flex items-center justify-between cursor-pointer hover:bg-white p-3 rounded-md transition">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {platformInfo.icon && <img src={platformInfo.icon} alt="" className="w-4 h-4 flex-shrink-0" />}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-dark truncate">{platformInfo.label}</p>
              <p className="text-xs text-text-gray truncate">{link.url}</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-text-gray flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
