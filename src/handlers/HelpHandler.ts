import { Client, Message, RichEmbed } from 'discord.js'
import Handler from './Handler'
import Singleton from '../helpers/singleton'

class HelpHandler extends Handler {
  validate (client: Client, msg: Message): boolean {
    return super.validate(client, msg) && msg.content.startsWith(`${Singleton.getData('prefix')}help`)
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const prefix = Singleton.getData('prefix')
    const snippet: RichEmbed = new RichEmbed({
      title: 'Liste des commandes disponibles :'
    })
    snippet.addField(`${prefix}google recherche`, 'Effectue une recherche basé sur ce qu\'il y a après la commande')
    snippet.addField(`${prefix}join`, 'Récupère la date d\'arrivée au serveur')
    snippet.addField(`${prefix}poll [question] [rep 1] [rep 2] ...`, 'Effectue un sondage basé sur les réactions (10 réponses max.)')
    snippet.addField('ping', 'pong 🏓')
    snippet.addField('pong', 'ping 🏓')
    snippet.addField(`${prefix}pp pseudo`, 'Récupère l\'image de profil de l\'utilisateur (ne pas @ la personne)')
    snippet.addField(`${prefix}shifumi pierre|feuille|ciseaux`, 'Joue à Shifumi avec le bot')
    msg.channel.send(snippet)
    return true
  }
}

export default HelpHandler
