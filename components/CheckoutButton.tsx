"use client"

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface CheckoutButtonProps {
  productType: 'course' | 'bundle' | 'subscription'
  productKey: string
  className?: string
  children?: React.ReactNode
}

export default function CheckoutButton({ 
  productType, 
  productKey, 
  className = "",
  children 
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productType,
          productKey,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/?canceled=true`,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
        alert('Failed to create checkout session. Please try again.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to create checkout session. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Processing...
        </>
      ) : (
        children || (
          <>
            Enroll Now <ArrowRight className="ml-2 inline" />
          </>
        )
      )}
    </button>
  )
}

