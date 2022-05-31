import {
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  SelectMenuInteraction,
} from 'discord.js';
import { getManager } from 'typeorm';
import { Player } from '../../../database/entities/Player';
import { CardType } from '../../../database/entities/CardType';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';
import { userNotFound } from './helper';
import { getCardsToGold } from '../../../common/profile';

async function createOrUpdateGold(
  player: Player,
  cardToGold: CardType,
  inventoryCardGold: PlayerInventory,
) {
  const entityManager = getManager();

  if (inventoryCardGold) {
    inventoryCardGold.total += 1;
    await entityManager.save(inventoryCardGold);
  } else {
    const playerInventory = new PlayerInventory();

    playerInventory.player = player;
    playerInventory.total = 1;
    playerInventory.type = 'gold';
    playerInventory.cardType = cardToGold;
    await entityManager.save(playerInventory);
  }
}

async function decreaseBasic(inventoryCardBasic: PlayerInventory) {
  const entityManager = getManager();

  inventoryCardBasic.total -= 5;
  await entityManager.save(inventoryCardBasic);
}

export const gold = async (interaction: SelectMenuInteraction) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  await interaction.deferReply();
  const cardToGold = parseInt(interaction.values[0], 10);

  const inventoryCardBasic = player.inventories.find((inventory) => {
    return inventory.cardType.id === cardToGold && inventory.type === 'basic';
  });
  const inventoryCardGold = player.inventories.find((inventory) => {
    return inventory.cardType.id === cardToGold && inventory.type === 'gold';
  });

  if (inventoryCardBasic && inventoryCardBasic.total >= 5) {
    await createOrUpdateGold(
      player,
      inventoryCardBasic.cardType,
      inventoryCardGold,
    );
    await decreaseBasic(inventoryCardBasic);
    return interaction.editReply(
      '5 cartes basiques ont été transformée en une carte en or',
    );
  } else if (inventoryCardBasic) {
    return interaction.editReply(
      'Tu ne possèdes pas assez de cartes basic (5 cartes basiques = 1 carte en or)',
    );
  } else {
    return interaction.editReply("La carte n'existe pas");
  }
};

export async function goldMenu(interaction: CommandInteraction) {
  const player = await userNotFound({
    interaction,
  });

  if (!player) {
    return;
  }

  await interaction.deferReply({ ephemeral: true });
  const possibleGoldCards = await getCardsToGold(player.discord_id);

  if (!possibleGoldCards.length) {
    return interaction.editReply('Tu ne peux faire aucune fusion actuellement');
  }

  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId('gold')
      .setPlaceholder('Selectionner')
      .addOptions(
        possibleGoldCards.map((goldCard): MessageSelectOptionData => {
          return {
            label: `#${goldCard.cardType.id} - ${goldCard.cardType.name} (qty: ${goldCard.total})`,
            value: String(goldCard.cardType.id),
          };
        }),
      ),
  );

  return interaction.editReply({
    content: 'Choisissez la carte que vous voulez golder',
    components: [row],
  });
}
