const { Command } = require('discord.js-commando')

module.exports = class decodeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'decode',
      group: 'misc',
      memberName: 'decode',
      description: 'http://go.blacklistener.tk/go/commands/decode',
      examples: ['decode 文字列'],

      args: [{
        key: 'text',
        prompt: 'デコードする文字列を入力してください',
        type: 'string',
      }],
    })
  }

  async run(msg, args) {
    return await msg.channel.send(Buffer.from(args.text, 'base64').toString('ascii'))
  }
}