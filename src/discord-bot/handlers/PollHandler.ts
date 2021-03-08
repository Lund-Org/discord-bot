import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import DataStore from '../helpers/dataStore'

class PollHandler extends Handler {
  static reactionEmojis: Array<string> = [
    '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'
  ]

  validate(client: Client, msg: Message): boolean {
    return super.validate(client, msg) && msg.content.startsWith(`${DataStore.getData('prefix')}poll`)
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const matches = parsingHelper.parsePollMessage(msg.content)

    if (!matches) {
      msg.reply(`Mauvais format. Les sondages s\'écrivent : \`${DataStore.getData('prefix')}poll [QUESTION] [REP1] [REP2] [...]\`
      Les caractères autorisés sont : Les lettres, les chiffres, le point, le point d'interrogation, l'underscore, le tiret, les guillemets et l'apostrophe`)
    } else if (matches.length > 11) {
      msg.reply('👮‍♂️ Il ne peut y avoir plus de 10 réponses')
    } else {
      const [question, ...answers] = matches.map(x => x.slice(1, -1))
      const emojis: Array<string> = answers.map((_, index): string => PollHandler.reactionEmojis[index])

      const ownMsg: Message = await msg.channel.send(`${question}\n${this.generateAnswers(answers, emojis)}`) as Message
      await this.addReactions(ownMsg, emojis)
    }
    return true
  }

  /**
   * Generate the answer list
   * @param answers The list of the answers of the poll
   * @param emojis The random emojis linked to the answers
   */
  private generateAnswers (answers: Array<string>, emojis: Array<string>) {
    return answers.map((answer, index) => {
      return `${emojis[index]} ${answer}`
    }).join("\n")
  }

  /**
   * Generate the poll reactions
   * @param messageToReact The message where we want to add the reactions
   * @param emojis The random emojis linked to the answers
   */
  private async addReactions(messageToReact: Message, emojis: Array<string>) {
    for (const emoji of emojis) {
      await messageToReact.react(emoji)
    }
  }
}

export default PollHandler
