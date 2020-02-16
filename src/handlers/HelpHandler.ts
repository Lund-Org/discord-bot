import { Client, Message, RichEmbed } from 'discord.js'
import Handler from './Handler'

class HelpHandler extends Handler {
  validate (client: Client, msg: Message): boolean {
    return super.validate(client, msg) && msg.content.startsWith('!help')
  }

  async process(client: Client, msg: Message): Promise<boolean> {
    const snippet: RichEmbed = new RichEmbed({
      title: 'Liste des commandes disponibles :'
    })
    snippet.addField('!google recherche', 'Effectue une recherche basé sur ce qu\'il y a après la commande')
    snippet.addField('!join', 'Récupère la date d\'arrivée au serveur')
    snippet.addField('!poll [question] [rep 1] [rep 2] ...', 'Effectue un sondage basé sur les réactions')
    snippet.addField('ping', 'pong 🏓')
    snippet.addField('!pp pseudo', 'Récupère l\'image de profil de l\'utilisateur (ne pas @ la personne)')
    snippet.addField('!shifumi pierre|feuille|ciseaux', 'Joue à Shifumi avec le bot')
    msg.channel.send(snippet)
    return true
  }
}

export default HelpHandler
