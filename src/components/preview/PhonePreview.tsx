import { getPlatformInfo } from "../../constants/platforms";

interface Link {
  id: number;
  platform: string;
  url: string;
}

interface PhonePreviewProps {
  links: Link[];
  profile?: {
    imageUrl?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

function clampText(text?: string, max = 30) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function getDisplayName(firstName?: string, lastName?: string) {
  return [firstName, lastName].filter(Boolean).join(" ");
}

export function PhonePreview({ links, profile }: PhonePreviewProps) {
  const displayName = getDisplayName(profile?.firstName, profile?.lastName);
  const hasName = Boolean(displayName);
  const hasEmail = Boolean(profile?.email);

  const hasImage =
    profile?.imageUrl &&
    profile.imageUrl.trim() !== "" &&
    profile.imageUrl !== "https://via.placeholder.com/500";

  const initials = displayName
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div
      className="hidden lg:flex lg:col-span-2 justify-center sticky mt-8"
      style={{ top: "112px" }}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md flex justify-center">
        <div className="relative">
          <img
            src="/assets/images/illustration-phone-mockup.svg"
            alt="Phone preview"
            className="w-full max-w-[307px]"
          />

          {/* ---------- overlay ---------- */}
          <div className="absolute inset-0 flex flex-col items-center px-[35px] pt-[60px]">

            {/* ================= IDENTITY BLOCK (FIXED HEIGHT) ================= */}
            <div className="flex flex-col items-center w-full max-w-[237px] h-[210px]">

              {/* Avatar */}
              {hasImage ? (
                <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={profile!.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : initials ? (
                <div className="w-24 h-24 rounded-full bg-primary-soft flex items-center justify-center">
                  <span className="text-3xl font-semibold text-primary">
                    {initials}
                  </span>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary-soft" />
              )}

              {/* Name */}
              {hasName && (
                <div className="mt-1.5 w-full">
                  <div className="bg-white px-6 py-2 rounded-xl shadow-sm">
                    <h2
                      className="text-lg font-semibold text-text-dark truncate text-center whitespace-nowrap"
                      title={displayName}
                    >
                      {clampText(displayName, 30)}
                    </h2>
                  </div>
                </div>
              )}

              {/* Email */}
              {hasEmail && (
                <div className=" w-full">
                  <div className="bg-white px-6 py-2 rounded-lg shadow-sm">
                    <p
                      className="text-sm text-text-gray truncate text-center whitespace-nowrap"
                      title={profile!.email}
                    >
                      {clampText(profile!.email, 32)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* ================= END IDENTITY BLOCK ================= */}

            {/* ================= LINKS (NEVER MOVE) ================= */}
            <div className="w-full max-w-[237px] space-y-5 mt-1">
              {links.slice(0, 5).map((link) => {
                const platform = getPlatformInfo(link.platform);
                return (
                  <div
                    key={link.id}
                    style={{ backgroundColor: platform.color }}
                    className="rounded-lg px-4 py-3 flex items-center justify-between text-white min-h-[44px]"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {platform.icon && (
                        <img
                          src={platform.icon}
                          alt=""
                          className="w-4 h-4 brightness-0 invert"
                        />
                      )}
                      <span className="text-xs font-medium truncate">
                        {platform.label}
                      </span>
                    </div>

                    <img
                      src="/assets/images/icon-arrow-right.svg"
                      alt=""
                      className="w-3 h-3"
                    />
                  </div>
                );
              })}
            </div>
            {/* ================= END LINKS ================= */}

          </div>
        </div>
      </div>
    </div>
  );
}
