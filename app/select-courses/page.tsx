'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';;

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
}

export default function SelectCoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [bundleType, setBundleType] = useState<string>('');

  useEffect(() => {
    if (!sessionId) {
      setError('Invalid session. Please contact support.');
      setLoading(false);
      return;
    }

    // Fetch available courses and verify session
    fetch(`/api/select-courses/verify?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setCourses(data.courses);
          setBundleType(data.bundleType);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load courses. Please try again.');
        setLoading(false);
      });
  }, [sessionId]);

  const toggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      // Only allow 3 selections for starter bundle
      if (bundleType === 'starter' && selectedCourses.length >= 3) {
        return;
      }
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleSubmit = async () => {
    if (bundleType === 'starter' && selectedCourses.length !== 3) {
      setError('Please select exactly 3 courses.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/select-courses/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          courseIds: selectedCourses,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSubmitting(false);
      } else {
        // Redirect to dashboard or success page
        router.push('/dashboard?welcome=true');
      }
    } catch (err) {
      setError('Failed to save your selection. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error && !courses.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-white mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const maxSelections = bundleType === 'starter' ? 3 : courses.length;
  const selectionsRemaining = maxSelections - selectedCourses.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎉 Welcome to Million Dollar Blueprint!
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            {bundleType === 'starter' 
              ? 'Choose your 3 courses to get started'
              : 'All courses are included in your bundle!'}
          </p>
          {bundleType === 'starter' && (
            <p className="text-lg text-purple-400 font-semibold">
              {selectionsRemaining > 0 
                ? `Select ${selectionsRemaining} more course${selectionsRemaining !== 1 ? 's' : ''}`
                : '✓ All courses selected!'}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => {
            const isSelected = selectedCourses.includes(course.id);
            const canSelect = bundleType !== 'starter' || selectedCourses.length < 3 || isSelected;

            return (
              <div
                key={course.id}
                onClick={() => canSelect && toggleCourse(course.id)}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'bg-purple-900/40 border-purple-400 shadow-lg shadow-purple-500/50' 
                    : canSelect
                      ? 'bg-slate-800/40 border-slate-600 hover:border-purple-500 hover:shadow-lg'
                      : 'bg-slate-800/20 border-slate-700 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    ✓
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                <p className="text-slate-300 text-sm">{course.description}</p>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {bundleType === 'starter' && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={selectedCourses.length !== 3 || submitting}
              className={`
                px-12 py-4 rounded-lg font-bold text-xl transition-all
                ${selectedCourses.length === 3 && !submitting
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/50'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              {submitting ? 'Processing...' : 'Confirm Selection & Continue'}
            </button>
          </div>
        )}

        {bundleType !== 'starter' && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-12 py-4 rounded-lg font-bold text-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              {submitting ? 'Processing...' : 'Continue to Dashboard'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

