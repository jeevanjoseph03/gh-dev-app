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
    await context.octokit.issues.createComment(issueComment);
  });
};
