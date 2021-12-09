import { Octokit } from "@octokit/action";

const octokit = new Octokit();
console.log(octokit);

const response = await octokit.graphql(
  `query ($login: String!) {
    organization(login: $login) {
      repositories() {
        totalCount
      }
    }
  }`
);
