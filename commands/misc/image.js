const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const randomPuppy = require('random-puppy')
const lang = require('../../lang/ja.json')

module.exports = class imageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'image',
      group: 'misc',
      memberName: 'image',
      description: 'http://go.blacklistener.tk/go/commands/image',
      examples: ['image anime', 'image custom thinking'],
      nsfw: true,

      args: [{
        key: 'type',
        prompt: '取得する画像の種類を入力してください',
        type: 'string',
        validate: val => ['nsfw', 'r18', 'anime', 'custom'].includes(val),
      }, {
        key: 'advanced',
        prompt: '',
        type: 'string',
        default: '',
        infinite: true,
      }],
    })
  }

  async run(msg, args) {
    if (args.type === 'custom') {
      return await this.sendImage(msg, args.advanced)
    } else if (args.type === 'anime') {
      return await this.sendImage(msg, [
        'Undertale',
        'awwnime',
        'Gunime',
        'anime',
        'animemes',
        'anikyar_ja',
        'PopTeamEpic',
        'GJbu',
        'touhou',
        'anime_irl',
        'animegifs',
        'AnimeFigures',
      ])
    } else if (['nsfw', 'r18'].includes(args.type)) {
      await this.sendImage(msg, [
        'HENTAI_GIF',
        'hentai_irl',
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw',
      ])
    }
  }

  async sendImage(msg, list) {
    msg.channel.send(lang.searching)
    const sub = list[Math.round(Math.random() * (list.length - 1))]
    const url = await randomPuppy(sub)
    const attachment = new Discord.Attachment(url)
    msg.channel.send(attachment).catch(msg.channel.send)
  }
}