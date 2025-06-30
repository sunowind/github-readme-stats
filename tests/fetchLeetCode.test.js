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
      async graphql(args) {
        if (args.variables.username === "testuser") {
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
        }
        return { data: null };
      },
    };

    mockLeetCodeCN.mockImplementation(() => mockInstance);

    const result = await fetchLeetCodeStats({ username: "testuser" });
    expect(result).toMatchObject({
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
    });
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
});
