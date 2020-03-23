const CommandError = require('./CommandError')

module.exports = error => {
  if (error.response && error.response.errors) {
    const serverErrors = JSON.stringify(error.response.errors, undefined, 2)
    console.error(`MemeBot API server error: ${serverErrors}`)
  } else {
    console.error(JSON.stringify(error, undefined, 2))
  }
  throw new CommandError('Something went wrong')
}
