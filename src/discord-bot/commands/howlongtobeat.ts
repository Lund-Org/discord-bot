import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import { HowLongToBeatService } from 'howlongtobeat';

type HLTBCode = 'gameplayMain' | 'gameplayMainExtra' | 'gameplayCompletionist';
const HLTBLabelCode: [HLTBCode, string][] = [
  ['gameplayMain', 'Main Story'],
  ['gameplayMainExtra', 'Main + Extras'],
  ['gameplayCompletionist', 'Completionist'],
];
const CMD_NAME = 'howlongtobeat' as const;

export const howlongtobeatCmd = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription('Récupère les informations de durée de vie pour un jeu')
  .addStringOption((option) =>
    option.setName('name').setDescription('Le nom du jeu').setRequired(true),
  )
  .toJSON();

export const howlongtobeatResponse = {
  type: CMD_NAME,
  callback: howlongtobeatCallback,
};

async function howlongtobeatCallback(
  interaction: CommandInteraction<CacheType>,
) {
  const hltbService = new HowLongToBeatService();
  const name = interaction.options.getString('name', true);

  try {
    const searchResult = await hltbService.search(name);

    if (searchResult && searchResult.length) {
      const details = await hltbService.detail(searchResult[0].id);

      if (details) {
        const embed = new MessageEmbed()
          .setColor('#0ee8da')
          .setTitle(details.name)
          .setThumbnail(`https://howlongtobeat.com${details.imageUrl}`);

        HLTBLabelCode.forEach(([code, label]) => {
          const value = details[code as HLTBCode];

          if (value) {
            embed.addField(label, `${value}h`, true);
          }
        });

        return interaction.reply({ embeds: [embed] });
      }
    }

    return interaction.reply('Aucun jeu trouvé');
  } catch (e) {
    return interaction.reply('Une erreur est survenue');
  }
}
