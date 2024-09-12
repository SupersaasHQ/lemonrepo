import { Octokit } from "@octokit/rest";

class GitHub {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async getUser(username: string) {
    const { data } = await this.octokit.request("GET /users/{username}", {
      username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return data;
  }

  async inviteToRepository(owner: string, repo: string, username: string) {
    const { data } = await this.octokit.request(
      "PUT /repos/{owner}/{repo}/collaborators/{username}",
      {
        owner,
        repo,
        username,
        permission: "read",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    return data;
  }

  async getRepoCommits(owner: string, repo: string) {
    const response = await this.octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner,
        repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const commits = response.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author?.name ?? "Unknown",
      date: commit.commit.author?.date ?? null,
    }));
    return commits;
  }

  async getRepoIssues(
    owner: string,
    repo: string,
    state: "open" | "closed" | "all" = "open"
  ) {
    const { data } = await this.octokit.request(
      "GET /repos/{owner}/{repo}/issues",
      {
        owner,
        repo,
        state,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

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
}

export const Github = new GitHub();
