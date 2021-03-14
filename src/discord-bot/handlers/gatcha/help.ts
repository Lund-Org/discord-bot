import { Message, MessageEmbed } from "discord.js"
import { Config } from "../../../database/entities/Config"
import { getRepository } from "typeorm"
import DataStore from "../../helpers/dataStore"
import GatchaEnum from "../../enums/GatchaEnum"

type PriceConfig = { price: number };

export const help = async ({ msg }: { msg: Message }) => {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GatchaEnum.PRICE }
  })
  const priceConfig: PriceConfig = configPriceJSON.value as PriceConfig
  const prefix = DataStore.getData('prefix')
  const snippet: MessageEmbed = new MessageEmbed({
    title: 'Liste des commandes disponibles :'
  })
  snippet.addField(`${prefix}gatcha join`, 'Crée ton profil, à faire la toute première fois pour pouvoir jouer')
  snippet.addField(`${prefix}gatcha daily`, 'Tire une carte gratuitement, utilisable une fois par jour')
  snippet.addField(`${prefix}gatcha points`, 'Permet de savoir combien vous possédez de points pour acheter des cartes')
  snippet.addField(`${prefix}gatcha buy nombre_entre_1_et_6`, `Permet de dépenser des points pour acheter des cartes. ${priceConfig.price}points par carte`)
  snippet.addField(`${prefix}gatcha cards`, 'Permet de voir son inventaire. Utilisez les réactions pour pouvoir changer de page')
  snippet.addField(`${prefix}gatcha gold id_de_carte`, 'Permet de sacrifier 5 cartes basiques en une carte dorée du même type')
  snippet.addField(`${prefix}gatcha fusion id_de_carte`, 'Permet de créer une carte fusion en sacrifiant ses composants (voir http://lundprod.com pour plus d\'infos)')
  snippet.addField(`${prefix}gatcha profil`, 'Permet de voir son profil')
  snippet.addField(`${prefix}gatcha view`, 'Permet d\'avoir l\'aperçu d\'une carte')
  msg.channel.send(snippet)
}
