# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Analytics Setup

This project includes built-in analytics support for tracking visitors and business metrics. 

### Quick Setup

1. **Copy the environment file:**
   ```sh
   cp .env.example .env
   ```

2. **Choose an analytics provider:**

   **Option A: Google Analytics 4 (Recommended)**
   - Go to [Google Analytics](https://analytics.google.com/)
   - **If you already have analytics for your mobile app:** Create a **new property** for your website (Admin → Create Property → Web)
   - **If starting fresh:** Create a new property
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)
   - Add it to `.env`:
     ```
     VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```
   - 📖 **Detailed setup:** See [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) for step-by-step instructions

   **Option B: Plausible Analytics (Privacy-focused)**
   - Sign up at [Plausible](https://plausible.io/)
   - Add your domain
   - Add it to `.env`:
     ```
     VITE_PLAUSIBLE_DOMAIN=yourdomain.com
     ```

   **Option C: Use Both**
   - You can configure both providers simultaneously

3. **Restart your dev server** after adding environment variables

### What Gets Tracked

The analytics automatically tracks:
- **Page views** - Every page visit and route change
- **Section views** - When users scroll to different sections
- **App Store clicks** - Clicks on App Store badges
- **CTA clicks** - All call-to-action button clicks
- **Email signups** - Form submissions
- **Feedback submissions** - User feedback
- **Feature interactions** - Interest in specific features
- **Pricing views/clicks** - Engagement with pricing plans
- **Support form submissions** - Contact form usage
- **Media plays** - Video or media interactions
- **Downloads** - App download attempts

### Using Analytics in Your Code

```typescript
import { analytics } from '@/lib/analytics';

// Track custom events
analytics.trackCTAClick('Get Started', 'hero-section');
analytics.trackEmailSignup('footer-form');
analytics.trackPricingClick('pro', 'pricing-section');
```

### Viewing Analytics Data

- **Google Analytics**: Visit [analytics.google.com](https://analytics.google.com/) and navigate to your property
- **Plausible**: Visit your Plausible dashboard

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
