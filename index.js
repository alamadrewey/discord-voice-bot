const { Client, GatewayIntentBits, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

function conectar() {
    const canal = client.channels.cache.get(CHANNEL_ID);

    if (!canal || canal.type !== ChannelType.GuildVoice) {
        console.log("No encuentro el canal de voz.");
        return;
    }

    joinVoiceChannel({
        channelId: canal.id,
        guildId: canal.guild.id,
        adapterCreator: canal.guild.voiceAdapterCreator,
        selfMute: true,
        selfDeaf: true
    });

    console.log("Bot conectado a " + canal.name);
}

client.once("ready", () => {
    console.log("Bot conectado como " + client.user.tag);
    conectar();
});

client.login(TOKEN);
