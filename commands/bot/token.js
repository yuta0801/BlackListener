const { Command } = require('discord.js-commando')
const { DMChannel } = require('discord.js')
const lang = require('../../lang/ja.json')
const f = require('string-format')

module.exports = class tokenCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'token',
      group: 'bot',
      memberName: 'token',
      description: 'http://go.blacklistener.tk/go/commands/token',
      ownerOnly: true,
    })
  }

  async run(msg) {
    msg.author.send(f(lang.mytoken, this.client.token))
    if (!(msg.channel instanceof DMChannel)) msg.reply(lang.senttodm)
    if (msg.deletable) msg.delete()
  }
}