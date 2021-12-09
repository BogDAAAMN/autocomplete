import { Octokit } from "@octokit/action";

const octokit = new Octokit();
console.log(octokit);

const run = async () => {
  const response = await octokit.graphql(
    `query ($login: String!) {
          organization(login: $login) {
            repositories() {
              totalCount
            }
          }
        }`
  );
  console.log(response);
};

run();
