import { useState, useEffect } from 'react';
import { trpc } from '../lib/trpc';

interface User {
  id: string;
  first_name?: string;
  last_name?: string;
  profile_email?: string;
  image?: string;
}

export function useProfile(user?: User) {
  const utils = trpc.useUtils();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name ?? '');
      setLastName(user.last_name ?? '');
      setEmail(user.profile_email ?? '');
      setAvatarPreview(user.image ?? '');
    }
  }, [user]);

  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: (data) => {
      utils.user.me.setData(undefined, data);
      setAvatarFile(null);
    },
  });

  const hasChanges =
    firstName !== (user?.first_name ?? '') ||
    lastName !== (user?.last_name ?? '') ||
    email !== (user?.profile_email ?? '') ||
    avatarFile !== null;

  return {
    firstName,
    lastName,
    email,
    avatarFile,
    avatarPreview,
    setFirstName,
    setLastName,
    setEmail,
    setAvatarFile,
    setAvatarPreview,
    updateProfile,
    hasChanges,
  };
}
