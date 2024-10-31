import tickets from '../../tickets.json';
import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Discord Tickets')
    .setThumbnail('https://tickettool.xyz/images/footer.png')
    .setDescription("You're welcome to create a ticket, and our member will be there to help you in a few minutes!");

const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('ticket_category')
    .setPlaceholder('Wähle eine Kategorie')
    .addOptions(
        tickets.map(option => ({
            label: option.label,
            description: option.description,
            value: option.value,
        }))
    );

const menuRow = new ActionRowBuilder()
    .addComponents(selectMenu);

const button = new ButtonBuilder()
    .setCustomId('open_ticket')
    .setLabel('Open Ticket')
    .setStyle(ButtonStyle.Primary)

const buttonRow = new ActionRowBuilder()
    .addComponents(button)




export default { embed, buttonRow, menuRow };
