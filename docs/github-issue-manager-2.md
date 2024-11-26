### Prompt 1

I'd like to make a website and would like you to help me.

Let's call the project github-issue-manager-2.

The website will manage GitHub issues. 
A page will allow users to login with their email address
A page will show a basic user profile.
A page will display a list of issues. The data will be fetched from the GitHub API.
A page will display details for an issue. The data will be fetched from the GitHub API. This page will also allow users to update the issue. Updated data will be sent to the GitHub API.
A page will allow users to create new issues. The data will be sent to the GitHub API.

The website pages will all have the same layout and styling. The layout will have a header and a footer and sidebar. The styling will be based on the GitHub design system.

I'd like to use the following tech stack:  

Architecture:
Language: TypeScript
Frontend Framework: Next.js v15.0.3 using Pages Router
Rendering: Static Site Generation (SSG) and Data Fetching
State Management: Zustand
Design System: Tailwind CSS
Component Library: Shadcn/UI
API Data Fetching: SWR
Caching: Zustand
Runtime Type Checking: Zod
Error Handling Library: Sentry
Performance Monitoring: Sentry
Analytics: Google Analytics 4
Form Management: Zod + React Hook Form
Authentication: Auth.js
E2E Testing Framework: Playwright
Unit/integration testing: Jest + React Testing Library  
Code Quality: ESLint
Code Formatting: Prettier
Internationalisation: i18next
Formatting: formatjs

Please would you generate the initial code. Please don't add any additional files.

`feat(app2): basics - prompt 1 [skip ci]`

### Prompt 1a

Please change sentry to version 8.40.0 and use Next JS v15.0.3

### Prompt 1b

Please run npm outdated

### Please 1c 

Please add a standard gitignore file for the stack

### Prompt 2 

Would you like me to continue with creating the initial components and pages for the GitHub issue manager? 
-> yes

### Prompt 3

how can i see the interface?

Let's kill all next processes; clear the cache and restart the dev server

pkill -f next
rm -rf .next
npm cache clean --force
rm -rf node_modules
npm install

followed by variuous error fixes

### Prompt 4

The page returns 404 cannot be found ... The 404 error occurs because we haven't created an index page yet. Let's create the home page for the application:

### Prompt 5

Since we haven't set up the GitHub OAuth credentials yet, you'll see the unauthenticated view. Would you like me to help you set up the GitHub OAuth credentials next?

### Prompt 6

This is great; thank you. Let's now pull issues from github and display them in the issue list. What do we need to do?

### Prompt 7

Please add the issue details page so that we can see an issue on its own page

let's add a back button to return to the issues list

### Prompt 8

No thanks. Let's add a form to create a new issue. Let's keep it simple - title and description only.

### Prompt 9

Let's make the github org and repo variables that can be set in env.local

### Prompt 10

To confirm - this needs to be a static site with client side data fetching and not a server side app. What changes do we need to make?