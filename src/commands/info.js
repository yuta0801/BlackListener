const Discord = require('discord.js')
const exec = require('util').promisify(require('child_process').exec)
const os = require('os')
const c = require(__dirname + '/../config.yml')
const isWindows = process.platform === 'win32'
const isTravisBuild = process.argv.includes('--travis-build')
const s = isTravisBuild ? require(__dirname + '/../travis.yml') : require(__dirname + '/../secret.yml')
const logger = require(__dirname + '/../logger').getLogger('commands:info')
const f = require('string-format')
const { Command } = require('../core')

module.exports = class extends Command {
  constructor() {
    super('info')
  }

  async run(msg, settings, lang) {
    const client = msg.client
    const graph = 'Device    Total  Used Avail Use% Mounted on\n'
    let o1 = '利用不可'
    let loadavg = '利用不可'
    const invite = s.inviteme
    if (!isWindows) {
      const { stdout } = await exec('df -h | grep /dev/sda')
      o1 = stdout
      loadavg = Math.floor(os.loadavg()[0] * 100) / 100
    }
    let owner = ''
    s.owners.forEach(aowner => {
      const user = client.users.get(aowner)
      if (user.tag && user.id) owner += `${aowner.tag} (${aowner.id})\n`
    })
    try {
      msg.channel.send(new Discord.MessageEmbed()
        .setTitle('Bot info')
        .setTimestamp()
        .setColor([0,255,0])
        .addField(lang.info.memory, `${lang.info.memory_max}: ${Math.round(os.totalmem() / 1024 / 1024 * 100) / 100}MB\n${lang.info.memory_usage}: ${Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100}MB\n${lang.info.memory_free}: ${Math.round(os.freemem() / 1024 / 1024 * 100) / 100}MB`)
        .addField(lang.info.cpu, `${lang.info.threads}: ${os.cpus().length}\n${lang.info.cpu_model}: ${os.cpus()[0].model}\n${lang.info.cpu_speed}: ${os.cpus()[0].speed}`)
        .addField(lang.info.disk, graph + o1)
        .addField(lang.info.platform, os.platform)
        .addField(lang.info.loadavg, loadavg)
        .addField(lang.info.servers, client.guilds.size, true)
        .addField(lang.info.users, client.users.size, true)
        .addField(lang.info.createdBy, owner)
        .setDescription(`[${lang.info.invite}](${invite})\n[${lang.info.source}](${c.github})\n[Discord Bots](https://discordbots.org/bot/456966161079205899)`)
        .setFooter(`Sent by ${msg.author.tag}`))
    } catch(e) {
      logger.error(f(lang.error, e))
      msg.channel.send(f(lang.error, e))
    }
  }
}
