"use client"

import React, { useEffect, useRef } from 'react'

interface FuturisticBackgroundProps {
  variant?: 'admin' | 'student' | 'enrollment'
}

export default function FuturisticBackground({ variant = 'admin' }: FuturisticBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
        
        // Color based on variant
        if (variant === 'admin') {
          const colors = ['rgba(251, 191, 36, ', 'rgba(59, 130, 246, ', 'rgba(168, 85, 247, ']
          this.color = colors[Math.floor(Math.random() * colors.length)]
        } else if (variant === 'student') {
          const colors = ['rgba(34, 211, 238, ', 'rgba(168, 85, 247, ', 'rgba(251, 146, 60, ']
          this.color = colors[Math.floor(Math.random() * colors.length)]
        } else {
          const colors = ['rgba(251, 191, 36, ', 'rgba(34, 211, 238, ', 'rgba(236, 72, 153, ']
          this.color = colors[Math.floor(Math.random() * colors.length)]
        }
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color + this.opacity + ')'
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 80
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Connect nearby particles
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach(particleB => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = particleA.color + (0.1 * (1 - distance / 150)) + ')'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant])

  return (
    <>
      {/* Animated Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Gradient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          variant === 'admin' 
            ? 'from-slate-950 via-slate-900 to-slate-950' 
            : variant === 'student'
            ? 'from-slate-950 via-indigo-950/30 to-slate-950'
            : 'from-slate-950 via-purple-950/30 to-slate-950'
        }`}></div>
        
        {/* Animated gradient orbs */}
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${
          variant === 'admin' ? 'bg-amber-500/10' : variant === 'student' ? 'bg-cyan-500/10' : 'bg-pink-500/10'
        } rounded-full blur-3xl animate-pulse-slow`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${
          variant === 'admin' ? 'bg-blue-500/10' : variant === 'student' ? 'bg-purple-500/10' : 'bg-amber-500/10'
        } rounded-full blur-3xl animate-pulse-slow`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 w-96 h-96 ${
          variant === 'admin' ? 'bg-purple-500/10' : variant === 'student' ? 'bg-pink-500/10' : 'bg-cyan-500/10'
        } rounded-full blur-3xl animate-pulse-slow`} style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Geometric Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridPulse 4s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Parallax Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Layer 1 - Slow moving shapes */}
        <div className="absolute inset-0 animate-float-slow">
          <div className={`absolute top-20 left-20 w-32 h-32 ${
            variant === 'admin' ? 'border-amber-500/20' : variant === 'student' ? 'border-cyan-500/20' : 'border-pink-500/20'
          } border rounded-full`}></div>
          <div className={`absolute bottom-40 right-40 w-24 h-24 ${
            variant === 'admin' ? 'border-blue-500/20' : variant === 'student' ? 'border-purple-500/20' : 'border-amber-500/20'
          } border rotate-45`}></div>
        </div>
        
        {/* Layer 2 - Medium speed */}
        <div className="absolute inset-0 animate-float-medium">
          <div className={`absolute top-1/3 right-1/4 w-20 h-20 ${
            variant === 'admin' ? 'border-purple-500/20' : variant === 'student' ? 'border-pink-500/20' : 'border-cyan-500/20'
          } border rounded-lg rotate-12`}></div>
        </div>
      </div>

      {/* Add custom animations to global styles */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-30px) translateX(-15px) rotate(5deg); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.05; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

