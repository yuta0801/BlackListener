const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const lang = require('../../lang/ja.json')
const util = require('../../util')
const { defaultSettings } = require('../../contents.js')

module.exports = class serverinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      group: 'util',
      memberName: 'serverinfo',
      description: 'http://go.blacklistener.tk/go/commands/serverinfo',
      guildOnly: true,
    })
  }

  async run(msg) {
    const guildSettings = `./data/servers/${msg.guild.id}/config.json`
    const settings = await util.readJSON(guildSettings, defaultSettings)
    const prefix = settings.prefix ? `\`${settings.prefix}\`` : lang.sunknown
    const language = settings.language ? `\`${settings.language}\`` : lang.sunknown
    const notifyRep = settings.notifyRep || lang.unknownorzero
    const banRep = settings.banRep || lang.unknownorzero
    const antispam = settings.antispam ? lang.enabled : lang.disabled
    const banned = settings.banned ? lang.yes : lang.no
    const disable_purge = settings.disable_purge ? lang.no : lang.yes
    const autorole = settings.autorole ? `${lang.enabled} (${msg.guild.roles.get(settings.autorole).name}) [${settings.autorole}]` : lang.disabled
    const excludeLogging = settings.excludeLogging ? `${lang.enabled} (${msg.guild.channels.get(settings.excludeLogging).name}) (\`${msg.guild.channels.get(settings.excludeLogging).id}\`)` : lang.disabled
    const invite = settings.invite ? lang.allowed : lang.disallowed
    const welcome_channel = settings.welcome_channel ? `${lang.enabled} (${msg.guild.channels.get(settings.welcome_channel).name})` : lang.disabled
    const welcome_message = settings.welcome_message ? `${lang.enabled} (\`\`\`${settings.welcome_message}\`\`\`)` : lang.disabled
    const ignoredChannels = settings.ignoredChannels.map((id) => {
      const channel = msg.guild.channels.get(id)
      if (channel) return `<#${id}> (${channel.name}) (${id})`
      else return `<#${id}> ${id} (${lang.failed_to_get})`
    }).join('\n') || lang.no
    const mutes = settings.mute.map(async (id) => {
      const user = this.client.users.get(id) || await this.client.fetchUser(id).catch(() => {})
      if (user) return `<@${id}> (${user.tag})`
      else return `<@${id}> ${id} (${lang.failed_to_get})`
    }).join('\n') || lang.no
    const embed = new Discord.RichEmbed()
      .setTitle(' - Server Information - ')
      .setColor([0, 255, 0])
      .setTimestamp()
      .addField(lang.serverinfo.prefix, prefix)
      .addField(lang.serverinfo.language, language)
      .addField(lang.serverinfo.notifyRep, notifyRep)
      .addField(lang.serverinfo.banRep, banRep)
      .addField(lang.serverinfo.antispam, antispam)
      .addField(lang.serverinfo.ignoredChannels, ignoredChannels)
      .addField(lang.serverinfo.banned, banned)
      .addField(lang.serverinfo.disable_purge, disable_purge)
      .addField(lang.serverinfo.autorole, autorole)
      .addField(lang.serverinfo.excludeLogging, excludeLogging)
      .addField(lang.serverinfo.invite, invite)
      .addField(lang.serverinfo.mute, mutes)
      .addField(lang.serverinfo.welcome_channel, welcome_channel)
      .addField(lang.serverinfo.welcome_message, welcome_message)
    return await msg.channel.send(embed)
  }
}
