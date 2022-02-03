import { Client, Message, MessageEmbed } from 'discord.js'
import Handler from './Handler'
import DataStore from '../helpers/dataStore'

class HelpHandler extends Handler {
  validate (client: Client, msg: Message): Promise<boolean> {
    return Promise.resolve(
      super.validate(client, msg) &&
      msg.content.startsWith(`${DataStore.getData('prefix')}help`)
    )
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const prefix = DataStore.getData('prefix')
    const snippet: MessageEmbed = new MessageEmbed({
      title: 'Liste des commandes disponibles :'
    })
    snippet.addField(`${prefix}birthday jj/mm/yyyy`, 'Enregistre votre anniversaire 🎂')
    snippet.addField(`${prefix}google recherche`, 'Effectue une recherche basé sur ce qu\'il y a après la commande')
    snippet.addField(`${prefix}join`, 'Récupère la date d\'arrivée au serveur')
    snippet.addField(`${prefix}poll [question] [rep 1] [rep 2] ...`, 'Effectue un sondage basé sur les réactions (10 réponses max.)')
    snippet.addField('ping', 'pong 🏓')
    snippet.addField('pong', 'ping 🏓')
    snippet.addField(`${prefix}pp pseudo`, 'Récupère l\'image de profil de l\'utilisateur (ne pas @ la personne)')
    snippet.addField(`${prefix}shifumi pierre|feuille|ciseaux`, 'Joue à Shifumi avec le bot')
    msg.channel.send({ embeds: [snippet] })
    return true
  }
}

export default HelpHandler
