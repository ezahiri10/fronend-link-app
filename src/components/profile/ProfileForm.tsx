import { useState } from "react";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { ProfileInputs } from "./ProfileInputs";
import { Button } from "../ui/Button";

interface ProfileFormProps {
  user: {
    first_name?: string;
    last_name?: string;
    email?: string;
    avatar_url?: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  avatarPreview: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onImageChange: (file: File, preview: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  hasChanges: boolean;
}

export function ProfileForm({ 
  firstName,
  lastName,
  email,
  avatarPreview,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onImageChange,
  onSubmit,
  isPending,
  hasChanges
}: ProfileFormProps) {
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { firstName?: string; lastName?: string } = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = "Can't be empty";
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = "Can't be empty";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full pt-20">
      <div className="flex-1 space-y-6">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333333]">Profile Details</h1>
          <p className="text-sm text-[#737373] mt-2">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <ProfileImageUpload 
          imageUrl={avatarPreview} 
          onImageChange={handleImageChange} 
        />

        <ProfileInputs
          firstName={firstName}
          lastName={lastName}
          email={email}
          onFirstNameChange={(value) => {
            onFirstNameChange(value);
            if (errors.firstName) setErrors({ ...errors, firstName: undefined });
          }}
          onLastNameChange={(value) => {
            onLastNameChange(value);
            if (errors.lastName) setErrors({ ...errors, lastName: undefined });
          }}
          onEmailChange={onEmailChange}
          errors={errors}
        />
      </div>

      <div className="mt-6 pt-6 border-t border-border-default flex justify-end">
        <div className="w-full sm:w-auto">
          <Button
            type="submit"
            disabled={!hasChanges || isPending}
            fullWidth={true}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
