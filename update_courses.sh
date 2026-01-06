#!/bin/bash
# Script to update course pages with Suby/Todd Brown methodology

cd /home/ubuntu/million-dollar-blueprint-nextjs

# Sales page
sed -i 's/Sales Mastery: Close Like the Top 1%/The Closing Secrets That Built \$50B+ Companies/g' app/courses/sales/page.tsx
sed -i 's/The exact sales frameworks/The Fortune 100 Close System™ —/g' app/courses/sales/page.tsx

# Marketing page  
sed -i 's/Digital Marketing Mastery/The Revenue Engine Blueprint™/g' app/courses/marketing/page.tsx

# Executive Presence page
sed -i 's/Executive Presence: Command Any Room/The Boardroom Authority System™/g' app/courses/executive-presence/page.tsx

# Leadership page
sed -i 's/Leadership \& Influence/The Influence Without Authority Framework™/g' app/courses/leadership/page.tsx

# Wealth page - already updated

# Wellness page
sed -i 's/Executive Wellness/The Executive Energy System™/g' app/courses/wellness/page.tsx

# Get Paid Train AI page
sed -i 's/Get Paid to Train AI/The AI Trainer Profit System™/g' app/courses/get-paid-train-ai/page.tsx

# Make First 1K AI page
sed -i 's/Make Your First \$1K with AI/The First \$1K AI Blueprint™/g' app/courses/make-first-1k-ai/page.tsx

# AI Side Hustle page
sed -i 's/Start Your AI Side Hustle/The AI Client Acquisition System™/g' app/courses/ai-side-hustle/page.tsx

echo "All course pages updated!"
