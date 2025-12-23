"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: Date
  title?: string
  className?: string
}

export default function CountdownTimer({ 
  targetDate, 
  title = "Founding Member Pricing Ends",
  className = ""
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return null
  }

  return (
    <div className={`bg-gradient-to-r from-red-600 via-orange-500 to-red-600 py-4 px-4 ${className}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg md:text-xl animate-pulse">🔥</span>
            <span className="text-white font-bold text-sm md:text-lg">{title}</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex flex-col items-center bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-xs text-white/80 uppercase tracking-wider">Days</span>
            </div>
            <span className="text-white text-2xl font-bold">:</span>
            <div className="flex flex-col items-center bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs text-white/80 uppercase tracking-wider">Hours</span>
            </div>
            <span className="text-white text-2xl font-bold">:</span>
            <div className="flex flex-col items-center bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs text-white/80 uppercase tracking-wider">Mins</span>
            </div>
            <span className="text-white text-2xl font-bold">:</span>
            <div className="flex flex-col items-center bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-2xl md:text-3xl font-bold text-white tabular-nums animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-white/80 uppercase tracking-wider">Secs</span>
            </div>
          </div>
          
          <a 
            href="/bundle/professional" 
            className="bg-white text-red-600 hover:bg-yellow-300 hover:text-red-700 px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all shadow-lg hover:shadow-xl"
          >
            Lock In Price →
          </a>
        </div>
      </div>
    </div>
  )
}
