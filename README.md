# PR Reviewer Personality Quiz

## this is a demo change

A fun and interactive quiz to discover your code review personality! Built with Next.js, Auth0, and CodeRabbit's signature purple branding.

## Features

- 🎯 **Interactive Quiz**: 7 scenario-based questions to determine your reviewer archetype
- 🔐 **Optional Auth0 Login**: Save results and track quiz history
- 🎨 **Beautiful Design**: CodeRabbit purple theme with smooth animations
- 📱 **Responsive**: Works perfectly on all devices
- 🚀 **Social Sharing**: Share results on Twitter and Slack
- 🔗 **Persistent URLs**: Shareable result pages

## Reviewer Archetypes

- 🔍 **The Nitpicker**: Spots every detail and typo
- 👍 **The Rubber Stamp**: Keeps development velocity flowing
- 👨‍🏫 **The Professor**: Turns reviews into learning experiences
- ⚡ **The Speedster**: Reviews code at lightning speed
- 💬 **The Socializer**: Makes code reviews collaborative

## Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Auth0**:
   - Create an Auth0 application
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Auth0 credentials:
     ```
     AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
     AUTH0_BASE_URL='http://localhost:3000'
     AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN.auth0.com'
     AUTH0_CLIENT_ID='YOUR_CLIENT_ID'
     AUTH0_CLIENT_SECRET='YOUR_CLIENT_SECRET'
     ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Auth0 Configuration

In your Auth0 dashboard:

1. **Application Settings**:
   - Application Type: Regular Web Application
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`

2. **Advanced Settings > OAuth**:
   - JsonWebToken Signature Algorithm: RS256

## Deployment

The app is configured for static export and can be deployed to:
- Vercel
- Netlify
- Any static hosting provider

For production, update your Auth0 URLs to match your domain.

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Authentication**: Auth0
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Animations**: CSS animations + Tailwind
- **Notifications**: Sonner

## License

MIT License - feel free to use this for your own team quizzes!# reactsummit-quiz
