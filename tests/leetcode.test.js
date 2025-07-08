import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

// Mock the fetcher at the top level
const mockFetchLeetCodeStats = jest.fn();

jest.unstable_mockModule("../src/fetchers/leetcode-fetcher.js", () => ({
  default: mockFetchLeetCodeStats,
}));

const faker = (query = {}) => {
  const req = { query: { username: "testuser", ...query } };
  const res = {
    setHeader: jest.fn(),
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };
  return { req, res };
};

const mockLeetCodeData = {
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
  ],
};

describe("LeetCode API", () => {
  let api;

  beforeAll(async () => {
    // Import the API after setting up mocks
    api = (await import("../api/leetcode.js")).default;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return SVG with problem statistics", async () => {
    mockFetchLeetCodeStats.mockResolvedValue(mockLeetCodeData);

    const { req, res } = faker();
    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "public, max-age=1800, s-maxage=1800",
    );

    const svgContent = res.send.mock.calls[0][0];
    expect(svgContent).toContain("testuser");
    expect(svgContent).toContain("Easy");
    expect(svgContent).toContain("Medium");
    expect(svgContent).toContain("Hard");
    expect(svgContent).toContain("50/100");
    expect(svgContent).toContain("30/200");
    expect(svgContent).toContain("10/150");
    expect(svgContent).toContain("#12345");
    // Check for submissions content
    expect(svgContent).toContain("Recent Submissions");
    expect(svgContent).toContain("Two Sum");
  });

  it("should return 400 if username missing", async () => {
    const req = { query: {} };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    await api(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Missing username");
  });

  it("should return 404 if fetcher throws", async () => {
    mockFetchLeetCodeStats.mockRejectedValue(new Error("User not found"));

    const { req, res } = faker();
    await api(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("User not found");
  });

  it("should handle custom options", async () => {
    mockFetchLeetCodeStats.mockResolvedValue(mockLeetCodeData);

    const { req, res } = faker({
      theme: "dark",
      card_width: "600",
      hide_border: "true",
      custom_title: "My Stats",
      locale: "cn",
    });
    await api(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    const svgContent = res.send.mock.calls[0][0];
    expect(svgContent).toContain("testuser");
  });

  it("should handle zero solved problems", async () => {
    const zeroData = {
      ...mockLeetCodeData,
      problem: {
        easy: { solved: 0, total: 100 },
        medium: { solved: 0, total: 200 },
        hard: { solved: 0, total: 150 },
        ranking: null,
      },
    };

    mockFetchLeetCodeStats.mockResolvedValue(zeroData);

    const { req, res } = faker();
    await api(req, res);

    const svgContent = res.send.mock.calls[0][0];
    expect(svgContent).toContain("0/100");
    expect(svgContent).toContain("0/200");
    expect(svgContent).toContain("0/150");
  });

  // New tests for submission-related parameters
  it("should hide submissions when hide_submissions is true", async () => {
    mockFetchLeetCodeStats.mockResolvedValue(mockLeetCodeData);

    const { req, res } = faker({
      hide_submissions: "true",
    });
    await api(req, res);

    const svgContent = res.send.mock.calls[0][0];
    // Instead of checking for absence of text, check that the submissions section is not rendered
    expect(svgContent).not.toContain('<g class="submissions-section">');
    expect(svgContent).not.toContain('class="submission-item"');
    // The title "Two Sum" might still appear in the accessibility description
    expect(svgContent).not.toContain(
      '<text x="0" y="12" font-size="13" font-weight="500"',
    );
  });

  it("should limit submissions based on submissions_limit", async () => {
    mockFetchLeetCodeStats.mockResolvedValue(mockLeetCodeData);

    const { req, res } = faker({
      submissions_limit: "2",
    });
    await api(req, res);

    const svgContent = res.send.mock.calls[0][0];
    expect(svgContent).toContain("Two Sum");
    expect(svgContent).toContain("Add Two Numbers");
    expect(svgContent).not.toContain("Longest Substring");
  });

  it("should handle all custom options including submission options", async () => {
    mockFetchLeetCodeStats.mockResolvedValue(mockLeetCodeData);

    const { req, res } = faker({
      theme: "dark",
      card_width: "700",
      hide_border: "true",
      custom_title: "My LeetCode Stats",
      locale: "cn",
      hide_submissions: "false",
      submissions_limit: "1",
    });
    await api(req, res);

    const svgContent = res.send.mock.calls[0][0];
    expect(svgContent).toContain("My LeetCode Stats");
    expect(svgContent).toContain("Two Sum");
    expect(svgContent).not.toContain("Add Two Numbers");
  });
});
