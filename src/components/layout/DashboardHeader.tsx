import { Link, useNavigate } from "@tanstack/react-router";
import { signOut } from "../../lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Toast } from "../ui/Toast";

interface DashboardHeaderProps {
  userId?: number;
  activeTab: "links" | "profile";
}

export function DashboardHeader({ userId, activeTab }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState(false);

  const handlePreview = () => {
    if (userId) {
      window.open(`/preview/${userId}`, "_blank");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      queryClient.clear();
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate({ to: "/login" });
      }, 1500);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 lg:h-20 z-50 bg-white border-b border-[#E2E2E2]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 h-full">
        <div className="flex lg:hidden items-center justify-between gap-1.5 sm:gap-2 h-full">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink">
            <img src="/assets/images/logo-devlinks-small.svg" alt="devlinks" className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
          </div>

          <Link 
            to="/dashboard/links" 
            className={`flex items-center gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-md flex-shrink-0 ${
              activeTab === "links" ? "bg-[#EFEBFF] text-[#633CFF]" : "text-[#737373] hover:bg-gray-100"
            }`}
          >
            <img src="/assets/images/icon-link.svg" alt="Links" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ filter: activeTab === "links" ? 'invert(32%) sepia(97%) saturate(7492%) hue-rotate(251deg) brightness(91%) contrast(101%)' : 'none' }} />
          </Link>

          <Link 
            to="/dashboard/profile" 
            className={`group flex items-center gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-md flex-shrink-0 ${
              activeTab === "profile" ? "bg-[#EFEBFF]" : "text-[#737373] hover:bg-gray-100"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-colors ${activeTab === "profile" ? "fill-[#633CFF]" : "fill-[#737373] group-hover:fill-[#633CFF]"}`}>
              <path d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z" />
            </svg>
          </Link>

          <button onClick={handlePreview} className="flex items-center gap-1 bg-white border border-[#633CFF] text-[#633CFF] px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-md hover:bg-[#EFEBFF] active:bg-[#EFEBFF] disabled:border-[#D9D9D9] disabled:text-[#737373] disabled:cursor-not-allowed flex-shrink-0 transition">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M19.61 9.62c-.03-.064-.714-1.583-2.225-3.095-2.023-2.02-4.572-3.088-7.385-3.088-2.812 0-5.362 1.068-7.382 3.088C1.106 8.037.422 9.556.391 9.62a.944.944 0 0 0 0 .761c.029.064.713 1.583 2.226 3.095 2.021 2.02 4.57 3.086 7.383 3.086 2.813 0 5.362-1.067 7.381-3.086 1.513-1.512 2.197-3.03 2.226-3.095a.946.946 0 0 0 .003-.761Zm-3.599 2.578c-1.677 1.651-3.7 2.49-6.01 2.49-2.313 0-4.334-.839-6.01-2.491A10.185 10.185 0 0 1 2.307 10a10.192 10.192 0 0 1 1.686-2.196C5.667 6.15 7.688 5.312 10 5.312s4.333.839 6.009 2.492c.659.652 1.226 1.39 1.685 2.196a10.19 10.19 0 0 1-1.685 2.197h.002Z" fill="currentColor"/>
              <path d="M10 6.875A3.13 3.13 0 0 0 6.875 10 3.13 3.13 0 0 0 10 13.125 3.13 3.13 0 0 0 13.125 10 3.13 3.13 0 0 0 10 6.875Zm0 4.375c-.69 0-1.25-.56-1.25-1.25S9.31 8.75 10 8.75s1.25.56 1.25 1.25-.56 1.25-1.25 1.25Z" fill="currentColor"/>
            </svg>
            <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">Preview</span>
          </button>

          <button onClick={handleLogout} className="flex items-center gap-1 bg-white border border-[#737373] text-[#737373] px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-md hover:bg-gray-100 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 transition">
            <span className="text-sm font-semibold whitespace-nowrap">Logout</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-between h-full">
          <div className="flex items-center gap-2 min-w-0">
            <img src="/assets/images/logo-devlinks-small.svg" alt="devlinks" className="w-8 h-8 flex-shrink-0" />
            <span className="font-semibold text-lg text-[#333333] truncate">devlinks</span>
          </div>

          <nav className="flex gap-2">
            <Link 
              to="/dashboard/links" 
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                activeTab === "links" ? "bg-[#EFEBFF] text-[#633CFF]" : "text-[#737373] hover:bg-gray-100"
              }`}
            >
              <img src="/assets/images/icon-link.svg" alt="Links" className="w-5 h-5 flex-shrink-0" style={{ filter: activeTab === "links" ? 'invert(32%) sepia(97%) saturate(7492%) hue-rotate(251deg) brightness(91%) contrast(101%)' : 'none' }} />
              <span className="text-sm font-semibold">Links</span>
            </Link>

            <Link 
              to="/dashboard/profile" 
              className={`group flex items-center gap-1 px-4 py-2 rounded-lg ${
                activeTab === "profile" ? "bg-[#EFEBFF]" : "text-[#737373] hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" className={`w-5 h-5 flex-shrink-0 transition-colors ${activeTab === "profile" ? "fill-[#633CFF]" : "fill-[#737373] group-hover:fill-[#633CFF]"}`}>
                <path d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z" />
              </svg>
              <span className={`text-sm transition-colors ${activeTab === "profile" ? "text-[#633CFF]" : "text-[#737373] group-hover:text-[#633CFF]"}`}>Profile Details</span>
            </Link>
          </nav>

          <div className="flex gap-2">
            <button onClick={handlePreview} className="flex items-center gap-1 bg-white border border-[#633CFF] text-[#633CFF] px-4 py-2 rounded-lg hover:bg-[#EFEBFF] active:bg-[#EFEBFF] disabled:border-[#D9D9D9] disabled:text-[#737373] disabled:cursor-not-allowed flex-shrink-0 transition">
              <span className="text-sm font-semibold whitespace-nowrap">Preview</span>
            </button>

            <button onClick={handleLogout} className="flex items-center gap-1 bg-white border border-[#737373] text-[#737373] px-4 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 transition">
              <span className="text-sm font-semibold whitespace-nowrap">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <Toast message="You logged out successfully!" visible={showToast} />
    </header>
  );
}
