const { Command } = require('discord-akairo')

class PingCommand extends Command {
  constructor () {
    super('massadd', {
      aliases: ['ma', 'addroleall', 'roleall'],
      args: [{
        id: 'role',
        type: 'role',
        default: null,
        prompt: {
          start: "Merci, d'indiqué le role que vous voulez donné",
          retry: "Merci, d'indiqué le role que vous voulez donné"
        }
      }, {
        id: 'confirm',
        type: 'string',
        default: null,
        prompt: {
          start: 'etes vous sur de donné ce role a tous le serveurs ?',
          retry: 'etes vous sur de donné ce role a tous le serveurs ?'
        }
      }],
      description: {
        usage: 'massadd [ role ]',
        examples: ['massadd admin'],
        description: 'Donne un role a tous les utilisateurs'
      },
      cooldown: 30000,
      ratelimit: 3,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_ROLES']
    })
  }

  async exec (message, { role, confirm }) {
    if (confirm.toLowerCase() === 'oui') {
      let i = 0; let o = 0
      console.log(message.guild.members.cache.filter(a => !a.roles.cache.get(role.id)))
      const promises = message.guild.members.cache.filter(a => !a.roles.cache.get(role.id)).map((user) => user.roles.add(role.id).then((result) => {
        i++
      }).catch(() => {
        o++
      }))

      await Promise.all(promises)
      if (i === 0) return message.util.send(`Personnes n'a eu le role ${role.name}`)
      message.util.send(`${i} nouveau utilisateur${i > 1 ? 's ont eux' : ' à eu'} le role ${role.name} ${o > 0 ? `utilisateur${o > 1 ? 's' : ''} n'ont pas pu avoir le role` : ''}`)
    }
  }
}

module.exports = PingCommand
