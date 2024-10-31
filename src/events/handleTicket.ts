import { CacheType, Interaction, ChannelType, PermissionsBitField } from "discord.js";
import config from '../../config.json';
import tickets from '../../tickets.json';
import TicketBuild from "../utils/TicketBuild";
import TicketSetupBuilds from "../utils/TicketSetupBuilds";

export default async (interaction: Interaction<CacheType>) => {

    if (interaction.isButton() && interaction.customId == "close_ticket") {
        interaction.reply('closing...')
        interaction.channel.delete();

    }

    if (interaction.isButton() && interaction.customId == 'open_ticket') {
        interaction.reply({
            content: "Select ticket category",
            components: [TicketSetupBuilds.menuRow as any],
            ephemeral: true
        });
    }

    if (interaction.isStringSelectMenu() && interaction.customId == 'ticket_category') {

        const selectedCategory = interaction.values[0];
        const ticket = tickets.find(t => t.value === selectedCategory);

        if (!ticket) {
            return interaction.reply({ content: "Selected category is invalid.", ephemeral: true });
        }

        const channelName = `ticket-${ticket.discord_alias}-${interaction.user.username}`;

        const existingChannel = interaction.guild.channels.cache.find(channel =>
            channel.name === channelName && channel.type === ChannelType.GuildText
        );

        if (existingChannel) {
            return interaction.reply({ content: "You already have an open ticket in this category.", ephemeral: true });
        }

        const permissionOverwrites = [
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
            },
        ];

        ticket.access_roles.forEach(roleId => {
            permissionOverwrites.push({
                id: roleId,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
            });
        });

        const channel = await interaction.guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            permissionOverwrites,
            parent: config.ticket_category,
        });

        await interaction.reply({
            content: `Your ticket has been opened.`,
            ephemeral: true,
        });

        channel.send({
            embeds: [TicketBuild.getEmbed(interaction.user.id, interaction.user.displayName, ticket.label)],
            components: [TicketBuild.buttonRow as any]
        })
    }



};
