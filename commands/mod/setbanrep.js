const { Command } = require('discord.js-commando')
const lang = require('../../lang/ja.json')
const util = require('../../util')
const { defaultSettings } = require('../../contents')

module.exports = class setbanrepCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setbanrep',
      group: 'mod',
      memberName: 'setbanrep',
      description: 'http://go.blacklistener.tk/go/commands/setbanrep',
      examples: ['setbanrep 1'],
      guildOnly: true,

      args: [{
        key: 'n',
        prompt: 'BANする評価値を入力してください (0-10)',
        error: lang.invalid_args,
        type: 'integer',
        max: 10,
        min: 0,
      }],
    })
  }

  async run(msg, args) {
    const guildSettings = `./data/servers/${msg.guild.id}/config.json`
    const settings = await util.readJSON(guildSettings, defaultSettings)
    settings.notifyRep = args.n
    await util.writeSettings(guildSettings, settings, msg.channel, 'notifyRep')
  }
}