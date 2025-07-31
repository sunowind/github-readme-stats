# Product Overview

GitHub Readme Stats is a service that dynamically generates SVG cards displaying GitHub statistics for README files. This is a fork of the original project with added LeetCode stats support.

## Core Features

- **GitHub Stats Card**: Shows user's GitHub statistics (commits, PRs, issues, stars)
- **Repository Cards**: Pin specific repositories with stats
- **Top Languages Card**: Display most used programming languages
- **Gist Cards**: Show GitHub gist information
- **WakaTime Integration**: Display coding time statistics
- **LeetCode Stats Card**: Show LeetCode problem-solving statistics (CN region only)

## Target Users

Developers who want to showcase their coding statistics in GitHub profile READMEs through dynamically generated SVG cards.

## Deployment

- Primary deployment on Vercel as serverless functions
- Local development server using Express.js
- API endpoints return SVG images with caching headers