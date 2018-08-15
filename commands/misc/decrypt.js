const { Command } = require('discord.js-commando')
const lang = require('../../lang/ja.json')
const f = require('string-format')
const crypto = require('crypto')

module.exports = class decryptCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'decrypt',
      group: 'misc',
      memberName: 'decrypt',
      description: 'http://go.blacklistener.tk/go/commands/decrypt',
      examples: ['decrypt 文字列 パスワード'],

      args: [{
        key: 'text',
        prompt: '複合する文字列を入力してください',
        type: 'string',
      }, {
        key: 'pass',
        prompt: '複合に使用するパスワードを入力してください',
        type: 'string',
      }],
    })
  }

  async run(msg, args) {
    let decipher
    let dec
    try {
      decipher = crypto.createDecipher('aes192', args.pass)
      decipher.update(args.text, 'hex', 'utf8')
      dec = decipher.final('utf8')
    } catch (e) {
      return await msg.channel.send(f(lang.invalid_password, args.pass))
    }
    return await msg.channel.send(f(lang.decrypted, args.text, args.pass, dec))
  }
}