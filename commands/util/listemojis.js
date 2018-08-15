const { Command } = require('discord.js-commando')

module.exports = class listemojisCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'listemojis',
      group: 'util',
      memberName: 'listemojis',
      description: 'http://go.blacklistener.tk/go/commands/listemojis',
      examples: ['listemojis', 'listemojis escape'],
      guildOnly: true,

      args: [{
        key: 'doEscape',
        prompt: '',
        type: 'string',
        default: false,
        parse: val => val === 'escape',
      }],
    })
  }

  async run(msg, args) {
    let emojiList = msg.guild.emojis.map(e => e.toString()).join(' ')
    if (args.doEscape) emojiList = `\`\`\`${emojiList}\`\`\``
    return await msg.channel.send(`${emojiList}`)
  }
}