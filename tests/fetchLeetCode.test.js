import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { CustomError } from "../src/common/utils.js";

// Mock the leetcode-query module at the top level
const mockLeetCodeCN = jest.fn();

jest.unstable_mockModule("leetcode-query", () => ({
  LeetCodeCN: mockLeetCodeCN,
}));

describe("LeetCode fetcher (CN only)", () => {
  let fetchLeetCodeStats;

  beforeAll(async () => {
    // Import the fetcher after setting up mocks
    fetchLeetCodeStats = (await import("../src/fetchers/leetcode-fetcher.js"))
      .default;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch AC count from CN region", async () => {
    // Create a mock class for this test
    const mockInstance = {
      async graphql() {
        return {
          data: {
            progress: {
              ac: [
                { difficulty: "EASY", count: 50 },
                { difficulty: "MEDIUM", count: 30 },
                { difficulty: "HARD", count: 10 },
              ],
              wa: [
                { difficulty: "EASY", count: 10 },
                { difficulty: "MEDIUM", count: 20 },
                { difficulty: "HARD", count: 5 },
              ],
              un: [
                { difficulty: "EASY", count: 40 },
                { difficulty: "MEDIUM", count: 150 },
                { difficulty: "HARD", count: 135 },
              ],
            },
            user: {
              username: "testuser",
              ranking: 12345,
              profile: {
                realname: "Test User",
                about: "A test user",
                avatar: "avatar-url",
                skills: ["JavaScript", "Python"],
                country: "USA",
              },
            },
            submissions: [
              {
                submissionId: "123",
                status: 10,
                lang: 1,
                submitTime: 1234567890,
                question: {
                  translatedTitle: "Two Sum",
                  titleSlug: "two-sum",
                },
              },
            ],
          },
        };
      },
    };

    mockLeetCodeCN.mockImplementation(() => mockInstance);

    const result = await fetchLeetCodeStats({ username: "testuser" });

    // Check problem stats
    expect(result.problem.easy.solved).toBe(50);
    expect(result.problem.easy.total).toBe(100);
    expect(result.problem.medium.solved).toBe(30);
    expect(result.problem.medium.total).toBe(200);
    expect(result.problem.hard.solved).toBe(10);
    expect(result.problem.hard.total).toBe(150);
    expect(result.problem.ranking).toBe(12345);

    // Check profile
    expect(result.profile.username).toBe("testuser");
    expect(result.profile.realname).toBe("Test User");
    expect(result.profile.about).toBe("A test user");
    expect(result.profile.avatar).toBe("avatar-url");
    expect(result.profile.skills).toEqual(["JavaScript", "Python"]);
    expect(result.profile.country).toBe("USA");

    // Check submissions
    expect(result.submissions.length).toBe(1);
    expect(result.submissions[0].status).toBe("Accepted");
    expect(result.submissions[0].lang).toBe("Java");
  });

  it("should throw error if username missing", async () => {
    const mockInstance = {};
    mockLeetCodeCN.mockImplementation(() => mockInstance);

    await expect(fetchLeetCodeStats({ username: "" })).rejects.toThrow(
      CustomError,
    );
  });

  it("should throw error if user not found (cn)", async () => {
    const mockInstance = {
      async graphql() {
        return { data: null };
      },
    };
    mockLeetCodeCN.mockImplementation(() => mockInstance);

    await expect(fetchLeetCodeStats({ username: "nouser" })).rejects.toThrow(
      CustomError,
    );
  });

  it("should handle submissions with unknown status or language", async () => {
    // Create a mock class for this test
    const mockInstance = {
      async graphql() {
        return {
          data: {
            progress: {
              ac: [{ difficulty: "EASY", count: 1 }],
              wa: [],
              un: [],
            },
            user: {
              username: "testuser",
              ranking: 1,
              profile: {
                realname: "",
                about: "",
                avatar: "",
                skills: [],
                country: "",
              },
            },
            submissions: [
              {
                submissionId: "999",
                status: 999, // Unknown status
                lang: 999, // Unknown language
                submitTime: 1234567890,
                question: {
                  translatedTitle: "Unknown Problem",
                  titleSlug: "unknown-problem",
                },
              },
            ],
          },
        };
      },
    };

    mockLeetCodeCN.mockImplementation(() => mockInstance);

    const result = await fetchLeetCodeStats({ username: "testuser" });

    // Check submissions with unknown values
    expect(result.submissions.length).toBe(1);
    expect(result.submissions[0].status).toBe(""); // Unknown status should be empty string
    expect(result.submissions[0].lang).toBe(""); // Unknown language should be empty string
  });
});
