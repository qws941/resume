# Task #4: Quick Start Guide

## What You Need

You need 2 tokens. Get them from:

1. **GSC Token**: https://search.google.com/search-console
   - Add property: https://resume.jclee.me  
   - Choose: HTML tag verification
   - Copy: content="..." value

2. **GA4 ID**: https://analytics.google.com
   - Create property for https://resume.jclee.me
   - Get: Measurement ID (format: G-XXXXXXXXXX)

## Quick Setup (3 steps)

### Step 1: Add tokens to .env.local

```bash
cat >> /home/jclee/dev/resume/.env.local << 'EOF'

# Google Analytics 4
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
GOOGLE_SITE_VERIFICATION_TOKEN=your_gsc_token_here
