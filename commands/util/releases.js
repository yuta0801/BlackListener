const { Command } = require('discord.js-commando')
const lang = require('../../lang/ja.json')

module.exports = class releasesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'releases',
      aliases: ['release'],
      group: 'util',
      memberName: 'releases',
      description: 'http://go.blacklistener.tk/go/commands/releases',
      examples: ['releases 1.1'],

      args: [{
        key: 'version',
        prompt: '',
        error: lang.invalidVersion,
        type: 'string',
        default: '',
        validate: val => this.versions.includes(val),
      }],
    })
  }

  async run(msg, args) {
    const ver = args.version ? `release_notes/${args.version}` : 'history'
    return await msg.channel.send(`http://go.blacklistener.tk/go/${ver}`)
  }

  get versions() {
    return [
      '1.1',
      '1.1.1',
      '1.1.2',
    ]
  }
}