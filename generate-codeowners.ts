import { Octokit } from "@octokit/action";

const octokit = new Octokit();

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const [refs, pull, prNumber, merge] = process.env.GITHUB_REF.split("/");

const run = async () => {
  const response = await octokit.graphql(
    `
    query ($owner: String!, $name: String!, $prNumber: Int!) {
        repository(owner: $owner, name: $name) {
          pullRequest(number: $prNumber) {
            comments(first: 100) {
              edges {
                node {
                  reactions(last: 100) {
                    nodes {
                      content
                      user {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    {
      owner,
      name: repo,
      prNumber,
    }
  );

  console.log(response);
  console.log(owner, repo, refs, pull, prNumber, merge);
};

run();
