Development Guidelines
Use ESLint and Prettier to maintain consistent code style.

Use meaningful names for variables, functions, and components.

Avoid commented-out or dead code.

Keep components and functions small and focused.

Write unit and/or integration tests for your features.

Prefer native JS methods and features over third-party solutions unless necessary.

JavaScript Standards
We follow ES6+ conventions:

Use const and let, never var.

Prefer arrow functions:
✅ const add = (a, b) => a + b;

Destructure props and objects when possible.

Use template literals instead of string concatenation.

Avoid deeply nested code.

Do not mutate state or props directly.

Use tools:

# Format code

npx prettier --write .

# Lint code

npx eslint . --ext .js,.jsx
React Best Practices
Use functional components and React Hooks.

Component names must be in PascalCase.

Use useEffect, useState, and useContext where appropriate.

Keep logic reusable with custom hooks.

Use PropTypes or TypeScript for type checking.

Keep components small and reusable (Single Responsibility Principle).

Avoid inline styles; use CSS Modules, styled-components, or Tailwind CSS.

Example Folder Structure
src/
├── components/
│ ├── Button/
│ │ ├── Button.jsx
│ │ ├── Button.module.css
│ │ └── index.js
├── hooks/
│ └── useAuth.js
├── pages/
│ └── Home.jsx
├── utils/
│ └── formatDate.js
├── App.jsx
└── index.js
Pull Requests
Sync with main or dev before submitting:

git pull origin main
Run npm run lint and npm run test before pushing.

Ensure your code is fully working and tested.

Explain clearly what the PR does and reference related issues (e.g., Fixes #45).

Commit Messages
Follow conventional commit style:

feat: Add a new feature

fix: Fix a bug

refactor: Refactor code

docs: Update documentation

test: Add or fix tests

style: Code style changes (formatting, missing semi-colons, etc.)

chore: Other changes (e.g., build, tools)

Example:

feat(auth): add login with Google OAuth
Thank you for contributing and helping improve this project!
