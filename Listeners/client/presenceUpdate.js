const { Listener } = require('discord-akairo')

class presenceUpdateListener extends Listener {
  constructor() {
    super('presenceUpdate', {
      emitter: 'client',
      event: 'presenceUpdate'
    })
  }

  async exec(_, presence) {
    if (presence.activities.find(x => x.name == "Custom Status") && presence.activities.find(x => x.name == "Custom Status").state) {
      const invite = (await presence.guild.fetchInvites()).map(x => x.code)
      let o = 0
      for (let i = 0; i < invite.length; i++) {
        if (presence.activities.find(x => x.name == "Custom Status").state.search(invite[i]) >= 0) {
          o++
        }
      }
      if (o > 0) {
        presence.member.roles.add("828954122316152833");
      } else {
        if (presence.member.roles.cache.get("828954122316152833")) {

          presence.member.roles.remove("828954122316152833");
        }
      }
    } else {
      if (presence.member.roles.cache.get("828954122316152833")) {
        presence.member.roles.remove("828954122316152833");
      }
    }
  }
}

module.exports = presenceUpdateListener
