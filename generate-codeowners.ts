import { Octokit } from "@octokit/action";

const octokit = new Octokit();

const FIG_BOT_USERNAME = "BogDAAAMN";

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

  const reactedComments = commentsResponse.data.filter((comment) => {
    return (
      comment.user.login == FIG_BOT_USERNAME &&
      comment.body.startsWith("# CODEOWNERS") &&
      comment.reactions["+1"] > 0
    );
  });

  const reactionsUsers = reactedComments.map(async (comment) => {
    const reactionsResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
      {
        owner,
        repo,
        comment_id: comment.id,
      }
    );

    return reactionsResponse.data.map((reaction) => {
      return {
        user: reaction.user,
        content: reaction.content,
      };
    });
  });

  console.log(reactionsUsers);
  console.log(owner, repo, refs, pull, prNumber, merge);
};

run();
