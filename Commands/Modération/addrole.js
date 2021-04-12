const { Command } = require('discord-akairo')

class PingCommand extends Command {
  constructor () {
    super('addrole', {
      aliases: ['addrole', 'ar'],
      args: [{
        id: 'member',
        type: 'member',
        default: null,
        prompt: {
          start: "Merci, d'indiqué l'utilisateur a l'aquelle vous voulez ajouté le role",
          retry: "Merci, d'indiqué l'utilisateur a l'aquelle vous voulez ajouté le role"
        }
      }, {
        id: 'role',
        type: 'role',
        default: null,
        prompt: {
          start: "Merci, d'indiqué le role que vous voulez donné",
          retry: "Merci, d'indiqué le role que vous voulez donné"
        }
      }],
      description: {
        usage: 'addrole [User | role]',
        examples: ['addrole scricker admin'],
        description: 'Donne un role a un utilisateur'
      },
      cooldown: 2000,
      ratelimit: 3,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_ROLES']
    })
  }

  async exec (message, { member, role }) {
    if (member.roles.cache.get(role.id)) return message.util.send(`${message.author.id === member.id ? 'Vous avez' : 'A'} deja le role ${role.name}`)
    return member.roles.add(role.id).then(() => {
      return message.util.send(`${message.author.id === member.id ? 'Vous avez' : 'A'} obtenu le role ${role.name}`)
    }).catch(() => {
      return message.util.send(`le role ${role.name} ne peut pas ${message.author.id === member.id ? 'vous etre' : 'etre'} donné ${message.author.id === member.id ? '' : `à ${member.user.username}`}`)
    })
  }
}

module.exports = PingCommand
