const { Command } = require('discord-akairo')
const fs = require("fs")
const data = require("../../data/ticket.json")

class closeCommand extends Command {
  constructor() {
    super('close', {
      aliases: ['close'],
      description: {
        usage: 'ticket',
        examples: ['ticket'],
        description: 'crée un ticket'
      },
      cooldown: 2000,
      ratelimit: 3
    })
  }

  async exec(message) {
    if (message.channel.permissionOverwrites.get(message.author.id) === undefined && !message.member.roles.cache.get("828954122328866830")) return
    if (!message.member.roles.cache.get("828954122328866830") && message.channel.name.split("-")[0] !== "「🎫」ticket") return
    const id = message.channel.name.split("-")[1]
    data[id - 1] = { id: data[id - 1].id, a: false, ChannelId: data[id - 1].ChannelId }
    message.channel.delete()
    this.client.users.cache.get(data[id - 1].id).send({
      embed: {
        title: '📬 Ticket fermé!',
        description: 'Votre ticket a été fermée',
        color: 'GREEN'
      }
    })
    fs.writeFileSync('data/ticket.json', JSON.stringify(data));
  }
}

module.exports = closeCommand
