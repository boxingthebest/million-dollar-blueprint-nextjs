'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  result1: string;
  result2: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const photoMap: {[key: string]: string} = {
    'Sarah Chen': '/testimonial-sarah.jpg',
    'Marcus Rodriguez': '/testimonial-marcus.jpg',
    'Jennifer Park': '/testimonial-jennifer.jpg',
    'David Thompson': '/testimonial-david.jpg',
    'Amanda Foster': '/testimonial-amanda.jpg',
    'Robert Kim': '/testimonial-robert.jpg'
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Testimonial Display */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 md:p-12 hover:border-cyan-500/50 transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-slate-300 mb-8 text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto">
              "{currentTestimonial.text}"
            </p>

            {/* Results */}
            <div className="flex gap-3 mb-8 flex-wrap justify-center">
              <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold">
                {currentTestimonial.result1}
              </span>
              <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold">
                {currentTestimonial.result2}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 justify-center border-t border-slate-700 pt-6">
              <img 
                src={photoMap[currentTestimonial.name]} 
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50"
              />
              <div className="text-left">
                <div className="font-bold text-white text-lg">{currentTestimonial.name}</div>
                <div className="text-slate-400 text-sm">{currentTestimonial.role}</div>
                <div className="text-cyan-400 text-sm font-semibold">{currentTestimonial.company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-slate-800 hover:bg-cyan-600 text-white p-3 rounded-full transition-all hover:scale-110 border border-slate-700 hover:border-cyan-500"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-slate-800 hover:bg-cyan-600 text-white p-3 rounded-full transition-all hover:scale-110 border border-slate-700 hover:border-cyan-500"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex gap-2 justify-center mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-cyan-500 w-8' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
