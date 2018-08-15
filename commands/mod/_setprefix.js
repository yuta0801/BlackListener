const { Command } = require('discord.js-commando')
const config = require('../../config.json5')
const lang = require('../../lang/ja.json')
const util = require('../../util')
const { defaultSettings } = require('../../contents')

module.exports = class setprefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: '_setprefix',
      aliases: ['_prefix'],
      group: 'mod',
      memberName: '_setprefix',
      description: 'http://go.blacklistener.tk/go/commands/setprefix',
      examples: ['setprefix /'],
      guildOnly: true,

      args: [{
        key: 'prefix',
        prompt: '',
        type: 'string',
        default: '',
      }],
    })
  }

  async run(msg, args) {
    if (args.prefix && /\s/gm.test(args.prefix)) return msg.channel.send(lang.cannotspace)
    const guildSettings = `./data/servers/${msg.guild.id}/config.json`
    const settings = await util.readJSON(guildSettings, defaultSettings)
    settings.prefix = args.prefix || config.prefix
    await util.writeSettings(guildSettings, settings, msg.channel, 'prefix')
  }
}
