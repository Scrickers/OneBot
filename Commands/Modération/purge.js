const { Command } = require('discord-akairo')

class purgeCommand extends Command {
  constructor() {
    super('purge', {
      aliases: ['purge'],
      args: [{
        id: 'purge',
        type: 'number',
        default: null,
        prompt: {
          start: "Merci, d'indiqué le nombre de message a supprimé ",
          retry: "Merci,  d'indiqué le nombre de message a supprimé "
        }
      }],
      description: {
        usage: 'purge [number] ',
        examples: ['purge ', 'purge 10'],
        description: 'Supprime des messages'
      },
      cooldown: 10000,
      ratelimit: 3,
      userPermissions: ['MANAGE_MESSAGES'],
      clientPermissions: ['MANAGE_MESSAGES']
    })
  }

  async exec(message, { purge }) {
    if (purge < 2 || purge > 500) return message.util.send("Vous devez choisir un nombre entre 2 et 500")
    deleteMsg(this.client, purge, message, purge)
  }
}

module.exports = purgeCommand
async function deleteMsg(client, number, message, x) {
  try {
    if ((await message.channel.messages.fetch({ limit: x })).map(x => x.id).length != x) x = (await message.channel.messages.fetch({ limit: x })).map(x => x.id).length
    if (number > 99) {
      await client.api.channels[message.channel.id].messages['bulk-delete'].post({ data: { messages: (await message.channel.messages.fetch({ limit: 99 })).map(x => x.id) } });
      return deleteMsg(number - 99)
    } else {
      await client.api.channels[message.channel.id].messages['bulk-delete'].post({ data: { messages: (await message.channel.messages.fetch({ limit: number })).map(x => x.id) } });
      message.util.send(`${x} messages ont été supprimé`)
    }
  } catch (e) {
    message.util.send("Vous ne pouvez pas supprimé autant de message !!! il vas falloir faire appel a mes amis pour replir le serveur !")
    return false
  }

}