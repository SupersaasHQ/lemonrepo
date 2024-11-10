import { Octokit } from "@octokit/rest";
const config = useRuntimeConfig();

const octokit = new Octokit({
  auth: config.githubToken,
});

const API_VERSION = "2022-11-28";
const defaultHeaders = {
  "X-GitHub-Api-Version": API_VERSION,
};

export async function getUser(username: string) {
  const { data } = await octokit.request("GET /users/{username}", {
    username,
    headers: defaultHeaders,
  });
  return data;
}

export async function inviteToRepository(owner: string, repo: string, username: string) {
  console.log(
    `inviteToRepository method called with owner: ${owner}, repo: ${repo}, username: ${username}`
  );
  try {
    const { data } = await octokit.request(
      "PUT /repos/{owner}/{repo}/collaborators/{username}",
      {
        owner,
        repo,
        username,
        permission: "read",
        headers: defaultHeaders,
      }
    );
    return data;
  } catch (error) {
    console.error("Error inviting to repository:", error);
    throw error;
  }
}

export async function getRepoCommits(owner: string, repo: string) {
  const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner,
    repo,
    headers: defaultHeaders,
  });

  return response.data.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author?.name ?? "Unknown",
    date: commit.commit.author?.date ?? null,
  }));
}

export async function getRepoIssues(
  owner: string,
  repo: string,
  state: "open" | "closed" | "all" = "open"
) {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    state,
    headers: defaultHeaders,
  });

  return data.map((issue) => ({
    number: issue.number,
    title: issue.title,
    state: issue.state,
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    closedAt: issue.closed_at,
    author: issue.user?.login ?? "Unknown",
  }));
}
