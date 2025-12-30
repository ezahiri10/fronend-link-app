interface ProfileInfoProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

function getDisplayName(firstName?: string, lastName?: string): string {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName || lastName || "";
}

export function ProfileInfo({ firstName, lastName, email }: ProfileInfoProps) {
  const displayName = getDisplayName(firstName, lastName);
  const hasEmail = email && email.trim() !== "";

  return (
    <div className="mt-6 text-center space-y-2">
      {displayName && (
        <h1 className="text-2xl sm:text-3xl font-bold text-[#333333]">
          {displayName}
        </h1>
      )}
      
      {hasEmail && (
        <p className="text-sm sm:text-base text-[#737373]">
          {email}
        </p>
      )}
    </div>
  );
}
