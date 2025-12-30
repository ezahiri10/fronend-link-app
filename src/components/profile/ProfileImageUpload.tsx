import { useState } from "react";
import { Card } from "../ui/Card";

interface ProfileImageUploadProps {
  imageUrl?: string;
  onImageChange: (file: File) => void;
}

export function ProfileImageUpload({ imageUrl, onImageChange }: ProfileImageUploadProps) {
  const [isHovering, setIsHovering] = useState(false);
  const hasImage = imageUrl && imageUrl.trim() !== "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('Image must be below 1024x1024px');
        return;
      }
      
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        alert('Use PNG or JPG format');
        return;
      }
      
      onImageChange(file);
    }
  };

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="text-xs font-semibold text-gray-400 sm:w-[150px] flex-shrink-0">
          Profile picture
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1">
          <label
            className="relative w-[193px] h-[193px] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 border-4 border-[#633CFF]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {hasImage ? (
              <>
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isHovering && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-2">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M33.75 6.25H6.25C5.56 6.25 5 6.81 5 7.5V32.5C5 33.19 5.56 33.75 6.25 33.75H33.75C34.44 33.75 35 33.19 35 32.5V7.5C35 6.81 34.44 6.25 33.75 6.25ZM33.75 32.5H6.25V7.5H33.75V32.5Z" fill="white"/>
                      <path d="M13.75 17.5C15.821 17.5 17.5 15.821 17.5 13.75C17.5 11.679 15.821 10 13.75 10C11.679 10 10 11.679 10 13.75C10 15.821 11.679 17.5 13.75 17.5Z" fill="white"/>
                      <path d="M6.25 30L13.75 21.25L18.75 27.5L25 20L33.75 30H6.25Z" fill="white"/>
                    </svg>
                    <span className="text-white font-semibold text-base">Change Image</span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-[#EFEBFF] flex flex-col items-center justify-center gap-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M33.75 6.25H6.25C5.56 6.25 5 6.81 5 7.5V32.5C5 33.19 5.56 33.75 6.25 33.75H33.75C34.44 33.75 35 33.19 35 32.5V7.5C35 6.81 34.44 6.25 33.75 6.25ZM33.75 32.5H6.25V7.5H33.75V32.5Z" fill="#633CFF"/>
                  <path d="M13.75 17.5C15.821 17.5 17.5 15.821 17.5 13.75C17.5 11.679 15.821 10 13.75 10C11.679 10 10 11.679 10 13.75C10 15.821 11.679 17.5 13.75 17.5Z" fill="#633CFF"/>
                  <path d="M6.25 30L13.75 21.25L18.75 27.5L25 20L33.75 30H6.25Z" fill="#633CFF"/>
                </svg>
                <span className="text-[#633CFF] font-semibold text-base">+ Upload Image</span>
              </div>
            )}
          </label>

          <p className="text-xs text-[#737373]">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </div>
    </Card>
  );
}
