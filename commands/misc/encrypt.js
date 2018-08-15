const { Command } = require('discord.js-commando')
const lang = require('../../lang/ja.json')
const f = require('string-format')
const crypto = require('crypto')

module.exports = class encryptCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'encrypt',
      group: 'misc',
      memberName: 'encrypt',
      description: 'http://go.blacklistener.tk/go/commands/encrypt',
      examples: ['encrypt 文字列 パスワード'],

      args: [{
        key: 'text',
        prompt: '暗号化する文字列を入力してください',
        type: 'string',
      }, {
        key: 'pass',
        prompt: '暗号化に使用するパスワードを入力してください',
        type: 'string',
      }],
    })
  }

  async run(msg, args) {
    const cipher = crypto.createCipher('aes192', args.pass)
    cipher.update(args.text, 'utf8', 'hex')
    const encryptedText = cipher.final('hex')
    return await msg.channel.send(f(lang.encrypted, args.text, args.pass, encryptedText))
  }
}