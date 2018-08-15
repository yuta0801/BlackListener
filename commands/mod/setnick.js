const { Command } = require('discord.js-commando')

module.exports = class setprefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setprefix',
      aliases: ['setnickname'],
      group: 'mod',
      memberName: 'setprefix',
      description: 'http://go.blacklistener.tk/go/commands/setprefix',
      examples: ['setprefix /'],
      guildOnly: true,

      args: [{
        key: 'member',
        prompt: 'ニックネームを変更するユーザーを入力してください',
        type: 'member',
      }, {
        key: 'nickname',
        prompt: '',
        type: 'string',
        default: '',
      }],
    })
  }

  async run(msg, args) {
    await args.member.setNickname(args.nickname || null)
    return msg.channel.send(':ok_hand:')
  }
}