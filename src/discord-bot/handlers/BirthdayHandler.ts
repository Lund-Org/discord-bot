import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import DataStore from '../helpers/dataStore'
import { getRepository } from 'typeorm'
import { Birthday } from '../../database/entities/Birthday'
import { Player } from '../../database/entities/Player'
import { giftPointsForBirthday } from '../../common/birthday'

class BirthdayHandler extends Handler {
  validate(client: Client, msg: Message): Promise<boolean> {
    return Promise.resolve(
      super.validate(client, msg) &&
      msg.content.startsWith(`${DataStore.getData('prefix')}birthday`)
    )
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const birthdayDate = parsingHelper.parseBirthdayMessage(msg.content)

    if (!birthdayDate) {
      msg.reply(`Mauvais format. Les anniversaires se notent : \`${DataStore.getData('prefix')}birthday jour/mois/année\`. Le jour doit être un nombre entre 1 et 31, le mois entre 1 et 12, et l'année doit être un nombre à 4 chiffres`)
    } else {
      const [day, month, year] = birthdayDate

      if (!this.checkValidDate(day, month, year)) {
        msg.reply(`La date est invalide`)
        return false
      }

      const userId = msg.author.id
      const birthday = await getRepository(Birthday).findOne({ discord_id: userId }) || new Birthday()
      const newBirthday = !birthday.discord_id

      if (newBirthday) {
        birthday.discord_id = userId
      }
      birthday.birthday_day = day
      birthday.birthday_month = month
      birthday.birthday_year = year
      try {
        await getRepository(Birthday).save(birthday)
        msg.reply(`Anniversaire enregistré !`)
        if (newBirthday) {
          await this.backportThisYearPoints(day, month, msg.author.id)
        }
      } catch (e) {
        msg.reply(`Une erreur est arrivée lors de la sauvegarde de l'anniversaire`)
      }
    }

    return true
  }

  checkValidDate(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day)

    return (
      date instanceof Date &&
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    )
  }

  async backportThisYearPoints(day: number, month: number, discord_id: string) {
    const birthdayThisYear = new Date((new Date()).getFullYear(), month - 1, day)

    if (birthdayThisYear.getTime() < Date.now()) {
      const player = await getRepository(Player).findOne({ discord_id })

      if (player) {
        await giftPointsForBirthday(discord_id)
      }
    }
  }
}

export default BirthdayHandler
