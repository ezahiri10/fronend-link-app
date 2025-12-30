import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { trpc } from "../lib/trpc";
import { PreviewHeader } from "../components/preview/PreviewHeader";
import { PreviewCard } from "../components/preview/PreviewCard";
import { ClipboardToast } from "../components/ui/ClipboardToast";

export default function PreviewPage() {
  const { userId } = useParams({ from: "/preview/$userId" });
  const [showToast, setShowToast] = useState(false);

  const { data: user } = trpc.user.getUserById.useQuery({ userId }, { enabled: !!userId });
  const { data: links = [] } = trpc.links.getByUserId.useQuery({ userId }, { enabled: !!userId });

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <p className="text-text-gray">Loading preview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <PreviewHeader onShareLink={handleShareLink} />
      <div className="bg-primary h-[280px] sm:h-[320px] rounded-b-[32px]" />
      <div className="relative -mt-[200px] sm:-mt-[240px] px-4 pb-12">
        <PreviewCard
          firstName={user.first_name}
          lastName={user.last_name}
          email={user.profile_email}
          imageUrl={user.image}
          links={links}
        />
      </div>
      <ClipboardToast visible={showToast} />
    </div>
  );
}
