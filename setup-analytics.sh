#!/bin/bash

# Task #4: Analytics Setup Helper Script
# This script helps you add GA4 and GSC to your resume portfolio

set -e

echo "════════════════════════════════════════════════════════"
echo "📊 Analytics & Search Console Setup Helper"
echo "════════════════════════════════════════════════════════"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✓ Loading environment from .env.local"
    source .env.local
else
    echo "⚠ .env.local not found"
    echo ""
    echo "Create .env.local with these variables:"
    echo "  GOOGLE_SITE_VERIFICATION_TOKEN=your_token"
    echo "  GA4_MEASUREMENT_ID=G-XXXXXXXXXX"
    echo ""
    exit 1
fi

# Validate tokens
if [ -z "$GA4_MEASUREMENT_ID" ]; then
    echo "❌ GA4_MEASUREMENT_ID not set"
    exit 1
fi

if [ -z "$GOOGLE_SITE_VERIFICATION_TOKEN" ]; then
    echo "❌ GOOGLE_SITE_VERIFICATION_TOKEN not set"
    exit 1
fi

echo ""
echo "📋 Configuration Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "GA4 Measurement ID: $GA4_MEASUREMENT_ID"
echo "GSC Token: ${GOOGLE_SITE_VERIFICATION_TOKEN:0:20}..."
echo ""

# Function to inject analytics into HTML
inject_analytics() {
    local html_file=$1
    local language=$2
    
    echo "Processing: $html_file ($language)"
    
    # Create backup
    cp "$html_file" "$html_file.backup"
    echo "  ✓ Backup created: $html_file.backup"
    
    # Find insertion point (after <meta name="robots" ...>)
    local insert_line=$(grep -n '<meta name="robots"' "$html_file" | cut -d: -f1)
    
    if [ -z "$insert_line" ]; then
        echo "  ❌ Could not find insertion point in $html_file"
        return 1
    fi
    
    # Create temp file with analytics tags
    cat > /tmp/analytics_tags.txt << ANALYTICS_EOF
    <!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="$GOOGLE_SITE_VERIFICATION_TOKEN">

    <!-- Bing Webmaster Tools Verification (Optional) -->
    <meta name="msvalidate.01" content="${BING_SITE_VERIFICATION_TOKEN:-}">

    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=$GA4_MEASUREMENT_ID"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '$GA4_MEASUREMENT_ID', {
        'page_path': window.location.pathname,
        'language': '$language'
      });
    </script>
ANALYTICS_EOF

    # Insert analytics tags
    head -n "$insert_line" "$html_file" > "$html_file.tmp"
    cat /tmp/analytics_tags.txt >> "$html_file.tmp"
    tail -n +$((insert_line + 1)) "$html_file" >> "$html_file.tmp"
    mv "$html_file.tmp" "$html_file"
    
    echo "  ✓ Analytics tags injected"
    
    # Verify injection
    if grep -q "google-site-verification" "$html_file"; then
        echo "  ✓ Verification: Tags successfully added"
    else
        echo "  ❌ Verification failed"
        return 1
    fi
}

# Process both HTML files
cd typescript/portfolio-worker

echo "🔧 Injecting analytics tags..."
echo ""

inject_analytics "index.html" "ko" || exit 1
echo ""
inject_analytics "index-en.html" "en" || exit 1

echo ""
echo "✅ Analytics tags injected successfully!"
echo ""

# Build and verify CSP
echo "🔨 Building worker (updating CSP hashes)..."
cd ../..
npm run build 2>&1 | grep -E "(CSP|success|error)" || true

echo ""
echo "📋 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Review changes: git diff typescript/portfolio-worker/index*.html"
echo "2. Test locally (if applicable)"
echo "3. Deploy: npm run deploy"
echo "4. Verify deployment:"
echo "   curl https://resume.jclee.me | grep 'google-site-verification'"
echo "5. Add to .gitignore: .env.local"
echo ""

