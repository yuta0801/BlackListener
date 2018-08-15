const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const lang = require('../../lang/ja.json')
const secret = require('../../secret.json5')
const config = require('../../config.json5')
const isWindows = process.platform === 'win32'
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const os = require('os')

module.exports = class infoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'util',
      memberName: 'info',
      description: 'http://go.blacklistener.tk/go/commands/info',
    })
  }

  async run(msg) {
    const graph = 'Device          Total  Used Avail Use% Mounted on\n'
    let o1 = '利用不可'
    let loadavg = '利用不可'
    const invite = secret.inviteme
    if (!isWindows) {
      const { stdout } = await exec('df -h | grep /dev/sda')
      o1 = stdout
      loadavg = Math.floor(os.loadavg()[0] * 100) / 100
    }
    const embed = new Discord.RichEmbed()
      .setTitle('Bot info')
      .setTimestamp()
      .setColor([0, 255, 0])
      .addField(lang.info.memory, `${lang.info.memory_max}: ${Math.round(os.totalmem() / 1024 / 1024 * 100) / 100}MB\n${lang.info.memory_usage}: ${Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100}MB\n${lang.info.memory_free}: ${Math.round(os.freemem() / 1024 / 1024 * 100) / 100}MB`)
      .addField(lang.info.cpu, `${lang.info.threads}: ${os.cpus().length}\n${lang.info.cpu_model}: ${os.cpus()[0].model}\n${lang.info.cpu_speed}: ${os.cpus()[0].speed}`)
      .addField(lang.info.disk, `${graph}${o1}`)
      .addField(lang.info.platform, `${os.platform}`)
      .addField(lang.info.loadavg, `${loadavg}`)
      .addField(lang.info.servers, `${this.client.guilds.size}`)
      .addField(lang.info.users, `${this.client.users.size}`)
      .addField(lang.info.createdBy, `${this.client.users.get('254794124744458241').tag} (${this.client.users.get('254794124744458241').id})`)
      .setDescription(`[${lang.info.invite}](${invite})\n[${lang.info.source}](${config.github})\n[![Discord Bots](https://discordbots.org/api/widget/456966161079205899.svg)](https://discordbots.org/bot/456966161079205899)`)
      .setFooter(`Sent by ${msg.author.tag}`)
    return msg.channel.send(embed)
  }
}