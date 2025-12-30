import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileInfo } from "./ProfileInfo";
import { PreviewLinksList } from "./PreviewLinksList";

interface Link {
  id: number;
  platform: string;
  url: string;
}

interface PreviewCardProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
  links: Link[];
}

export function PreviewCard({ firstName, lastName, email, imageUrl, links }: PreviewCardProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-3xl shadow-xl p-8 sm:p-12 w-full max-w-[350px] mx-auto relative z-10">
      <div className="flex flex-col items-center">
        <ProfileAvatar 
          imageUrl={imageUrl} 
          firstName={firstName} 
          lastName={lastName} 
        />
        
        <ProfileInfo 
          firstName={firstName} 
          lastName={lastName} 
          email={email} 
        />
        
        <PreviewLinksList links={links} />
      </div>
    </div>
  );
}
