const { Command } = require('discord-akairo')
const fs = require("fs")
const data = require("../../data/ticket.json")

class ticketCommand extends Command {
  constructor() {
    super('ticket', {
      aliases: ['ticket'],
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
    if (data.find(x => x.id === message.author.id && x.a)) {
      return message.channel.send({
        embed: {
          title: '❌ Hmm, tu as déjà un ticket.',
          color: 'RED',
          description: '[Clique ici pour y accéder.](https://discord.com/channels/828954122308550656/' + data.find(x => x.id === message.author.id).ChannelId + '/)'
        }
      });
    }
    message.guild.channels.create("「🎫」ticket-" + (parseInt(data.length) + 1), {
      type: "text",
      parent: "828954122883039269",
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL']
        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
        },
        {
          id: "828954122328866830",
          allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
        }
      ]
    }).then(msg => {
      msg.send(message.author, {
        embed: {
          title: '📫 NOUVEAU TICKET',
          color: 0x2f3136,
          footer: 'Pour fermer un ticket utiliser la commande !close',
          fields: [
            {
              name: "Ticket de",
              value: '`' + message.author.tag + '`',
              inline: true
            },
            {
              name: "Message du staff.",
              value: 'Merci de préciser la raison de votre ticket.'
            }
          ],
        },
      });
      message.channel.send({
        embed: {
          title: '📬 Ticket ouvert !',
          description: '[Clique ici pour y accéder.](https://discord.com/channels/' + message.guild.id + '/' + msg.id + '/)',
          color: 'GREEN'
        }
      });
      data.push({
        id: message.author.id,
        a: true,
        ChannelId: msg.id
      })
      fs.writeFileSync('data/ticket.json', JSON.stringify(data));
    });

  }
}

module.exports = ticketCommand
