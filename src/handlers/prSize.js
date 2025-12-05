/**
 * Warn if a Pull Request is too large
 * @param {import('probot').Context} context
 */
module.exports = async (context) => {
  const pullRequest = context.payload.pull_request

  // Threshold for "too large"
  const LINE_CHANGE_THRESHOLD = 500

  // Calculate total changes
  const totalChanges = pullRequest.additions + pullRequest.deletions

  if (totalChanges > LINE_CHANGE_THRESHOLD) {
    const warningComment = context.issue({
      body: `⚠️ **Large PR Warning**\n\nThis Pull Request changes ${totalChanges} lines of code. Large PRs are harder to review and more prone to bugs. Please consider breaking this into smaller PRs if possible.`
    })

    try {
      await context.octokit.issues.createComment(warningComment)
    } catch (error) {
      context.log.error(error, 'Failed to create PR size warning')
    }
  }
}
