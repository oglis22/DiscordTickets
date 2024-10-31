import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

const getEmbed = (discord_id: string, discord_name: string, ticket_type: string): EmbedBuilder => {

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Discord Tickets')
        .setThumbnail('https://tickettool.xyz/images/footer.png')
        .setDescription(" ")
        .addFields([
            {
                name: "Discord ID", value: discord_id
            },
            {
                name: 'Discord Name', value: discord_name
            },
            {
                name: "Ticket Type", value: ticket_type,
            }
        ])
        .setTimestamp();

    return embed;

}

const button = new ButtonBuilder()
    .setCustomId('close_ticket')
    .setLabel('Close Ticket')
    .setStyle(ButtonStyle.Danger)

const buttonRow = new ActionRowBuilder()
    .addComponents(button);

export default { getEmbed, buttonRow };
