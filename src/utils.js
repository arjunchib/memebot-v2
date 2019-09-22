module.exports = {
  codeBlockify: (str, lang = 'javascript') => `\`\`\`${lang}
${str}\`\`\``
}
