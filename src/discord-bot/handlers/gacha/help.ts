import { Message, MessageEmbed } from "discord.js"
import { Config } from "../../../database/entities/Config"
import { getRepository } from "typeorm"
import DataStore from "../../helpers/dataStore"
import GachaEnum from "../../enums/GachaEnum"

type PriceConfig = { price: number };

export const help = async ({ msg }: { msg: Message }) => {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GachaEnum.PRICE }
  })
  const priceConfig: PriceConfig = configPriceJSON.value as PriceConfig
  const prefix = DataStore.getData('prefix')
  const snippet: MessageEmbed = new MessageEmbed({
    title: 'Liste des commandes disponibles :'
  })
  snippet.addField(`${prefix}gacha join`, 'Crée ton profil, à faire la toute première fois pour pouvoir jouer')
  snippet.addField(`${prefix}gacha daily`, 'Tire une carte gratuitement, utilisable une fois par jour')
  snippet.addField(`${prefix}gacha points`, 'Permet de savoir combien vous possédez de points pour acheter des cartes')
  snippet.addField(`${prefix}gacha buy nombre_entre_1_et_6`, `Permet de dépenser des points pour acheter des cartes. ${priceConfig.price}points par carte`)
  snippet.addField(`${prefix}gacha cards`, 'Permet de voir son inventaire. Utilisez les réactions pour pouvoir changer de page')
  snippet.addField(`${prefix}gacha gold id_de_carte`, 'Permet de sacrifier 5 cartes basiques en une carte dorée du même type')
  snippet.addField(`${prefix}gacha fusion id_de_carte`, 'Permet de créer une carte fusion en sacrifiant ses composants (voir http://lundprod.com pour plus d\'infos)')
  snippet.addField(`${prefix}gacha profil`, 'Permet de voir son profil')
  snippet.addField(`${prefix}gacha view id_de_carte`, 'Permet d\'avoir l\'aperçu d\'une carte')
  msg.channel.send(snippet)
}
