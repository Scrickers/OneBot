const { Command } = require('discord-akairo')

class PingCommand extends Command {
  constructor () {
    super('ban', {
      aliases: ['ban'],
      args: [{
        id: 'member',
        type: 'member',
        default: null,
        prompt: {
          start: "Merci, d'indiqué l'utilisateur que vous voulez ban",
          retry: "Merci, d'indiqué l'utilisateur que vous voulez ban"
        }
      }, {
        id: 'reasons',
        type: 'String',
        default: 'Aucune raison donnée'
      }],
      description: {
        usage: 'addrole [User | role]',
        examples: ['ban scricker', 'ban '],
        description: 'Donne un role a un utilisateur'
      },
      cooldown: 1000,
      ratelimit: 3,
      userPermissions: ['BAN_MEMBERS'],
      clientPermissions: ['BAN_MEMBERS']
    })
  }

  async exec (message, { member, reasons }) {
    member.ban({
      reason: reasons
    })
      .then(() => {
        message.util.send({
          embed: {
            color: 0x36393f,
            timestamp: new Date(),
            footer: {
              icon_url: this.client.user.avatarURL(),
              text: this.client.user.username
            },
            fields:
            [{
              name: 'ban',
              value: `**${member.user.tag}**`
            }, {
              name: 'par',
              value: `**${message.author.tag}**`
            }, {
              name: 'Raison',
              value: `**${reasons}**`
            }
            ]
          }
        })
      })
      .catch(() => {
        message.reply('Je ne peux pas ban cet utilisateur!')
      })
  }
}

module.exports = PingCommand
