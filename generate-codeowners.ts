import { Octokit } from "@octokit/action";

const octokit = new Octokit();

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const [refs, pull, prNumber, merge] = process.env.GITHUB_REF.split("/");

const run = async () => {
  //   const response = await octokit.graphql(
  //     `query ($login: String!) {
  //           organization(login: $login) {
  //             repositories() {
  //               totalCount
  //             }
  //           }
  //         }`
  //   );
  //   console.log(response);

  console.log(owner, repo, refs, pull, prNumber, merge);
};

run();
