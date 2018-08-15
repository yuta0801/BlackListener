const { Command } = require('discord.js-commando')
const lang = require('../../lang/ja.json')

module.exports = class bannedCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'banned',
      group: 'util',
      memberName: 'banned',
      description: '',
    })
  }

  async run(msg) {
    return await msg.channel.send(lang.wrong_banned)
  }
}
