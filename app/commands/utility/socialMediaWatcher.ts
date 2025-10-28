import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  TextChannel,
  ChannelType,
  StringSelectMenuBuilder,
} from "discord.js";
import { SlashCommand } from "@/types";
import { StringSelectMenuOptionBuilder } from "@discordjs/builders";
import { SocialType } from "@/types";

export function socialMediaWatcher(): SlashCommand {
  const data = new SlashCommandBuilder()
    .setName("social_media_watcher")
    .setDescription("Configurer un social media Watcher avec username public")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel où envoyer les notifications")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    );

  async function execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel("channel") as TextChannel;

    if (!channel) {
      await interaction.reply("Error occure on the channel recuperation");
      return;
    }

    const socialType = new StringSelectMenuBuilder()
      .setCustomId(`select_social_${channel}_${interaction.user.id}`)
      .setPlaceholder("Select your social media")
      .addOptions(
        {
          label: "Instagram",
          value: SocialType.INSTAGRAM,
        },
        {
          label: "TikTok",
          value: SocialType.TIKTOK,
        },
        {
          label: "Twitch",
          value: SocialType.TWITCH,
        },
        {
          label: "YouTube",
          value: SocialType.YOUTUBE,
        }
      );
    await interaction.reply({
      content: "Select your social media you want to watch",
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          socialType
        ),
      ],
    });
  }

  return { data: data as SlashCommandBuilder, execute };
}

export default socialMediaWatcher();
