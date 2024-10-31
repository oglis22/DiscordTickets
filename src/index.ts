import { Client, IntentsBitField } from 'discord.js';
import { token } from '../credentials.json';
import onReady from './events/onReady';
import setupEvent from './events/setupEvent';
import handleTickets from './events/handleTicket';

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

//REGISTER EVENTS

//READY EVENT
client.on('ready', (interaction) => { onReady(interaction); });
client.on('messageCreate', (interaction) => { setupEvent(interaction); })
client.on('interactionCreate', (interaction) => { handleTickets(interaction) })

client.login(token);
console.log("Bot is running")