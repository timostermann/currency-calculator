# Currency Calculator

A Next.js application that converts USD to EUR and CHF using real-time exchange rates from the European Central Bank (via the Frankfurter API).

🔗 **Live Demo**: [Deployed on Vercel](https://currency-calculator-jade.vercel.app)

## Architecture & Approach

### How I Approached This

#### Planning

The base was [this Task](./docs/task.md). I first checked out the api and wrote down a short [Step-by-Step Plan](./docs/steps.md) on what I'm trying to do. I then followed that plan and took care of smaller issues right away once I noticed they were necessary. I decided to setup quality assurance as if it'd be an application that's supposed to scale, so I added pre-commit hooks, release management, linting, unit/integration tests and e2e tests. I used configs for linting and testing and a standard test suite for components based on previous projects because I had good experiences with these. I used Cursor AI to assist where I felt like reviewing and possibly refactoring would take less time than doing the task from scratch like (e. g. writing tests).

### What I Would Improve With More Time

I kept accessibility in mind but didn't take the time to thoroughly test it, so there might be some issues left. For example semantic HTML could be improved by using less paragraphs. Besides that one could add features on top like supporting a wide range of currencies or displaying more historical values for better comparison. Further UX features like internationalization or multi-theme support could be added as well. It would also make sense to add a CI pipeline that runs linting, all tests, npm audit and a build. This could possibly also lead to a deployment via pipeline if it isn't deployed on a cloud-service that checks for git updates.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Testing**: Vitest + Playwright
- **Data Source**: [Frankfurter API](https://api.frankfurter.app/) (ECB exchange rates)

## Getting Started

### Prerequisites

- Node.js >= 22 < 25
- npm >= 11

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
npm run test          # Run unit tests
npm run test:coverage # Run tests with coverage report
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Run E2E tests with Playwright UI
npm run release       # Create a new release version
```

## Environment Variables

No environment variables required.
