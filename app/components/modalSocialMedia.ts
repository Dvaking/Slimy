import {
  ActionRowBuilder,
  StringSelectMenuInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalSubmitInteraction,
} from "discord.js";

import { SocialMWInsert } from "@/types";
import { addSocialMW } from "@/database";

export async function modalSocialMedia(
  int: StringSelectMenuInteraction,
  selectedSocial: string,
  channel_id: string
) {
  const modal = new ModalBuilder()
    .setCustomId(`modal_watcher_${selectedSocial}_${channel_id}_${int.user.id}`)
    .setTitle(`Ajouter un watcher ${selectedSocial}`);

  const usernameInput = new TextInputBuilder()
    .setCustomId("username")
    .setLabel(`Nom d'utilisateur ${selectedSocial}`)
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const messageInput = new TextInputBuilder()
    .setCustomId("message")
    .setLabel("Message à envoyer")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

  const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(
    usernameInput
  );
  const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(
    messageInput
  );

  modal.addComponents(row1, row3);

  await int.showModal(modal);
}

export async function handleModalSubmit(
  interaction: ModalSubmitInteraction,
  serviceName: string,
  channelId: string
) {
  const username = interaction.fields.getTextInputValue("username");
  const message = interaction.fields.getTextInputValue("message");

  const service: SocialMWInsert = {
    server_id: `${interaction.guildId}`,
    channel_id: channelId,
    message,
    services_name: serviceName,
    username,
  };

  if ((await addSocialMW(service)) == null)
    await interaction.reply(`✅ ${serviceName} Watcher faild!`);

  await interaction.reply(
    `✅ ${serviceName} Watcher configuré pour @${username} dans ${channelId}.`
  );
}
