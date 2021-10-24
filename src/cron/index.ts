import { CronJob } from 'cron'
import { Birthday } from '../database/entities/Birthday'
import { getRepository } from 'typeorm'
import { Client, TextChannel } from 'discord.js'
import { giftPointsForBirthday, givenPointsForBirthday } from '../common/birthday'

function setupBirthdayCron(discordClient: Client) {
  const job = new CronJob(
    '0 0 0 * * *',
    async () => {
      const date = new Date()

      try {
        // get the birthday entities
        const birthdays = await getRepository(Birthday)
          .find({
            birthday_day: date.getDate(),
            birthday_month: date.getMonth() + 1
          })

        for (const birthday of birthdays) {
          const guilds = discordClient.guilds.cache.array()

          // find the member in the guilds
          for (const guild of guilds) {
            const target = guild.members.cache.find((member) => member.id === birthday.discord_id)

            if (target) {
              const generalChannel = guild.channels.cache.find(
                (channel) => channel.id === process.env.BIRTHDAY_CHANNEL_ID
              )

              // get the general channel
              if (generalChannel && generalChannel.isText()) {
                const hasEarnPoints = await giftPointsForBirthday(target.id)
                console.log(`Birthday wished for ${target.id}`)

                if (hasEarnPoints) {
                  (generalChannel as TextChannel).send(`Bon anniversaire ${target.toString()} 🎂. En tant que joueur de gacha, tu as gagné ${givenPointsForBirthday} points :)`)
                } else {
                  (generalChannel as TextChannel).send(`Bon anniversaire ${target.toString()} 🎂`)
                }
              }
            }
          }
        }
      } catch (e) {
        console.log('Cron error :')
        console.log(e)
      }
    },
    null,
    true,
    'Europe/Paris'
  )

  job.start()
}


export function initCron(discordClient: Client) {
  setupBirthdayCron(discordClient)
}
