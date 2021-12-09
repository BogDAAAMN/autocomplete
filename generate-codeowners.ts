import { Octokit } from "@octokit/action";

const octokit = new Octokit();

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const [refs, pull, prNumber, merge] = process.env.GITHUB_REF.split("/");

const run = async () => {
  const commentsResponse = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner,
      repo,
      issue_number: Number(prNumber),
    }
  );

  const reactionsUrls = commentsResponse.data
    .filter((comment) => {
      return (
        comment.user.login == "withfig-bot" &&
        comment.body.startsWith("# CODEOWNERS") &&
        comment.reactions["+1"] > 0
      );
    })
    .map((comment) => {
      return comment.reactions.url;
    });

  console.log(reactionsUrls);
  console.log(owner, repo, refs, pull, prNumber, merge);
};

run();
