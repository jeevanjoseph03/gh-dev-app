/**
 * Welcome first-time contributors
 * @param {import('probot').Context} context
 */
module.exports = async (context) => {
  // Check if the user is a first-time contributor
  // author_association can be: COLLABORATOR, CONTRIBUTOR, FIRST_TIMER, FIRST_TIME_CONTRIBUTOR, MEMBER, NONE, OWNER
  const { author_association } = context.payload.issue || context.payload.pull_request

  if (author_association === 'FIRST_TIMER' || author_association === 'FIRST_TIME_CONTRIBUTOR') {
    const welcomeMessage = context.issue({
      body: "🎉 Welcome! Thanks for your first contribution to this repository. We're excited to have you here!"
    })

    try {
      await context.octokit.issues.createComment(welcomeMessage)
    } catch (error) {
      context.log.error(error, 'Failed to create welcome comment')
    }
  }
}
