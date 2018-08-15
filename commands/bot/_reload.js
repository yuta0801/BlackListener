const { Command } = require('discord.js-commando')
// const logger = require('./logger')
const lang = require('../../lang/ja.json')

module.exports = class reloadCommand extends Command {
  constructor(client) {
    super(client, {
      name: '_reload',
      group: 'bot',
      memberName: '_reload',
      description: 'http://go.blacklistener.tk/go/commands/reload',
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
    // logger.info('Reloading!')
    if (args.type === 'restart') {
      await msg.channel.send(lang.rebooting)
      return process.kill(process.pid, 'SIGKILL')
    }
    // delete require.cache[require.resolve(guildSettings)]
    // delete require.cache[require.resolve(userFile)]
    // delete require.cache[require.resolve(bansFile)]
    // delete require.cache[require.resolve('./lang/ja.json')]
    // delete require.cache[require.resolve('./lang/en.json')]
    return await msg.channel.send(':ok_hand:')
  }
}
