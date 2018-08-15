const { Command } = require('discord.js-commando')

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      group: 'mod',
      memberName: 'leave',
      description: 'http://go.blacklistener.tk/go/commands/leave',
      guildOnly: true,
      ownerOnly: true,
    })
  }

  async run(msg) {
    await msg.channel.send(':wave:')
    return await msg.guild.leave()
  }
}