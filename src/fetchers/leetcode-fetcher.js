// @ts-check
import { LeetCodeCN } from "leetcode-query";
import { CustomError } from "../common/utils.js";

// LeetCode CN result status mapping
const CN_RESULTS_MAP = {
  0: "Wrong Answer",
  10: "Accepted",
  11: "Wrong Answer",
  12: "Memory Limit Exceeded",
  13: "Output Limit Exceeded",
  14: "Time Limit Exceeded",
  15: "Runtime Error",
  16: "Internal Error",
  17: "Compile Error",
  18: "Unknown Error",
  19: "Security Error",
  20: "Wrong Answer",
  21: "Wrong Answer",
  22: "Presentation Error",
  23: "Presentation Error",
};

// LeetCode CN language mapping
const CN_LANGS_MAP = {
  0: "C++",
  1: "Java",
  2: "Python",
  3: "C",
  4: "C#",
  5: "JavaScript",
  6: "Ruby",
  7: "Swift",
  8: "Go",
  9: "Scala",
  10: "Kotlin",
  11: "Rust",
  12: "PHP",
  13: "TypeScript",
  14: "Racket",
  15: "Erlang",
  16: "Elixir",
  17: "Dart",
};

/**
 * Get problem statistics for a specific difficulty level.
 * @param {string} difficulty - Difficulty level (EASY, MEDIUM, HARD)
 * @param {Object} progress - Progress data from LeetCode API
 * @returns {Object} Object with solved and total counts
 */
function getCNProblemStats(difficulty, progress) {
  return {
    solved:
      progress.ac.find((x) => x.difficulty === difficulty.toUpperCase())
        ?.count || 0,
    total: Object.values(progress).reduce(
      (acc, arr) =>
        acc +
        (arr.find((x) => x.difficulty === difficulty.toUpperCase())?.count ||
          0),
      0,
    ),
  };
}

/**
 * Fetch LeetCode stats for a user (CN region only).
 * @param {Object} params - Parameters for fetching LeetCode stats
 * @param {string} params.username - LeetCode username
 * @returns {Promise<Object>} Promise resolving to LeetCode user data
 */
export default async function fetchLeetCodeStats({ username }) {
  if (!username) {
    throw new CustomError("Missing username", "MissingParamError");
  }
  try {
    const lc = new LeetCodeCN();
    const { data } = await lc.graphql({
      variables: { username },
      query: `
            query data($username: String!) {
                progress: userProfileUserQuestionProgress(userSlug: $username) {
                    ac: numAcceptedQuestions { difficulty count }
                    wa: numFailedQuestions { difficulty count }
                    un: numUntouchedQuestions { difficulty count }
                }
                user: userProfilePublicProfile(userSlug: $username) {
                    username 
                    ranking: siteRanking
                    profile { 
                        realname: realName 
                        about: aboutMe 
                        avatar: userAvatar 
                        skills: skillTags 
                        country: countryName
                    }
                }
                submissions: recentSubmitted(userSlug: $username) {
                    id: submissionId
                    status
                    lang 
                    time: submitTime
                    question { 
                        title: translatedTitle 
                        slug: titleSlug 
                    }
                }
            }`,
    });
    if (!data || !data.user) {
      throw new CustomError("User not found", "UserNotFound");
    }

    const result = {
      profile: {
        username: data.user.username,
        realname: data.user.profile.realname,
        about: data.user.profile.about,
        avatar: data.user.profile.avatar,
        skills: data.user.profile.skills,
        country: data.user.profile.country,
      },
      problem: {
        easy: getCNProblemStats("EASY", data.progress),
        medium: getCNProblemStats("MEDIUM", data.progress),
        hard: getCNProblemStats("HARD", data.progress),
        ranking: data.user.ranking,
      },
      submissions: data.submissions.map((x) => ({
        title: x.question.title,
        time: x.time * 1000,
        status: CN_RESULTS_MAP[x.status] || "",
        lang: CN_LANGS_MAP[x.lang] || "",
        slug: x.question.slug,
        id: x.id,
      })),
    };

    return result;
  } catch (e) {
    if (e instanceof CustomError) {
      throw e;
    }
    throw new CustomError(e.message || "Unknown error", "LeetCodeFetcherError");
  }
}
