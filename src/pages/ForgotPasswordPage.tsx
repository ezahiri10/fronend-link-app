import { useState } from 'react';
import { authClient } from '../lib/auth';
import { Link } from '@tanstack/react-router';
import { Input } from '../components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Can't be empty");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      return;
    }

    try {
      setIsLoading(true);
      
      // Call Better Auth forget password endpoint directly
      const response = await fetch(`${import.meta.env.VITE_API_URL?.replace('/trpc', '') || 'http://localhost:3000'}/api/auth/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          redirectTo: `${window.location.origin}/reset-password`,
        }),
      });
      
      if (!response.ok) {
        console.error('Forgot password response:', response.status, response.statusText);
      }
      
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Forgot password error:', error);
      // For security, don't reveal if email exists
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

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
            <p className="text-sm text-text-gray">
              {isSuccess 
                ? "If an account with that email exists, you'll receive a password reset link shortly."
                : "Enter your email and we'll send you a reset link"
              }
            </p>
          </div>

          {isSuccess ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-green-800">
                    Check your email inbox and spam folder for the reset link.
                  </p>
                </div>
              </div>
              <Link 
                to="/login" 
                className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-all"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setEmailError("");
                }}
                placeholder="e.g. alex@email.com"
                error={emailError}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:shadow-[2px_2px_10px_3px_#BEADFF]"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <Link to="/login" className="text-sm text-purple-600 hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
