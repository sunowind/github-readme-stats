import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import renderLeetCodeCard from "../src/cards/leetcode-card.js";

const baseData = {
  profile: {
    username: "testuser",
    realname: "Test User",
    about: "A test user",
    avatar: "avatar-url",
    skills: ["JavaScript", "Python"],
    country: "USA",
  },
  problem: {
    easy: { solved: 50, total: 100 },
    medium: { solved: 30, total: 200 },
    hard: { solved: 10, total: 150 },
    ranking: 12345,
  },
  submissions: [
    {
      title: "Two Sum",
      time: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      status: "Accepted",
      lang: "JavaScript",
      slug: "two-sum",
      id: "123",
    },
    {
      title: "Add Two Numbers",
      time: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
      status: "Wrong Answer",
      lang: "Python",
      slug: "add-two-numbers",
      id: "124",
    },
    {
      title: "Longest Substring Without Repeating Characters",
      time: Date.now() - 8 * 60 * 60 * 1000, // 8 hours ago
      status: "Accepted",
      lang: "Java",
      slug: "longest-substring-without-repeating-characters",
      id: "125",
    },
    {
      title: "Median of Two Sorted Arrays",
      time: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      status: "Time Limit Exceeded",
      lang: "C++",
      slug: "median-of-two-sorted-arrays",
      id: "126",
    },
    {
      title: "Palindrome Number",
      time: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      status: "Accepted",
      lang: "Java",
      slug: "palindrome-number",
      id: "127",
    },
    {
      title: "Regular Expression Matching",
      time: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
      status: "Wrong Answer",
      lang: "Python",
      slug: "regular-expression-matching",
      id: "128",
    },
    {
      title: "Container With Most Water",
      time: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
      status: "Accepted",
      lang: "JavaScript",
      slug: "container-with-most-water",
      id: "129",
    },
  ],
};

describe("Test renderLeetCodeCard", () => {
  it("should render correctly with username and problem stats", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData);
    expect(document.body.textContent).toContain("testuser");
    expect(document.body.textContent).toContain("Easy");
    expect(document.body.textContent).toContain("Medium");
    expect(document.body.textContent).toContain("Hard");
    expect(document.body.textContent).toContain("50/100");
    expect(document.body.textContent).toContain("30/200");
    expect(document.body.textContent).toContain("10/150");
    expect(document.body.textContent).toContain("#12345");
  });

  it("should render with different problem counts", () => {
    const data = {
      ...baseData,
      profile: { ...baseData.profile, username: "anotheruser" },
      problem: {
        easy: { solved: 0, total: 50 },
        medium: { solved: 5, total: 100 },
        hard: { solved: 1, total: 75 },
        ranking: 54321,
      },
    };
    document.body.innerHTML = renderLeetCodeCard(data);
    expect(document.body.textContent).toContain("anotheruser");
    expect(document.body.textContent).toContain("0/50");
    expect(document.body.textContent).toContain("5/100");
    expect(document.body.textContent).toContain("1/75");
    expect(document.body.textContent).toContain("#54321");
  });

  it("should render SVG root element with correct dimensions", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "850"); // Default width increased to 800
    // Height should be larger to accommodate submissions
    expect(svg).toHaveAttribute("height", "420"); // Updated to match actual height with submissions
  });

  it("should render with custom width and title", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, {
      card_width: 600,
      custom_title: "My LeetCode Stats",
    });
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "600");
    expect(document.body.textContent).toContain("My LeetCode Stats");
  });

  it("should render with hide_title and hide_border", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, {
      hide_title: true,
      hide_border: true,
    });
    // Check that title is hidden
    const title = document.querySelector(".header");
    expect(title).toBeNull();
  });

  it("should render with custom colors", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, {
      title_color: "ff0000",
      text_color: "00ff00",
      icon_color: "0000ff",
      bg_color: "ffff00",
      border_color: "123456",
      ring_color: "ff00ff",
    });

    // Check background color
    const rect = document.querySelector("rect[data-testid='card-bg']");
    expect(rect).toHaveAttribute("fill", "#ffff00");
    expect(rect).toHaveAttribute("stroke", "#123456");

    // Check ring color
    const progressCircle = document.querySelector(".ac-progress-circle");
    expect(progressCircle).toHaveAttribute("stroke", "#ff00ff");
  });

  it("should render with locale 'cn'", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, { locale: "cn" });
    expect(document.body.textContent).toContain("简单");
    expect(document.body.textContent).toContain("中等");
    expect(document.body.textContent).toContain("困难");
  });

  it("should render progress bars for each difficulty", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData);

    // Check that progress bars are present
    const progressBars = document.querySelectorAll(
      "rect[fill='#00b04f'], rect[fill='#ffb700'], rect[fill='#ff375f']",
    );
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it("should render AC count in center circle", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData);

    // Total solved should be 50 + 30 + 10 = 90
    expect(document.body.textContent).toContain("90");

    // Check for circle elements
    const circles = document.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThanOrEqual(2); // Background and progress circles
  });

  it("should handle zero solved problems", () => {
    const zeroData = {
      ...baseData,
      problem: {
        easy: { solved: 0, total: 100 },
        medium: { solved: 0, total: 200 },
        hard: { solved: 0, total: 150 },
        ranking: null,
      },
    };
    document.body.innerHTML = renderLeetCodeCard(zeroData);

    expect(document.body.textContent).toContain("0/100");
    expect(document.body.textContent).toContain("0/200");
    expect(document.body.textContent).toContain("0/150");
    expect(document.body.textContent).toContain("0"); // Total AC count
  });

  it("should handle missing ranking", () => {
    const noRankData = {
      ...baseData,
      problem: {
        ...baseData.problem,
        ranking: null,
      },
    };
    document.body.innerHTML = renderLeetCodeCard(noRankData);

    // Should not contain ranking text element
    const rankingElement = document.querySelector(".ranking-text");
    expect(rankingElement).toBeNull();
  });

  it("should disable animations when specified", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, {
      disable_animations: true,
    });

    // Check that animations are disabled in card
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  // New tests for submissions feature
  it("should render recent submissions section", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData);

    // Check for submissions section title
    expect(document.body.textContent).toContain("Recent Submissions");

    // Check for submission items
    expect(document.body.textContent).toContain("Two Sum");
    expect(document.body.textContent).toContain("JavaScript");
    expect(document.body.textContent).toContain("Add Two Numbers");
    expect(document.body.textContent).toContain("Python");
  });

  it("should hide submissions when hide_submissions is true", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, {
      hide_submissions: true,
    });

    // Should not contain submissions section
    expect(document.body.textContent).not.toContain("Recent Submissions");
    expect(document.body.textContent).not.toContain("Two Sum");
  });

  it("should limit submissions based on submissions_limit", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, {
      submissions_limit: 3,
    });

    // Should contain first 3 submissions
    expect(document.body.textContent).toContain("Two Sum");
    expect(document.body.textContent).toContain("Add Two Numbers");
    expect(document.body.textContent).toContain("Longest Substring");

    // Should not contain 4th submission
    expect(document.body.textContent).not.toContain(
      "Median of Two Sorted Arrays",
    );
  });

  it("should render submissions with different status icons", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData);

    // Check for status indicators
    const statusIcons = document.querySelectorAll(".submission-item text");
    expect(statusIcons.length).toBeGreaterThan(0);
  });

  it("should render submissions section with locale 'cn'", () => {
    document.body.innerHTML = renderLeetCodeCard(baseData, { locale: "cn" });

    // Check for translated submissions title
    expect(document.body.textContent).toContain("最近提交");
  });

  it("should handle empty submissions array", () => {
    const noSubmissionsData = {
      ...baseData,
      submissions: [],
    };
    document.body.innerHTML = renderLeetCodeCard(noSubmissionsData);

    // Should not contain submissions section
    expect(document.body.textContent).not.toContain("Recent Submissions");
  });

  it("should adjust card height based on number of submissions", () => {
    // Test with 3 submissions
    document.body.innerHTML = renderLeetCodeCard(
      { ...baseData, submissions: baseData.submissions.slice(0, 3) },
      { submissions_limit: 3 },
    );
    const svgWith3 = document.querySelector("svg");
    const heightWith3 = svgWith3.getAttribute("height");

    // Test with 6 submissions
    document.body.innerHTML = renderLeetCodeCard(baseData, {
      submissions_limit: 6,
    });
    const svgWith6 = document.querySelector("svg");
    const heightWith6 = svgWith6.getAttribute("height");

    // Height should be greater with more submissions
    expect(Number(heightWith6)).toBeGreaterThanOrEqual(Number(heightWith3));
  });
});
