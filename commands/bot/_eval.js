const { Command } = require('discord.js-commando')
// const logger = require('./logger')
const lang = require('../../lang/ja.json')
const f = require('string-format')

module.exports = class evalCommand extends Command {
  constructor(client) {
    super(client, {
      name: '_eval',
      group: 'bot',
      memberName: '_eval',
      description: 'http://go.blacklistener.tk/go/commands/eval',
      ownerOnly: true,

      args: [{
        key: 'script',
        prompt: '実行するコードを入力してください',
        type: 'string',
      }],
    })
  }

  async run(msg, args) {
    try {
      const returned = this.client._eval(args.script)
      if (returned.includes(this.client.token)) return msg.send('不正な文字列が含まれています')
      // logger.info(`Eval by ${msg.author.tag} (${msg.author.id}), result: ${returned}`)
      msg.channel.send(`:ok_hand: (${returned})`)
    } catch (e) {
      // logger.info(`Eval by ${msg.author.tag} (${msg.author.id}), result: ${lang.eval_error} (${e})`)
      msg.channel.send(f(lang.eval_error, e))
    }
  }
}
