const Users = require('../models/Users')

module.exports = {

  duration: function duration (ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `\`${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, and ${sec.padStart(2, '0')} seconds\``
  },

  generateKey: function () {
    const characters = 'ABCEFGHJKLNPQRSTUWXYZ1245780'
    let output = ''

    for (let i = 0; i < 5; i += 1) {
      for (let y = 0; y < 4; y += 1) {
        const random = Math.floor((Math.random() * 35) + 1)
        const char = characters.charAt(random)
        output += char
      }

      if (i !== 5) {
        output += '-'
      }
    }

    return output
  },

  longDate: function (date) {
    return new Date(date).toLocaleString('en-GB', { dateStyle: 'full' })
  },

  shortDate: function (date) {
    return new Intl.DateTimeFormat('en-GB').format(date)
  },

  trim: function (str, max) {
    if (!str) throw new TypeError('Trim Function Error', 'Must define the string to trim')
    if (!max) throw new TypeError('Trim Function Error', 'Must define how much to trim');
    ((str.length > max) ? `${str.slice(0, max, -3)}...` : str)
  },

  cleanCode: function (text) {
    if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else return text
  },

  formatName: function (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  },
  randomNumber: function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },

  giveXp: async function (userId) {
    const user = await this.getPLayer(userId)
    const xp = this.randomNumber(1, 8)
    user.Exp += xp
    user.ExpTotal += xp
    if (Math.floor(40 * (user.Level * 1.25)) * user.Level <= user.Exp) {
      user.Level++
    }
    user.save()
  },

  getPLayer: async function (userId) {
    const user = await Users.findOne({
      UserId: userId
    })
    if (!user) {
      return (new Users({
        UserId: userId
      })).save()
    } else return user
  }
}
