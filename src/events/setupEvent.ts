import { ActionRow, CacheType, Interaction, Message, OmitPartialGroupDMChannel, PermissionsBitField } from "discord.js";
import config from '../../config.json';
import setup_builds from "../utils/TicketSetupBuilds";

export default (interaction: OmitPartialGroupDMChannel<Message<boolean>>) => {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
    if (interaction.content !== config.setup_code) return;

    interaction.channel.send({
        embeds: [setup_builds.embed],
        components: [setup_builds.buttonRow as any]
    });

}
