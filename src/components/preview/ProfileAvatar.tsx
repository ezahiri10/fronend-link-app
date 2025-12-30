interface ProfileAvatarProps {
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
}

function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.charAt(0).toUpperCase() || "";
  const last = lastName?.charAt(0).toUpperCase() || "";
  return first + last;
}

export function ProfileAvatar({ imageUrl, firstName, lastName }: ProfileAvatarProps) {
  const hasImage = imageUrl && imageUrl.trim() !== "" && imageUrl !== "https://via.placeholder.com/500";
  const initials = getInitials(firstName, lastName);

  return (
    <div className="w-24 h-24 rounded-full border-4 border-[#633CFF] overflow-hidden flex items-center justify-center bg-[#EEEBFF]">
      {hasImage ? (
        <img 
          src={imageUrl} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      ) : initials ? (
        <span className="text-3xl font-semibold text-[#633CFF]">
          {initials}
        </span>
      ) : (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
          <path
            d="M20 20c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2.5c-3.34 0-10 1.67-10 5V30h20v-2.5c0-3.33-6.66-5-10-5z"
            fill="#633CFF"
          />
        </svg>
      )}
    </div>
  );
}
