const { Command } = require('discord.js-commando')

module.exports = class encodeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'encode',
      group: 'misc',
      memberName: 'encode',
      description: 'http://go.blacklistener.tk/go/commands/encode',
      examples: ['encode 文字列'],

      args: [{
        key: 'text',
        prompt: 'エンコードする文字列を入力してください',
        type: 'string',
      }],
    })
  }

  async run(msg, args) {
    return await msg.channel.send(Buffer.from(args.text.toString('base64')))
  }
}