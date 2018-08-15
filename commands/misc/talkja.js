const { Command } = require('discord.js-commando')
const fetch = require('node-fetch')
const secret = require('../../secret.json5')
const lang = require('../../lang/ja.json')

module.exports = class talkjaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'talkja',
      group: 'misc',
      memberName: 'talkja',
      description: 'http://go.blacklistener.tk/go/commands/talkja',
      examples: ['talkja こんにちは'],

      args: [{
        key: 'msg',
        prompt: '話しかけたいことを入力してください',
        type: 'string',
        default: false,
        parse: val => val === 'escape',
      }],
    })
  }

  async run(msg, args) {
    if (!secret.talk_apikey) return msg.channel.send(lang.no_apikey)
    const headers = {
      'x-api-key': secret.talk_apikey,
      'Content-Type': 'application/json',
    }
    const resreg = await fetch('https://api.repl-ai.jp/v1/registration', { method: 'POST', body: '{botId: sample}', headers })
    if (resreg.status !== 200) return msg.channel.send(lang.returned_invalid_response)
    const resjson = await resreg.json()
    const userId = resjson.appUserId
    const talkform = { 'botId': 'sample', 'appUserId': userId, 'initTalkingFlag': true, 'voiceText': args.msg, 'initTopicId': 'docomoapi' }

    const res = await fetch('https://api.repl-ai.jp/v1/dialogue', { method: 'POST', body: JSON.stringify(talkform), headers })
    if (res.status !== 200) return msg.channel.send(lang.returned_invalid_response)
    const data = await res.json()
    const status = data.systemText.expression
    return await msg.channel.send(status.replace('#', ''))
  }
}