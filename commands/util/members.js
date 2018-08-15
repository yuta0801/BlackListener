const { Command } = require('discord.js-commando')

module.exports = class membersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'members',
      group: 'util',
      memberName: 'members',
      description: '',
      guildOnly: true,
    })
  }

  async run(msg) {
    return await msg.channel.send(msg.guild.members.size)
  }
}