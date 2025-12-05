/**
 * Handle "issues.opened" and "issues.edited" events to auto-label
 * @param {import('probot').Context} context
 */
module.exports = async (context) => {
  const { title, body } = context.payload.issue
  const labelsToAdd = []

  // Combine title and body for searching
  const content = (title + ' ' + (body || '')).toLowerCase()

  // Define keywords and their corresponding labels
  const keywordMap = {
    bug: ['bug', 'error', 'fail', 'crash', 'broken'],
    enhancement: ['feature', 'enhancement', 'request', 'add', 'improve'],
    question: ['help', 'question', 'how to', 'support'],
    documentation: ['docs', 'documentation', 'typo', 'readme']
  }

  // Check for keywords
  for (const [label, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((keyword) => content.includes(keyword))) {
      labelsToAdd.push(label)
    }
  }

  if (labelsToAdd.length > 0) {
    try {
      await context.octokit.issues.addLabels(context.issue({
        labels: labelsToAdd
      }))
      context.log.info(`Added labels: ${labelsToAdd.join(', ')} to issue #${context.payload.issue.number}`)
    } catch (error) {
      context.log.error(error, 'Failed to add labels')
    }
  }
}
