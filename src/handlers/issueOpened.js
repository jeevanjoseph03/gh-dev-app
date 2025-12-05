/**
 * Handle "issues.opened" event
 * @param {import('probot').Context} context
 */
module.exports = async (context) => {
  const issueComment = context.issue({
    body: 'Thanks for opening this issue! A maintainer will look into it shortly.'
  })

  try {
    await context.octokit.issues.createComment(issueComment)
  } catch (error) {
    context.log.error(error, 'Failed to create comment')
  }
}
