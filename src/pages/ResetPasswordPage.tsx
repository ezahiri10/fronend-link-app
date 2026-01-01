import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { useMutation } from '@tanstack/react-query';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/reset-password' });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [tokenError, setTokenError] = useState("");

  const token = (searchParams as any)?.token;

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ token, newPassword }: { token: string; newPassword: string }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/passwordReset.resetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, newPassword }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Reset failed');
      }
      return response.json();
    },
    onSuccess: () => {
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 2000);
    },
    onError: (error: Error) => {
      console.error('Reset password error:', error);
      if (error.message?.includes('expired') || error.message?.includes('invalid') || error.message?.includes('Invalid')) {
        setTokenError("Reset link has expired or is invalid");
      } else {
        setPasswordError("Failed to reset password");
      }
    },
  });

  useEffect(() => {
    if (!token) {
      setTokenError("Invalid or missing reset token");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!password) {
      setPasswordError("Can't be empty");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("At least 8 characters");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Can't be empty");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      hasError = true;
    }

    if (hasError) return;

    resetPasswordMutation.mutate({ token, newPassword: password });
  };

  if (tokenError) {
    return (
      <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2">
              <img src="/assets/images/logo-devlinks-small.svg" alt="devlinks" className="w-10 h-10" />
              <span className="text-2xl font-bold text-text-dark">devlinks</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 sm:p-10 shadow-sm">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-2">Reset Password</h1>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{tokenError}</p>
              </div>
              <Link 
                to="/forgot-password" 
                className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-all"
              >
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <img src="/assets/images/logo-devlinks-small.svg" alt="devlinks" className="w-10 h-10" />
            <span className="text-2xl font-bold text-text-dark">devlinks</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 sm:p-10 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-2">Reset Password</h1>
            <p className="text-sm text-text-gray">Enter your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="New password"
              type="password"
              value={password}
              onChange={(value) => {
                setPassword(value);
                setPasswordError("");
              }}
              placeholder="At least 8 characters"
              error={passwordError}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <Input
              label="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(value) => {
                setConfirmPassword(value);
                setConfirmPasswordError("");
              }}
              placeholder="Confirm password"
              error={confirmPasswordError}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:shadow-[2px_2px_10px_3px_#BEADFF]"
            >
              {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>

      <Toast message="Password reset successful!" visible={showSuccessToast} />
    </div>
  );
}
