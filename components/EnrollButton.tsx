"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface EnrollButtonProps {
  courseSlug: string;
  coursePrice: number;
  className?: string;
  children?: React.ReactNode;
}

export default function EnrollButton({ courseSlug, coursePrice, className, children }: EnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    
    try {
      // Check if user is logged in by calling an auth check endpoint
      const authCheck = await fetch('/api/auth/check');
      const { isAuthenticated } = await authCheck.json();

      if (isAuthenticated) {
        // User is logged in - go directly to checkout
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            courseSlug,
            successUrl: `${window.location.origin}/dashboard?enrolled=true`,
            cancelUrl: window.location.href
          }),
        });

        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        }
      } else {
        // User not logged in - go to signup page
        router.push(`/auth/signup?course=${courseSlug}`);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className={className || "inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all disabled:opacity-50"}
    >
      {loading ? 'Processing...' : (children || `Enroll Now - $${coursePrice / 100}`)}
      {!loading && <ArrowRight className="ml-2" />}
    </button>
  );
}

