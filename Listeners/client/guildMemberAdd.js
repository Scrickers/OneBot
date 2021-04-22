const { Listener } = require('discord-akairo')

class MessageListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd'
    })
  }

  async exec(member) {
    member.roles.add("828954122321002577")
    member.roles.add("828954122316152832")
    member.roles.add("828954122308550657")
  }
}

module.exports = MessageListener
