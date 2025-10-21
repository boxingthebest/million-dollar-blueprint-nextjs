// Stripe Product Configuration
// Update these with your actual Stripe Price IDs after creating products in Stripe Dashboard

export const STRIPE_PRODUCTS = {
  courses: {
    aiResistantSkills: {
      id: 'ai-resistant-skills',
      name: 'AI-Resistant Skills',
      description: 'Future-Proof Your Career - Master the 5 human skills AI will never replace',
      price: 19700, // $197.00 in cents
      currency: 'usd',
      // After creating in Stripe, add: priceId: 'price_xxxxx'
    },
    highPerformanceWellness: {
      id: 'high-performance-wellness',
      name: 'High-Performance Wellness',
      description: 'Eliminate Burnout Forever - Executive wellness protocols to sustain peak performance',
      price: 19700, // $197.00 in cents
      currency: 'usd',
    },
    salesMastery: {
      id: 'sales-mastery',
      name: 'Sales Mastery',
      description: 'Close High-Ticket Deals - The exact sales frameworks used to scale companies from $500K to $50B+',
      price: 24700, // $247.00 in cents
      currency: 'usd',
    },
    leadershipInfluence: {
      id: 'leadership-influence',
      name: 'Leadership & Influence',
      description: 'Command Any Room - Fortune 100 leadership strategies for executive presence and influence',
      price: 24700, // $247.00 in cents
      currency: 'usd',
    },
    digitalMarketing: {
      id: 'digital-marketing-mastery',
      name: 'Digital Marketing Mastery',
      description: 'Grow Your Brand Online - Enterprise-level digital marketing tactics that drive real revenue',
      price: 19700, // $197.00 in cents
      currency: 'usd',
    },
    wealthBuilding: {
      id: 'wealth-building',
      name: 'Wealth Building',
      description: 'Financial Intelligence - Build lasting wealth with strategies from Wall Street insiders',
      price: 19700, // $197.00 in cents
      currency: 'usd',
    },
  },
  bundles: {
    starter: {
      id: 'starter-bundle',
      name: 'Starter Bundle - Career + Wellness',
      description: 'Get both flagship courses. Transform your career AND eliminate burnout',
      price: 29700, // $297.00 in cents
      currency: 'usd',
      includes: ['AI-Resistant Skills', 'High-Performance Wellness'],
    },
    complete: {
      id: 'complete-mastery-bundle',
      name: 'Complete Mastery Bundle - All 6 Courses',
      description: 'Master every skill. Complete transformation. Maximum savings',
      price: 69700, // $697.00 in cents
      currency: 'usd',
      includes: [
        'AI-Resistant Skills',
        'High-Performance Wellness',
        'Sales Mastery',
        'Leadership & Influence',
        'Digital Marketing Mastery',
        'Wealth Building',
      ],
    },
  },
  subscriptions: {
    monthly: {
      id: 'monthly-access',
      name: 'Monthly All-Access',
      description: 'Access to all 6 courses with monthly billing',
      price: 4700, // $47.00 in cents per month
      currency: 'usd',
      interval: 'month',
    },
    annual: {
      id: 'annual-access',
      name: 'Annual All-Access',
      description: 'Access to all 6 courses with annual billing - Save 30%',
      price: 39700, // $397.00 in cents per year
      currency: 'usd',
      interval: 'year',
    },
  },
}

export type ProductKey = keyof typeof STRIPE_PRODUCTS.courses
export type BundleKey = keyof typeof STRIPE_PRODUCTS.bundles
export type SubscriptionKey = keyof typeof STRIPE_PRODUCTS.subscriptions

