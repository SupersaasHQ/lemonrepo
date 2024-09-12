// Delete this file when you have a real API
import testCommits from "./test-commits";

// import { Github } from "@@/server/utils/github";
// const config = useRuntimeConfig();

export default defineEventHandler(async () => {
  // TODO: Implement real API
  return testCommits;
  // TODO: Uncomment this when you have a real API
  // return Github.getRepoCommits(config.githubOwner, config.githubRepo);
});
