# Technology Stack

## Runtime & Language
- **Node.js**: v18+ required (ES modules)
- **JavaScript**: ES2022 with ES modules (`"type": "module"`)
- **Platform**: Serverless functions (Vercel) + Express.js for local dev

## Core Dependencies
- **axios**: HTTP client for API requests
- **express**: Local development server
- **dotenv**: Environment variable management
- **leetcode-query**: LeetCode API integration
- **emoji-name-map**: Emoji support in cards
- **word-wrap**: Text wrapping utilities

## Development Tools
- **Jest**: Testing framework with jsdom environment
- **ESLint**: Linting with JSDoc plugin
- **Prettier**: Code formatting (trailing commas, no tabs)
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files

## Common Commands

### Development
```bash
npm start              # Start Express server on port 9000
npm test               # Run test suite with coverage
npm test:watch         # Run tests in watch mode
npm test:e2e           # Run end-to-end tests
```

### Code Quality
```bash
npm run lint           # ESLint check
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without changes
```

### Utilities
```bash
npm run theme-readme-gen    # Generate theme documentation
npm run preview-theme       # Preview theme changes
npm run generate-langs-json # Update language colors
```

## Architecture Patterns
- **Serverless Functions**: Each API endpoint is a separate function
- **Card Rendering**: SVG generation with customizable themes
- **Fetcher Pattern**: Separate modules for data fetching (GitHub, LeetCode, etc.)
- **Error Handling**: Consistent error rendering with SVG responses
- **Caching**: HTTP cache headers for performance