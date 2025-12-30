import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLinks } from "../hooks/useLinks";
import { useProfile } from "../hooks/useProfile";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import { PhonePreview } from "../components/preview/PhonePreview";
import { ProfileForm } from "../components/profile/ProfileForm";
import { Toast } from "../components/ui/Toast";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { links } = useLinks();
  const [showToast, setShowToast] = useState(false);
  const profile = useProfile(user);

  const handleImageChange = (file: File, preview: string) => {
    profile.setAvatarFile(file);
    profile.setAvatarPreview(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let avatarBase64: string | undefined;
    
    if (profile.avatarFile) {
      avatarBase64 = await fileToBase64(profile.avatarFile);
    }

    profile.updateProfile.mutate(
      {
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        email: profile.email.trim(),
        avatarBase64,
      },
      {
        onSuccess: () => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        },
      }
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <DashboardHeader userId={user.id} activeTab="profile" />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-8 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="hidden lg:flex lg:col-span-2 justify-center sticky mt-8 shadow-sm border border-border-default rounded-xl" style={{ top: "112px" }}>
            <PhonePreview
              links={links}
              profile={{
                imageUrl: profile.avatarPreview,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
              }}
            />
          </div>
          <div className="lg:col-span-3 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border-default">
            <ProfileForm
              user={user}
              firstName={profile.firstName}
              lastName={profile.lastName}
              email={profile.email}
              avatarPreview={profile.avatarPreview}
              onFirstNameChange={profile.setFirstName}
              onLastNameChange={profile.setLastName}
              onEmailChange={profile.setEmail}
              onImageChange={handleImageChange}
              onSubmit={handleSubmit}
              isPending={profile.updateProfile.isPending}
              hasChanges={profile.hasChanges}
            />
          </div>
        </div>
      </main>

      <Toast message="Your changes have been successfully saved!" visible={showToast} />
    </div>
  );
}
