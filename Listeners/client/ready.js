const { Listener } = require('discord-akairo')

class ReadyListener extends Listener {
  constructor () {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  async exec () {
    const statuses = [
                `s!help | ${this.client.users.cache.size} users`
    ]; let i = 0

    this.client.user.setStatus('dnd')
    this.client.user.setActivity(statuses[i++ % statuses.length], { type: 'PLAYING' })

    console.log(`${this.client.user.tag} est en ligne`)
  }
}

module.exports = ReadyListener
