import { Message, MessageEmbed, MessageReaction, User } from 'discord.js';
import { Pagination } from '../../../database/entities/Pagination';
import { getConnection, getRepository } from 'typeorm';
import { userNotFound } from './helper';
import { PlayerInventory } from '../../../database/entities/PlayerInventory';
import { Player } from '../../../database/entities/Player';

async function paginateMessage({
  msg,
  inventoryMessage,
}: {
  msg: Message;
  inventoryMessage: Message;
}) {
  return getConnection()
    .createQueryBuilder()
    .insert()
    .into(Pagination)
    .values([
      {
        page: 0,
        discordUser_id: msg.author.id,
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

export const cards = async ({ msg }: { msg: Message }) => {
  const player = await userNotFound({
    msg,
    relations: ['inventories', 'inventories.cardType'],
  });

  if (!player) {
    return;
  }

  const tenFirstCards = player.inventories.slice(0, 10);

  if (!tenFirstCards.length) {
    msg.channel.send("Aucune carte n'est présente dans l'inventaire");
    return;
  }

  const snippet = buildSnippet(msg.author.username, tenFirstCards);
  const inventoryMessage = await msg.channel.send({ embeds: [snippet] });

  if (player.inventories.length > 10) {
    await inventoryMessage.react('◀');
    await inventoryMessage.react('▶');

    await paginateMessage({ msg, inventoryMessage });
  }
};

export const updateMessage = async (
  pagination: Pagination,
  reaction: MessageReaction,
  user: User,
) => {
  const player = await getRepository(Player).findOne({
    where: { discord_id: user.id },
    relations: ['inventories', 'inventories.cardType'],
  });
  const paginateTenCards = player.inventories.slice(
    pagination.page * 10,
    pagination.page * 10 + 10,
  );
  const snippet = buildSnippet(user.username, paginateTenCards);

  await reaction.message.edit({ embeds: [snippet] });
  await getConnection()
    .createQueryBuilder()
    .update(Pagination)
    .set({
      page: pagination.page,
    })
    .where('id = :id', { id: pagination.id })
    .execute();
};
