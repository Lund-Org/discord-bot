import { Message, MessageEmbed } from "discord.js"
import { Config } from "../../../database/entities/Config"
import { getRepository } from "typeorm"
import DataStore from "../../helpers/dataStore"
import { GachaConfigEnum } from "../../enums/GachaEnum"

type PriceConfig = { price: number }

export const help = async ({ msg }: { msg: Message }) => {
  const configPriceJSON = await getRepository(Config).findOne({
    where: { name: GachaConfigEnum.PRICE }
  })
  const priceConfig: PriceConfig = configPriceJSON.value as PriceConfig
  const prefix = DataStore.getData('prefix')
  const snippet: MessageEmbed = new MessageEmbed({
    title: 'Liste des commandes disponibles :'
  })
  snippet.addField(`${prefix}gacha join`, 'Crée ton profil, à faire la toute première fois pour pouvoir jouer')
  snippet.addField(`${prefix}gacha daily`, 'Tire une carte gratuitement, utilisable une fois par jour')
  snippet.addField(`${prefix}gacha points`, 'Permet de savoir combien vous possédez de points pour acheter des cartes')
  snippet.addField(`${prefix}gacha buy <nombre entre 1 et 6>`, `Permet de dépenser des points pour acheter des cartes. ${priceConfig.price}points par carte`)
  snippet.addField(`${prefix}gacha cards`, 'Permet de voir son inventaire. Utilisez les réactions pour pouvoir changer de page')
  snippet.addField(`${prefix}gacha gold <id de carte>`, 'Permet de sacrifier 5 cartes basiques en une carte dorée du même type')
  snippet.addField(`${prefix}gacha fusion <id de carte>`, 'Permet de créer une carte fusion en sacrifiant ses composants (voir http://lundprod.com pour plus d\'infos)')
  snippet.addField(`${prefix}gacha profile`, 'Permet de voir son profil')
  snippet.addField(`${prefix}gacha sell <id de carte> <basic|gold> <quantité à vendre>`, 'Permet de vendre des cartes contre des points')
  snippet.addField(`${prefix}gacha view <id de carte>`, 'Permet d\'avoir l\'aperçu d\'une carte')
  snippet.addField(`${prefix}gacha twitch <pseudo twitch>`, 'Permet de lier son compte Twitch à son profil Gacha')
  snippet.addField(`${prefix}gacha gift <code>`, 'Permet de gagner un cadeau')
  msg.channel.send({ embeds: [snippet] })
}
