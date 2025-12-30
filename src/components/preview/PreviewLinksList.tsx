import { getPlatformInfo } from "../../constants/platforms";

interface Link {
  id: number;
  platform: string;
  url: string;
}

interface PreviewLinksListProps {
  links: Link[];
}

export function PreviewLinksList({ links }: PreviewLinksListProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 w-full space-y-4">
      {links.map((link) => {
        const platformInfo = getPlatformInfo(link.platform);
        
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: platformInfo.color }}
            className="flex items-center justify-between px-4 py-3 rounded-lg text-white min-h-[44px] hover:opacity-90 transition group"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {platformInfo.icon && (
                <img 
                  src={platformInfo.icon} 
                  alt="" 
                  className="w-5 h-5 flex-shrink-0 brightness-0 invert" 
                />
              )}
              <span className="text-sm font-medium truncate">
                {platformInfo.label}
              </span>
            </div>
            <img 
              src="/assets/images/icon-arrow-right.svg" 
              alt="" 
              className="w-4 h-4 flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" 
            />
          </a>
        );
      })}
    </div>
  );
}
