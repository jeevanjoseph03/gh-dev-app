/**
 * A comprehensive GitHub App built with Probot
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log.info('GitHub App is loaded!')

  // Load handlers
  const issueOpenedHandler = require('./src/handlers/issueOpened')
  const autoLabelHandler = require('./src/handlers/autoLabel')
  const welcomeHandler = require('./src/handlers/welcome')
  const prSizeHandler = require('./src/handlers/prSize')

  // Register event listeners
  app.on('issues.opened', issueOpenedHandler)
  app.on(['issues.opened', 'issues.edited'], autoLabelHandler)
  app.on(['issues.opened', 'pull_request.opened'], welcomeHandler)
  app.on(['pull_request.opened', 'pull_request.synchronize'], prSizeHandler)
}
