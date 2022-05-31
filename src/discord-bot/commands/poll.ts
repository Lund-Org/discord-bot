import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

const CMD_NAME = 'poll' as const;
const reactionEmojis = [
  '1️⃣',
  '2️⃣',
  '3️⃣',
  '4️⃣',
  '5️⃣',
  '6️⃣',
  '7️⃣',
  '8️⃣',
  '9️⃣',
  '🔟',
] as const;

export function pollCmd() {
  return new SlashCommandBuilder()
    .setName(CMD_NAME)
    .setDescription('Crée un sondage')
    .addStringOption((option) =>
      option
        .setName('label')
        .setDescription('Intitulé du sondage')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('option1').setDescription('Choix 1').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('option2').setDescription('Choix 2').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('option3').setDescription('Choix 3').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('option4').setDescription('Choix 4').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('option5').setDescription('Choix 5').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('option6').setDescription('Choix 6').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('option7').setDescription('Choix 7').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('option8').setDescription('Choix 8').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('option9').setDescription('Choix 9').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('option10').setDescription('Choix 10').setRequired(false),
    )
    .toJSON();
}

export const pollResponse = {
  type: CMD_NAME,
  callback: pollCallback,
};

async function pollCallback(interaction: CommandInteraction) {
  const label = interaction.options.getString('query', true);
  const choices = Array.from(Array(10))
    .map((n) =>
      interaction.options.getString(`option${n + 1}`, n < 2 ? true : false),
    )
    .filter(Boolean);
  const emojis: Array<string> = choices.map(
    (_, index): string => reactionEmojis[index],
  );

  await interaction.reply(`${label}\n${generateAnswers(choices, emojis)}`);

  const message = (await interaction.fetchReply()) as Message;
  await addReactions(message, emojis);
}

/**
 * Generate the answer list
 * @param answers The list of the answers of the poll
 * @param emojis The random emojis linked to the answers
 */
function generateAnswers(answers: Array<string>, emojis: Array<string>) {
  return answers
    .map((answer, index) => {
      return `${emojis[index]} ${answer}`;
    })
    .join('\n');
}

/**
 * Generate the poll reactions
 * @param messageToReact The message where we want to add the reactions
 * @param emojis The random emojis linked to the answers
 */
async function addReactions(messageToReact: Message, emojis: Array<string>) {
  for (const emoji of emojis) {
    await messageToReact.react(emoji);
  }
}
