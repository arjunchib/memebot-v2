function getAliases(args) {
  const aliases = []

  for (let i = 4; i < args.length; i++) {
    aliases.push(args[i])
  }

  return aliases
}

module.exports = getAliases
