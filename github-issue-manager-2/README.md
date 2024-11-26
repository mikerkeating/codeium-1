# GitHub Issue Manager 2

A modern web application for managing GitHub issues, built with Next.js and TypeScript.

## Tech Stack

- **Framework**: Next.js 15.0.3 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Authentication**: Auth.js
- **Form Management**: React Hook Form + Zod
- **Testing**: Jest, React Testing Library, Playwright
- **Error Handling**: Sentry
- **Analytics**: Google Analytics 4
- **Internationalization**: i18next

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- User authentication with GitHub
- View and manage GitHub issues
- Create new issues
- Update existing issues
- User profile management
- Responsive design
- Dark mode support

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Next.js pages
  ├── styles/        # Global styles
  ├── lib/           # Utility libraries
  ├── types/         # TypeScript types
  ├── hooks/         # Custom React hooks
  ├── store/         # Zustand store
  └── utils/         # Helper functions
```

## Testing

- Run unit tests: `npm test`
- Run E2E tests: `npm run test:e2e`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
