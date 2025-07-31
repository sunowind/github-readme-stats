# Project Structure

## Root Level
- **api/**: Vercel serverless function endpoints
- **src/**: Core application logic and components
- **tests/**: Test files mirroring src structure
- **themes/**: Theme definitions and documentation
- **scripts/**: Utility scripts for maintenance
- **docs/**: Internationalized documentation

## API Layer (`api/`)
Each file is a Vercel serverless function:
- `index.js` - GitHub stats card (default endpoint)
- `leetcode.js` - LeetCode stats card
- `pin.js` - Repository pin cards
- `top-langs.js` - Top languages card
- `wakatime.js` - WakaTime stats card
- `gist.js` - GitHub gist cards
- `status/` - Health check endpoints

## Source Structure (`src/`)

### Cards (`src/cards/`)
SVG card rendering components:
- `stats-card.js` - GitHub statistics card
- `leetcode-card.js` - LeetCode statistics card
- `repo-card.js` - Repository information card
- `top-languages-card.js` - Programming languages card
- `wakatime-card.js` - WakaTime coding time card
- `gist-card.js` - GitHub gist card
- `index.js` - Card exports

### Common Utilities (`src/common/`)
- `Card.js` - Base card class with SVG generation
- `utils.js` - Utility functions (parsing, formatting, validation)
- `icons.js` - SVG icon definitions
- `I18n.js` - Internationalization helper
- `retryer.js` - Retry logic for API calls
- `createProgressNode.js` - Progress bar components
- `blacklist.js` - Blocked usernames
- `languageColors.json` - Programming language color mapping

### Data Fetchers (`src/fetchers/`)
API integration modules:
- `stats-fetcher.js` - GitHub GraphQL API
- `leetcode-fetcher.js` - LeetCode API integration
- `repo-fetcher.js` - Repository data fetching
- `top-languages-fetcher.js` - Language statistics
- `wakatime-fetcher.js` - WakaTime API
- `gist-fetcher.js` - GitHub gist API

## Testing Structure (`tests/`)
- Mirrors `src/` structure
- `__snapshots__/` - Jest snapshot files
- `e2e/` - End-to-end integration tests
- `bench/` - Performance benchmarks

## Configuration Files
- `package.json` - Dependencies and scripts
- `vercel.json` - Vercel deployment configuration
- `express.js` - Local development server
- `jest.config.js` - Test configuration
- `eslint.config.mjs` - Linting rules
- `.prettierrc.json` - Code formatting rules

## Naming Conventions
- **Files**: kebab-case (e.g., `stats-card.js`)
- **Functions**: camelCase (e.g., `fetchStats`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `CARD_MIN_WIDTH`)
- **Classes**: PascalCase (e.g., `Card`, `I18n`)