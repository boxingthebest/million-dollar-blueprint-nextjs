'use client'

import Script from 'next/script'

/**
 * Microsoft Clarity - Free heatmaps and session recordings
 * 
 * To enable:
 * 1. Sign up at https://clarity.microsoft.com (free)
 * 2. Create a new project for your site
 * 3. Copy your Project ID (looks like "abcdefghij")
 * 4. Add NEXT_PUBLIC_CLARITY_PROJECT_ID to your Vercel environment variables
 */
export default function MicrosoftClarity() {
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  // Don't render if no project ID is configured
  if (!clarityProjectId) {
    return null
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityProjectId}");
      `}
    </Script>
  )
}
