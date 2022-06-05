import {
  CacheType,
  CommandInteraction,
  Message,
  MessageEmbed,
  MessageReaction,
  User,
} from 'discord.js';
import { Pagination } from '../../../database/entities/Pagination';
import { userNotFound } from './helper';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';
import { Player } from '../../../database/entities/Player';
import DataStore from '../../../common/dataStore';

async function paginateMessage({
  userId,
  inventoryMessage,
}: {
  userId: string;
  inventoryMessage: Message;
}) {
  return DataStore.getDB()
    .createQueryBuilder()
    .insert()
    .into(Pagination)
    .values([
      {
        page: 0,
        discordUser_id: userId,
        discordMessage_id: inventoryMessage.id,
      },
    ])
    .execute();
}

function buildSnippet(username: string, cardInventories: PlayerInventory[]) {
  const snippet: MessageEmbed = new MessageEmbed({
    title: `Liste des cartes de ${username} :`,
  });

  cardInventories.forEach((cardInventory) => {
    snippet.addField(
      `#${cardInventory.cardType.id} ${cardInventory.cardType.name}`,
      `Type: ${cardInventory.type} | Quantité: x${cardInventory.total}`,
    );
  });
  return snippet;
}

export const cards = async (interaction: CommandInteraction<CacheType>) => {
  const player = await userNotFound({
    interaction,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  await interaction.deferReply();
  const tenFirstCards = player.inventories.slice(0, 10);

  if (!tenFirstCards.length) {
    return interaction.editReply(
      "Aucune carte n'est présente dans l'inventaire",
    );
  }

  const snippet = buildSnippet(interaction.user.username, tenFirstCards);
  await interaction.editReply({ embeds: [snippet] });
  const inventoryMessage = (await interaction.fetchReply()) as Message;

  if (player.inventories.length > 10) {
    await inventoryMessage.react('◀');
    await inventoryMessage.react('▶');

    await paginateMessage({ userId: interaction.user.id, inventoryMessage });
  }
};

export const updateMessage = async (
  pagination: Pagination,
  reaction: MessageReaction,
  user: User,
) => {
  const player = await DataStore.getDB()
    .getRepository(Player)
    .findOne({
      where: { discord_id: user.id },
      relations: ['inventories', 'inventories.cardType'],
    });

  if (!player) {
    return;
  }

  const paginateTenCards = player.inventories.slice(
    pagination.page * 10,
    pagination.page * 10 + 10,
  );
  const snippet = buildSnippet(user.username, paginateTenCards);

  await reaction.message.edit({ embeds: [snippet] });
  await DataStore.getDB()
    .createQueryBuilder()
    .update(Pagination)
    .set({
      page: pagination.page,
    })
    .where('id = :id', { id: pagination.id })
    .execute();
};
