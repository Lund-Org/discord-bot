import { CronJob } from 'cron'
import { Birthday } from '../database/entities/Birthday';
import { getRepository } from 'typeorm';
import { Client, TextChannel } from 'discord.js';
import { giftPointsForBirthday } from '..//common/birthday';

function setupBirthdayCron(discordClient: Client) {
  const job = new CronJob('0 0 0 * * *', () => {
  const date = new Date();

  // get the birthday entities
  getRepository(Birthday)
    .find({ birthday_day: date.getDate(), birthday_month: date.getMonth() + 1 })
    .then((birthdays: Birthday[]) => {
      birthdays.forEach((birthday) => {
        // find the member in the guilds
        discordClient.guilds.cache.forEach((guild) => {
          const target = guild.members.cache.find((member) => member.id === birthday.discord_id)

          if (target) {
            const generalChannel = guild.channels.cache.find(
              (channel) => channel.name.includes(process.env.BIRTHDAY_CHANNEL)
            )

            // get the general channel
            if (generalChannel && generalChannel.isText()) {
              (generalChannel as TextChannel).send(`Bon anniversaire ${target.toString()} 🎂`)
              giftPointsForBirthday(target.id).then(() => {
                console.log(`Birthday wished for ${target.id}`)
              })
            }
          }
        })
      })
    })
  }, null, true, 'Europe/Paris');

  job.start();
}


export function initCron(discordClient: Client) {
  setupBirthdayCron(discordClient);
}
