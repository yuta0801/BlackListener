const { Command } = require('discord.js-commando')
const lang = require('../../lang/ja.json')
const f = require('string-format')

module.exports = class didyouknowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'didyouknow',
      group: 'util',
      memberName: 'didyouknow',
      description: 'http://go.blacklistener.tk/go/commands/didyouknow',
      examples: ['didyouknow @BlackListener#2993', 'didyouknow 460812821412708352 server'],

      args: [{
        key: 'id',
        prompt: 'ユーザー/サーバーIDを入力してください',
        type: 'string',
      }, {
        key: 'isServer',
        prompt: '',
        type: 'string',
        default: false,
        parse: val => val === 'server',
      }],
    })
  }

  async run(msg, args) {
    if (args.isServer) {
      let know = this.client.guilds.get(args.id)
      if (!know) know = this.client.guilds.find('name', args.id)
      if (!know) return await msg.channel.send(f(lang.unknown, args.id))
      else return await msg.channel.send(f(lang.known, `${know.name} (${know.id})`))
    }
    let know = msg.mentions.users.first()
    if (!know) know = this.client.users.get(args.id)
    if (!know) know = this.client.users.find('username', args.id)
    if (!know) return await msg.channel.send(f(lang.unknown, args.id))
    else return await msg.channel.send(f(lang.known, `${know.tag} (${know.id})`))
  }
}