require('json5/lib/register')
const Commando = require('discord.js-commando')
const path = require('path')
const oneLine = require('common-tags').oneLine
const secret = require('./secret.json5')
// const logger = require('./logger')
const lang = require('./lang/ja.json')
const f = require('string-format')

const client = new Commando.Client({
  owner: '232902077091807235',
  commandPrefix: 'n:',
})

client
  .on('error', console.error)
  .on('warn', console.warn)
  // .on('debug', console.log)
  .on('ready', () => {
    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`)
  })
  .on('disconnect', () => console.warn('Disconnected!'))
  .on('reconnecting', () => console.warn('Reconnecting...'))
  .on('commandError', (cmd, err) => {
    if (err instanceof Commando.FriendlyError) return
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err)
  })
  .on('commandRun', (cmd, promise, msg) => {
    // logger.info(f(lang.issueduser, msg.author.tag, msg.content))
  })
  .on('commandBlocked', (msg, reason) => {
    console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`)
  })
  .on('commandPrefixChange', (guild, prefix) => {
    console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`)
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`)
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`)
  })

client.registry
  .registerGroups([
    ['util', 'Util commands'],
    ['mod', 'Moderation commands'],
    ['bot', 'Bot owner only commando'],
    ['misc', 'Some commands'],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.login(Buffer.from(Buffer.from(Buffer.from(secret.token, 'base64').toString('ascii'), 'base64').toString('ascii'), 'base64').toString('ascii'))
