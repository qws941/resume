# How to Get Your Analytics Tokens

This guide walks you through getting the tokens you need for Task #4.

## Quick Start

You need 2 tokens:
1. **Google Search Console (GSC) Verification Token** - for search indexing
2. **Google Analytics 4 (GA4) Measurement ID** - for traffic analytics

Optional:
3. **Bing Webmaster Tools Token** - for Bing search indexing

---

## Token #1: Google Search Console Verification

### Step 1: Go to Google Search Console
- Open: https://search.google.com/search-console
- Sign in with your Google account

### Step 2: Add Your Property
- Click **"Add property"** (top left)
- Select **"URL prefix"** property type
- Enter: `https://resume.jclee.me`
- Click **Continue**

### Step 3: Verify Using HTML Tag
- A dialog will appear with verification options
- Select **HTML tag** method
- You'll see text like:
  ```html
  <meta name="google-site-verification" content="abc123def456xyz789abc123def456xyz789abc123d">
  ```

### Step 4: Copy Your Token
- **Copy only the content value**, not the whole tag
- Example token: `abc123def456xyz789abc123def456xyz789abc123d`
- This is your `GOOGLE_SITE_VERIFICATION_TOKEN`

### Notes:
- Don't click "Verify" yet - you'll do that after deployment
- Keep this token safe (but it's not secret like a password)
- Each property gets one token

---

## Token #2: Google Analytics 4 Measurement ID

### Step 1: Go to Google Analytics
- Open: https://analytics.google.com
- Sign in with your Google account (same as GSC account recommended)

### Step 2: Create a New Property
- Click **"Create"** (top left, if needed)
- Or click **"Admin"** (bottom left)
- Under "Account", select or create your account
- Under "Property", click **"Create property"**

### Step 3: Configure Property
- Property name: `Resume Portfolio` (or any name)
- Timezone: Choose your timezone (e.g., Asia/Seoul)
- Currency: Choose your currency (e.g., USD, KRW)
- Click **Create**

### Step 4: Create a Web Data Stream
- Under "Data streams", click **"Add stream"**
- Choose **"Web"**
- Website URL: `https://resume.jclee.me`
- Stream name: `Resume Portfolio Web`
- Click **Create stream**

### Step 5: Get Your Measurement ID
- A dialog shows your configuration
- Look for **"Measurement ID"** (format: `G-XXXXXXXXXX`)
- Copy the full ID: `G-XXXXXXXXXX` (including the `G-` prefix)
- This is your `GA4_MEASUREMENT_ID`

### Example:
```
Property ID: 123456789
Measurement ID: G-ABC123XYZ456  ← This is what you need
```

### Notes:
- GA4 uses `G-` prefix (not `UA-` which is old Universal Analytics)
- Different from your Property ID
- Make sure you copy the Measurement ID, not the Property ID

---

## Token #3 (Optional): Bing Webmaster Tools

### Step 1: Go to Bing Webmaster Tools
- Open: https://www.bing.com/webmasters
- Sign in with your Microsoft account

### Step 2: Add Your Site
- Click **"Add a site"**
- Enter: `https://resume.jclee.me`
- Click **Add**

### Step 3: Verify Using Meta Tag
- Bing will show verification methods
- Choose **"Meta tag"** option
- Copy the content value from the suggested meta tag
- This is your `BING_SITE_VERIFICATION_TOKEN` (optional)

### Notes:
- Bing token is optional (you can skip this)
- Useful for Bing and Yahoo search indexing
- Format is different from Google

---

## Create .env.local File

Once you have your tokens:

### Step 1: Create the file
```bash
cd /home/jclee/dev/resume
cat > .env.local << 'EOF'
GOOGLE_SITE_VERIFICATION_TOKEN=abc123def456xyz789abc123def456xyz789abc123d
GA4_MEASUREMENT_ID=G-ABC123XYZ456
BING_SITE_VERIFICATION_TOKEN=12345678901234567890123456789012
