// @ts-check
import { Card } from "../common/Card.js";
import { I18n } from "../common/I18n.js";
import { clampValue, getCardColors, kFormatter } from "../common/utils.js";

const DIFFICULTY_COLORS = {
  easy: "#00b04f",
  medium: "#ffb700",
  hard: "#ff375f",
};

/**
 * Calculates progress along the boundary of the circle.
 * @param {number} solved Number of solved problems
 * @param {number} total Total number of problems
 * @returns {number} Progress percentage (0-100)
 */
const calculateProgress = (solved, total) => {
  if (total === 0) {
    return 0;
  }
  return Math.min((solved / total) * 100, 100);
};

/**
 * Calculates progress along the circumference of the circle.
 * @param {number} percentage Progress percentage (0-100)
 * @returns {number} Stroke dash offset value
 */
const calculateCircleProgress = (percentage) => {
  const radius = 45;
  const circumference = Math.PI * (radius * 2);
  return ((100 - clampValue(percentage, 0, 100)) / 100) * circumference;
};

/**
 * Creates a difficulty progress bar.
 * @param {Object} params - Parameters for creating difficulty bar
 * @param {string} params.difficulty - Difficulty name
 * @param {number} params.solved - Number of solved problems
 * @param {number} params.total - Total number of problems
 * @param {number} params.y - Y position
 * @param {string} params.textColor - Text color
 * @returns {string} SVG string for difficulty bar
 */
const createDifficultyBar = ({ difficulty, solved, total, y, textColor }) => {
  const progress = calculateProgress(solved, total);
  const barWidth = 160;
  const progressWidth = (progress / 100) * barWidth;
  const color = DIFFICULTY_COLORS[difficulty.toLowerCase()];

  const capitalizedDifficulty =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return `
    <g transform="translate(0, ${y})">
      <text x="0" y="15" font-size="16" font-weight="600" fill="${textColor}">${capitalizedDifficulty}</text>
      <rect x="0" y="20" width="${barWidth}" height="6" rx="3" fill="rgba(125,125,125,0.2)"/>
      <rect x="0" y="20" width="${progressWidth}" height="6" rx="3" fill="${color}"/>
      <text x="${barWidth + 15}" y="15" font-size="16" font-weight="600" fill="${textColor}">${solved}/${total}</text>
    </g>
  `;
};

/**
 * Creates the central AC count circle.
 * @param {Object} params - Parameters for creating AC circle
 * @param {number} params.totalSolved - Total problems solved
 * @param {number} params.totalProblems - Total problems available
 * @param {string} params.textColor - Text color
 * @param {string} params.ringColor - Ring color
 * @returns {string} SVG string for AC circle
 */
const createACCircle = ({
  totalSolved,
  totalProblems,
  textColor,
  ringColor,
}) => {
  const progress = calculateProgress(totalSolved, totalProblems);
  const strokeDasharray = Math.PI * (45 * 2); // circumference
  const strokeDashoffset = calculateCircleProgress(progress);

  return `
    <g transform="translate(90, 140)">
      <!-- Background circle -->
      <circle 
        cx="0" cy="0" r="45" 
        fill="none" 
        stroke="rgba(125,125,125,0.2)" 
        stroke-width="8"
      />
      <!-- Progress circle -->
      <circle 
        cx="0" cy="0" r="45" 
        fill="none" 
        stroke="${ringColor}" 
        stroke-width="8" 
        stroke-linecap="round"
        stroke-dasharray="${strokeDasharray}"
        stroke-dashoffset="${strokeDashoffset}"
        transform="rotate(-90)"
        class="ac-progress-circle"
      />
      <!-- AC count text -->
      <text 
        x="0" y="8" 
        text-anchor="middle" 
        font-size="28" 
        font-weight="bold" 
        fill="${textColor}"
      >${kFormatter(totalSolved)}</text>
    </g>
  `;
};

/**
 * Get CSS styles for the card.
 * @param {Object} colors Card colors
 * @returns {string} CSS styles
 */
const getStyles = (colors) => {
  return `
    .card-title {
      font: 600 18px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
      fill: ${colors.titleColor};
    }
    .ranking-text {
      font: 600 16px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
      fill: ${colors.textColor};
    }
    .ac-progress-circle {
      animation: leetcode-progress 1s ease-in-out forwards;
    }
    @keyframes leetcode-progress {
      from {
        stroke-dashoffset: ${Math.PI * (45 * 2)};
      }
      to {
        stroke-dashoffset: var(--progress-offset);
      }
    }
    .difficulty-bar {
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }
    .difficulty-bar:nth-child(1) { animation-delay: 0.1s; }
    .difficulty-bar:nth-child(2) { animation-delay: 0.2s; }
    .difficulty-bar:nth-child(3) { animation-delay: 0.3s; }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
};

/**
 * Renders the LeetCode stats card.
 * @param {Object} data LeetCode stats data
 * @param {Object} data.profile User profile information
 * @param {string} data.profile.username Username
 * @param {Object} data.problem Problem statistics
 * @param {Object} data.problem.easy Easy problems stats
 * @param {Object} data.problem.medium Medium problems stats
 * @param {Object} data.problem.hard Hard problems stats
 * @param {number} data.problem.ranking User ranking
 * @param {Object} [options] Card options
 * @param {string} [options.theme] Theme name
 * @param {string} [options.title_color] Title color
 * @param {string} [options.text_color] Text color
 * @param {string} [options.icon_color] Icon color
 * @param {string} [options.ring_color] Ring color
 * @param {string} [options.bg_color] Background color
 * @param {string} [options.border_color] Border color
 * @param {boolean} [options.hide_border] Hide border
 * @param {boolean} [options.hide_title] Hide title
 * @param {string} [options.custom_title] Custom title
 * @param {string} [options.locale] Locale
 * @param {string|number} [options.card_width] Card width
 * @param {string|number} [options.border_radius] Border radius
 * @param {boolean} [options.disable_animations] Disable animations
 * @returns {string} SVG string
 */
export default function renderLeetCodeCard(data, options = {}) {
  const { profile, problem } = data;
  const { username } = profile;
  const { easy, medium, hard, ranking } = problem;

  const {
    theme = "default",
    title_color,
    text_color,
    icon_color,
    ring_color,
    bg_color,
    border_color,
    hide_border = false,
    hide_title = false,
    custom_title,
    locale = "en",
    card_width = 500,
    border_radius,
    disable_animations = false,
  } = options;

  // Calculate totals
  const totalSolved = easy.solved + medium.solved + hard.solved;
  const totalProblems = easy.total + medium.total + hard.total;

  // Set up internationalization
  const i18n = new I18n({
    locale,
    translations: {
      title: {
        en: "LeetCode Stats",
        cn: "LeetCode 统计",
        "zh-tw": "LeetCode 統計",
      },
      easy: { en: "Easy", cn: "简单", "zh-tw": "簡單" },
      medium: { en: "Medium", cn: "中等", "zh-tw": "中等" },
      hard: { en: "Hard", cn: "困难", "zh-tw": "困難" },
    },
  });

  // Get theme colors
  const colors = getCardColors({
    theme,
    title_color,
    text_color,
    icon_color,
    bg_color,
    border_color,
    ring_color,
  });

  // Create card instance
  const card = new Card({
    customTitle: custom_title,
    defaultTitle: `${username}${custom_title ? "" : "'s " + i18n.t("title")}`,
    width: Number(card_width),
    height: 280,
    border_radius: border_radius ? Number(border_radius) : undefined,
    colors,
  });

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(getStyles(colors));

  if (disable_animations) {
    card.disableAnimations();
  }

  // Create the card content
  const rankingDisplay = ranking ? `#${ranking}` : "";

  const difficultyBars = [
    createDifficultyBar({
      difficulty: i18n.t("easy"),
      solved: easy.solved,
      total: easy.total,
      y: 50,
      textColor: colors.textColor,
    }),
    createDifficultyBar({
      difficulty: i18n.t("medium"),
      solved: medium.solved,
      total: medium.total,
      y: 90,
      textColor: colors.textColor,
    }),
    createDifficultyBar({
      difficulty: i18n.t("hard"),
      solved: hard.solved,
      total: hard.total,
      y: 130,
      textColor: colors.textColor,
    }),
  ];

  const acCircle = createACCircle({
    totalSolved,
    totalProblems,
    textColor: colors.textColor,
    ringColor: colors.ringColor || colors.iconColor,
  });

  const body = `
    <style>
      .ac-progress-circle {
        --progress-offset: ${calculateCircleProgress(calculateProgress(totalSolved, totalProblems))};
      }
    </style>
    
    <!-- Ranking -->
    ${ranking && ranking > 0 ? `<text x="${Number(card_width) - 20}" y="30" text-anchor="end" class="ranking-text">${rankingDisplay}</text>` : ""}
    
    <!-- Left side: AC Circle -->
    ${acCircle}
    
    <!-- Right side: Difficulty Stats -->
    <g transform="translate(220, 40)" class="difficulty-stats">
      ${difficultyBars.map((bar) => `<g class="difficulty-bar">${bar}</g>`).join("")}
    </g>
  `;

  // Set accessibility label
  card.setAccessibilityLabel({
    title: `${username}'s LeetCode Stats${ranking && ranking > 0 ? `, Rank: ${ranking}` : ""}`,
    desc: `Total solved: ${totalSolved}/${totalProblems}, Easy: ${easy.solved}/${easy.total}, Medium: ${medium.solved}/${medium.total}, Hard: ${hard.solved}/${hard.total}`,
  });

  return card.render(body);
}
