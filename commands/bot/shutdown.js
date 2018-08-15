const { Command } = require('discord.js-commando')
// const logger = require('./logger')
const lang = require('../../lang/ja.json')
const f = require('string-format')

module.exports = class ShutdownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shutdown',
      group: 'bot',
      memberName: 'shutdown',
      description: 'http://go.blacklistener.tk/go/commands/shutdown',
      ownerOnly: true,

      args: [{
        key: 'type',
        prompt: '',
        type: 'string',
        default: '',
      }],
    })
  }

  async run(msg, args) {
    if (args.type == '-r') {
      // logger.info(f(lang.rebooting))
      await msg.channel.send(lang.rebooting)
      process.kill(process.pid, 'SIGKILL')
    } else {
      // if (args.type == '-f') logger.info(f(lang.atmpfs, msg.author.tag))
      // else logger.info(f(lang.success, msg.content))
      msg.channel.send(lang.bye)
      this.client.destroy()
    }
  }
}
