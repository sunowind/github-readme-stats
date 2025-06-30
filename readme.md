<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats - LeetCode Edition</h2>
 <p align="center">Fork of <a href="https://github.com/anuraghazra/github-readme-stats">anuraghazra/github-readme-stats</a> with LeetCode Stats Card support!</p>
</p>

<p align="center">
    <a href="https://github.com/anuraghazra/github-readme-stats">
      <img alt="Original Repository" src="https://img.shields.io/badge/Original-anuraghazra/github--readme--stats-blue" />
    </a>
    <a href="#leetcode-stats-card">
      <img alt="LeetCode Support" src="https://img.shields.io/badge/Feature-LeetCode%20Stats-orange" />
    </a>
    <a href="https://leetcode.cn">
      <img alt="LeetCode CN" src="https://img.shields.io/badge/Platform-LeetCode%20CN-green" />
    </a>
</p>

<p align="center">
    <a href="#usage">View Demo</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml">Report Bug</a>
    ·
    <a href="https://github.com/anuraghazra/github-readme-stats/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml">Request Feature</a>
</p>

## 🚀 What's New

This fork adds **LeetCode Stats Card** support to the original GitHub Readme Stats project, allowing you to display your LeetCode problem-solving statistics in your GitHub profile README.

### ✨ Features

- 📊 **Circular Progress Chart** - Visual representation of total solved problems
- 🎯 **Difficulty Breakdown** - Easy, Medium, Hard problem statistics with progress bars
- 🏆 **Ranking Display** - Show your LeetCode CN ranking
- 🎨 **Theme Support** - All original themes supported
- 🌍 **Internationalization** - Multiple language support
- ⚡ **Animations** - Smooth loading animations
- 🎛️ **Customizable** - Colors, sizes, borders, and more

## 📋 Table of Contents

- [LeetCode Stats Card](#leetcode-stats-card)
  - [Usage](#usage)
  - [Customization](#customization)
  - [Demo](#demo)
- [Local Development](#local-development)
- [Deploy Your Own](#deploy-your-own)
- [Original Features](#original-features)
- [Contributing](#contributing)

---

# LeetCode Stats Card

> [!NOTE]
> **LeetCode CN Support Only**: Currently supports LeetCode CN region only. You need a valid [LeetCode CN](https://leetcode.cn) account with public profile data.

## Usage

### Using the Public Instance (Vercel)

Copy and paste this into your markdown file and change the username:

```md
[![LeetCode Stats](https://github-readme-stats.vercel.app/api/leetcode?username=YOUR_LEETCODE_USERNAME)](https://github.com/anuraghazra/github-readme-stats)
```

### Using Local Development Server

For local development:

```bash
npm install express
npm start
```

Then use:

```md
[![LeetCode Stats](http://localhost:9000/leetcode?username=YOUR_LEETCODE_USERNAME)](https://github.com/anuraghazra/github-readme-stats)
```

> [!TIP]
> Replace `YOUR_LEETCODE_USERNAME` with your actual LeetCode CN username.

## Customization

Customize your LeetCode stats card with URL parameters:

### Available Options

| Parameter              | Description                      | Type     | Default            |
| ---------------------- | -------------------------------- | -------- | ------------------ |
| `username`           | LeetCode CN username             | string   | **Required** |
| `theme`              | Card theme                       | string   | `default`        |
| `title_color`        | Title text color                 | hex code | `2f80ed`         |
| `text_color`         | Body text color                  | hex code | `434d58`         |
| `icon_color`         | Icon color                       | hex code | `4c71f2`         |
| `ring_color`         | Progress ring color              | hex code | `ff9800`         |
| `bg_color`           | Background color                 | hex code | `fffefe`         |
| `border_color`       | Border color                     | hex code | `e4e2e2`         |
| `hide_border`        | Hide card border                 | boolean  | `false`          |
| `hide_title`         | Hide card title                  | boolean  | `false`          |
| `custom_title`       | Custom title text                | string   | `LeetCode Stats` |
| `locale`             | Language locale (`en`, `cn`) | string   | `en`             |
| `card_width`         | Card width in pixels             | number   | `400`            |
| `border_radius`      | Border radius                    | number   | `4.5`            |
| `disable_animations` | Disable animations               | boolean  | `false`          |

### Examples

#### Theme Examples

Use any of the built-in themes:

```md
![LeetCode Stats](https://github-readme-stats.vercel.app/api/leetcode?username=YOUR_USERNAME&theme=dark)
```

```md
![LeetCode Stats](https://github-readme-stats.vercel.app/api/leetcode?username=YOUR_USERNAME&theme=radical)
```

Available themes: `default`, `dark`, `radical`, `merko`, `gruvbox`, `tokyonight`, `onedark`, `cobalt`, `synthwave`, `highcontrast`, `dracula`, and more. See [all available themes](https://github.com/anuraghazra/github-readme-stats/blob/master/themes/README.md).

#### Custom Colors

```md
![LeetCode Stats](https://github-readme-stats.vercel.app/api/leetcode?username=YOUR_USERNAME&title_color=ff6b6b&text_color=333333&icon_color=2196f3&ring_color=ff9800&bg_color=ffffff)
```

#### Hide Elements

```md
![LeetCode Stats](https://github-readme-stats-sunowind.vercel.app/api/leetcode?username=YOUR_USERNAME&hide_border=true&hide_title=true)
```

#### Chinese Locale

```md
![LeetCode Stats](https://github-readme-stats.vercel.app/api/leetcode?username=YOUR_USERNAME&locale=cn)
```

## Demo

### Default Theme

![LeetCode Stats](https://github-readme-stats-sunowind.vercel.app/api/leetcode?username=sunowind)

### Dark Theme

![LeetCode Stats](https://github-readme-stats-sunowind.vercel.app/api/leetcode?username=sunowind&theme=dark)

### Custom Colors

![LeetCode Stats](https://github-readme-stats-sunowind.vercel.app/api/leetcode?username=sunowind&title_color=ff6b6b&text_color=333333&icon_color=2196f3&ring_color=ff9800)

### Minimal Style

![LeetCode Stats](https://github-readme-stats-sunowind.vercel.app/api/leetcode?username=sunowind&hide_border=true&hide_title=true)

---

# Local Development

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. **Clone this repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/github-readme-stats.git
   cd github-readme-stats
   ```
2. **Install dependencies**

   ```bash
   npm install
   npm install express  # Required for local server
   ```
3. **Start the development server**

   ```bash
   npm start
   ```
4. **Access LeetCode API**

   ```
   http://localhost:9000/leetcode?username=YOUR_LEETCODE_USERNAME
   ```

## Testing

Run the test suite:

```bash
npm test
```

Run specific tests:

```bash
npm test -- tests/renderLeetCodeCard.test.js
npm test -- tests/leetcode.test.js
npm test -- tests/fetchLeetCode.test.js
```

---

# Deploy Your Own

## On Vercel

1. Fork this repository
2. Go to [Vercel](https://vercel.com)
3. Import your forked repository
4. Deploy!

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/YOUR_USERNAME/github-readme-stats)

## On Other Platforms

1. Fork or clone this repository
2. Add `express` to dependencies in `package.json`
3. Run `npm install`
4. Set entry point to `express.js`
5. Deploy!

---

# Original Features

This fork maintains all the original features from [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats):

- ✅ GitHub Stats Card
- ✅ GitHub Extra Pins
- ✅ GitHub Gist Pins
- ✅ Top Languages Card
- ✅ WakaTime Stats Card
- ✅ **NEW**: LeetCode Stats Card

For documentation on the original features, please refer to the [original repository](https://github.com/anuraghazra/github-readme-stats).

---

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## For LeetCode Features

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## For Original Features

Please contribute to the original repository: [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

---

## 📝 License

This project is licensed under the same license as the original project.

## 🙏 Acknowledgments

- **[Anurag Hazra](https://github.com/anuraghazra)** - Original creator of github-readme-stats
- **[LeetCode CN](https://leetcode.cn)** - For providing the platform and API
- **[leetcode-query](https://github.com/JeremyTsaii/leetcode-query)** - For the LeetCode API wrapper

---

<p align="center">
  Made with ❤️ and JavaScript<br>
  <a href="https://github.com/anuraghazra/github-readme-stats">Original Project</a> by <a href="https://github.com/anuraghazra">Anurag Hazra</a>
</p>

<p align="center">
  <a href="https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss">
    <img src="./powered-by-vercel.svg" alt="Powered by Vercel"/>
  </a>
</p>
