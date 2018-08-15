const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const lang = require('../../lang/ja.json')
const util = require('../../util')

module.exports = class lookupCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lookup',
      group: 'util',
      memberName: 'lookup',
      description: 'http://go.blacklistener.tk/go/commands/lookup',

      args: [{
        key: 'user',
        prompt: '情報を検索するユーザーを指定してください',
        error: lang.unknown,
        type: 'user',
      }],
    })
  }

  async run(msg, args) {
    const user = args.user
    const userConfig = await util.readJSON(`./data/users/${user.id}/config.json`)
    const sb = []
    const sb2 = []
    const sb3 = []
    const sb4 = []
    for (let i = 0; i <= userConfig.probes.length; i++) {
      if (!userConfig.bannedFromServer[i])
        sb.push(`${userConfig.bannedFromServer[i]} (${userConfig.bannedFromServerOwner[i]})`)
      if (!userConfig.bannedFromUser[i]) sb2.push(userConfig.bannedFromUser[i])
      if (!userConfig.probes[i]) sb3.push(userConfig.probes[i])
      if (!userConfig.reasons[i]) sb4.push(userConfig.reasons[i])
    }
    const nick = msg.guild.members.has(user.id) ? msg.guild.members.get(user.id).nickname : lang.nul
    const joinedAt = msg.guild.members.has(user.id) ? msg.guild.members.get(user.id).joinedAt : lang.sunknown
    const embed = new Discord.RichEmbed()
      .setTitle(lang.lookup.title)
      .setColor([0, 255, 0])
      .setFooter(lang.lookup.desc)
      .setThumbnail(user.avatarURL)
      .addField(lang.lookup.rep, userConfig.rep)
      .addField(lang.lookup.bannedFromServer, sb.join('\n') || 'BANされていません')
      .addField(lang.lookup.bannedFromUser, sb2.join('\n') || 'BANされていません')
      .addField(lang.lookup.probes, sb3.join('\n') || 'BANされていません')
      .addField(lang.lookup.reasons, sb4.join('\n') || 'BANされていません')
      .addField(lang.lookup.tag, user.tag)
      .addField(lang.lookup.nickname, nick)
      .addField(lang.lookup.id, user.id)
      .addField(lang.lookup.username_changes, userConfig.username_changes.join('\n') || lang.no)
      .addField(lang.lookup.bot, user.bot ? lang.yes : lang.no)
      .addField(lang.lookup.createdAt, user.createdAt.toLocaleString('ja-JP'))
      .addField(lang.lookup.joinedAt, joinedAt.toLocaleString('ja-JP'))
      .addField(lang.lookup.nowTime, new Date().toLocaleString('ja-JP'))
    msg.channel.send(embed)
  }
}
