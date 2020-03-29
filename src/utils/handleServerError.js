const CommandError = require('./CommandError')

module.exports = error => {
  if (error instanceof CommandError) {
    throw error
  } else if (error.response && error.response.errors) {
    const serverErrors = JSON.stringify(error.response.errors, undefined, 2)
    console.error(`MemeBot API server error: ${serverErrors}`)
  } else {
    console.error(error)
  }
  throw new CommandError('Something went wrong')
}
