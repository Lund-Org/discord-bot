import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import DataStore from '../../../common/dataStore';
import { Config } from '../../../database/entities/Config';
import { GachaConfigEnum } from '../../enums/GachaEnum';

type PriceConfig = { price: number };

export const help = async (interaction: CommandInteraction<CacheType>) => {
  const configPriceJSON = await DataStore.getDB()
    .getRepository(Config)
    .findOne({
      where: { name: GachaConfigEnum.PRICE },
    });
  const priceConfig: PriceConfig = configPriceJSON?.value as PriceConfig;
  const snippet: MessageEmbed = new MessageEmbed({
    title: 'Liste des commandes disponibles :',
  });
  snippet.addField(
    `/gacha join`,
    'Crée ton profil, à faire la toute première fois pour pouvoir jouer',
  );
  snippet.addField(
    `/gacha daily`,
    'Tire une carte gratuitement, utilisable une fois par jour',
  );
  snippet.addField(
    `/gacha points`,
    'Permet de savoir combien vous possédez de points pour acheter des cartes',
  );
  snippet.addField(
    `/gacha buy`,
    `Permet de dépenser des points pour acheter des cartes. ${priceConfig.price}points par carte`,
  );
  snippet.addField(
    `/gacha cards`,
    'Permet de voir son inventaire. Utilisez les réactions pour pouvoir changer de page',
  );
  snippet.addField(
    `/gacha gold`,
    'Permet de sacrifier 5 cartes basiques en une carte dorée du même type',
  );
  snippet.addField(
    `/gacha fusion`,
    "Permet de créer une carte fusion en sacrifiant ses composants (voir http://lundprod.com pour plus d'infos)",
  );
  snippet.addField(`/gacha profile`, 'Permet de voir son profil');
  snippet.addField(
    `/gacha sell`,
    'Permet de vendre des cartes contre des points',
  );
  snippet.addField(`/gacha view`, "Permet d'avoir l'aperçu d'une carte");
  snippet.addField(
    `/gacha twitch`,
    'Permet de lier son compte Twitch à son profil Gacha',
  );
  snippet.addField(`/gacha gift`, 'Permet de gagner un cadeau');
  return interaction.reply({ embeds: [snippet] });
};
