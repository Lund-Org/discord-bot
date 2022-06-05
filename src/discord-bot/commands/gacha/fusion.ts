import {
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  SelectMenuInteraction,
  CacheType,
} from 'discord.js';
import { CardType } from '../../../database/entities/CardType';
import { Player } from '../../../database/entities/Player';
import { userNotFound } from './helper';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';
import { getCardsToFusion } from '../../../common/profile';
import DataStore from '../../../common/dataStore';

async function createFusionCard(
  player: Player,
  cardsRequired: PlayerInventory[],
  fusionCard: CardType,
) {
  let fusionInventory = player.inventories.find(
    (x) => x.cardType.id === fusionCard.id && x.type === 'basic',
  );

  cardsRequired.forEach((x) => {
    x.total -= 1;
  });

  if (fusionInventory) {
    fusionInventory.total += 1;
  } else {
    fusionInventory = new PlayerInventory();
    fusionInventory.player = player;
    fusionInventory.total = 1;
    fusionInventory.type = 'basic';
    fusionInventory.cardType = fusionCard;
  }

  await DataStore.getDB().manager.save([...cardsRequired, fusionInventory]);
}

export const fusion = async (interaction: SelectMenuInteraction<CacheType>) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  const cardToCreateId = parseInt(interaction.values[0], 10);
  const cardToCreate = await DataStore.getDB()
    .getRepository(CardType)
    .findOne({
      where: { id: cardToCreateId },
      relations: ['fusionDependencies'],
    });

  if (!cardToCreate) {
    return interaction.reply("La carte n'existe pas");
  }
  if (!cardToCreate.isFusion) {
    return interaction.reply(
      "La carte que tu veux créer n'est pas une carte fusion",
    );
  }

  const dependencyIds = cardToCreate.fusionDependencies.map((x) => x.id);
  const cardInventoriesRequired = player.inventories.filter((inventory) => {
    return (
      dependencyIds.includes(inventory.cardType.id) &&
      inventory.type === 'basic'
    );
  });
  const missingCards = dependencyIds.reduce(
    (acc: number[], val: number): number[] => {
      const hasInventoryCard = player.inventories.find(
        (x) => val == x.cardType.id && x.type === 'basic' && x.total > 0,
      );

      return [...acc, ...(hasInventoryCard ? [] : [val])];
    },
    [],
  );

  if (missingCards.length === 0) {
    await createFusionCard(player, cardInventoriesRequired, cardToCreate);
    return interaction.reply('Carte fusion créée !');
  } else {
    return interaction.reply(
      `Tu ne possèdes pas tous les réactifs nécessaires. Cartes manquantes : ${missingCards
        .map((id) => `#${id}`)
        .join(', ')}`,
    );
  }
};

export async function fusionMenu(interaction: CommandInteraction<CacheType>) {
  const player = await userNotFound({
    interaction,
  });

  if (!player) {
    return;
  }

  await interaction.deferReply({ ephemeral: true });
  const possibleFusions = await getCardsToFusion(player.discord_id);

  if (!possibleFusions.length) {
    return interaction.editReply('Tu ne peux faire aucune fusion actuellement');
  }

  const row = new MessageActionRow<MessageSelectMenu>().addComponents(
    new MessageSelectMenu()
      .setCustomId('fusion')
      .setPlaceholder('Selectionner')
      .addOptions(
        possibleFusions.map((fusionCard): MessageSelectOptionData => {
          return {
            label: `#${fusionCard.id} - ${fusionCard.name}`,
            value: String(fusionCard.id),
          };
        }),
      ),
  );

  return interaction.editReply({
    content: 'Choisissez la carte fusion que vous voulez faire',
    components: [row],
  });
}
