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
  submissions: [],
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
});
