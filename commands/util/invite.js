const { Command } = require('discord.js-commando')
const lang = require('../../lang/ja.json')
const f = require('string-format')
const secret = require('../../secret.json5')

module.exports = class inviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'util',
      memberName: 'invite',
      description: 'http://go.blacklistener.tk/go/commands/invite',
    })
  }

  async run(msg) {
    return await msg.channel.send(f(lang.invite_bot, secret.inviteme))
  }
}
