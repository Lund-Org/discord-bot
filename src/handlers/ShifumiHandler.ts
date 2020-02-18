import { Client, Message } from 'discord.js'
import Handler from './Handler'
import parsingHelper from '../helpers/parsingHelper'
import ShifumiEnum from '../enums/ShifumiEnum'

class ShifumiHandler extends Handler {
  static availableValues: ShifumiEnum[] = [
    ShifumiEnum.PIERRE, ShifumiEnum.FEUILLE, ShifumiEnum.CISEAUX
  ]

  validate (client: Client, msg: Message): boolean {
    return super.validate(client, msg) && msg.content.startsWith('!shifumi')
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const userChoice: ShifumiEnum|null = parsingHelper.parseShifumiMessage(msg.content, ShifumiHandler.availableValues)

    if (userChoice) {
      this.gameRules(msg, userChoice)
    } else {
      msg.channel.send('Mauvais format. Le shifumi s\'écrit : !shifumi pierre|feuille|ciseaux')
    }
    return true
  }

  /**
   * Check the rules of the game to define the win/loss/draw
   * @param msg The current message
   * @param userInput The value used by the user as a ShifumiEnum type
   */
  private gameRules (msg: Message, userInput: ShifumiEnum) {
    const botChoice: ShifumiEnum = this.pickRandomChoice()

    if (
        (botChoice === ShifumiEnum.PIERRE && userInput === ShifumiEnum.CISEAUX) ||
        (botChoice === ShifumiEnum.CISEAUX && userInput === ShifumiEnum.FEUILLE) ||
        (botChoice === ShifumiEnum.FEUILLE && userInput === ShifumiEnum.PIERRE)
     ) {
      msg.channel.send(`J'ai choisi "${botChoice}".... J'ai donc gagné ! 🎉`)
    } else if (botChoice === userInput) {
      msg.channel.send(`J'ai choisi "${botChoice}".... Egalité ! 🤝`)
    } else {
      msg.channel.send(`J'ai choisi "${botChoice}".... T'as gagné ! 😭`)
    }
  }

  /**
   * Choose a random value
   */
  private pickRandomChoice(): ShifumiEnum {
    return ShifumiHandler.availableValues[Math.trunc(ShifumiHandler.availableValues.length * Math.random())]
  }
}

export default ShifumiHandler
