/**
 * A simple GitHub App built with Probot
 * Automatically comments on newly opened issues
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log.info("GitHub App is loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for the report!",
    });
    try {
      await context.octokit.issues.createComment(issueComment);
    } catch (error) {
      context.log.error(
        error,
        "Failed to create comment on issue #%d",
        context.payload.issue.number
      );
    }
  });
};
