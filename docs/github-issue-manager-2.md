### Prompt 1

I'd like to make a website and would like you to help me.

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

### Prompt 2 

Let's add a standard gitignore file for the stack

### Prompt 3

Please add DS_store to the gitignore

### Prompt 4 

Let's Create the main issue management interface ⚠ Port 3000 is in use, trying 3001 instead.
 ⚠ Port 3001 is in use, trying 3002 instead.
 ⚠ Port 3002 is in use, trying 3003 instead.
 ⚠ Port 3003 is in use, trying 3004 instead.
 ⚠ Port 3004 is in use, trying 3005 instead.
 ⚠ Port 3005 is in use, trying 3006 instead.
 ⚠ Port 3006 is in use, trying 3007 instead.
 ⚠ Port 3007 is in use, trying 3008 instead.
 ⚠ Port 3008 is in use, trying 3009 instead.
 ⚠ Port 3009 is in use, trying 3010 instead.
<w> [webpack.cache.PackFileCacheStrategy] Restoring pack from /Users/macbookuser/Code/codeium-1/github-issue-manager/.next/cache/webpack/server-development.pack.gz failed: TypeError: Cannot read properties of undefined (reading 'hasStartTime')


### Prompt 5

how can i see the interface?

followed by variuous error fixes

### Prompt 6

Please would you Add some mock data so we can see actual issues instead of the loading state

### Prompt 7

Please add the issue details page so that we can see an issue on its own page

let's add a back button to return to the issues list

### Prommpt 8

Let's add some styling. Let's make the issue list and issue details page look like github

The styling has not shown in the app; please check

Error fix

### Prompt 9

Let's add a create issue page. 

Let's add fields to the create issue page: Due Date, Priority, Labels, Assignees, URL, Screenshot. Please extend the mock data to include these fields.

### Prompt 10

Let's add those new fields to the issue details page

### Prompt 11

Let's add form validation

### Prompt 12

N

### Prompt 13

Please add the header from the home page into both the issue details and issue create pages

Please remove the green New Issue button from the body of the issue list and issue details pages (not from the header)

In the New issue page, please move the breadcrumb to the top of the page - below the header but above the New Issue heading. 