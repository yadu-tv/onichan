require( 'dotenv' ).config();

const { Client, Intents, MessageEmbed } = require( 'discord.js' );
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// To show bot is online
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

var blacklist = ['moderator', 'admin', 'Onichan'];
const prefix = "~";

// Replies ping with pong
client.on('messageCreate', message => {
    if (message.content === 'ping') {
      message.channel.send('pong');
    }
});

// Replies sixty with nine
client.on('messageCreate', (message) => {
    if (message.content.toLowerCase == 'sixty') {
        message.reply('nine');
    }
})

// Smirks to messages containing 69 in it, excluding people in the blacklist
var sixtyNine = [69];
var blcountr = 0;
client.on('messageCreate', (message) => {
blcountr = 0;
    if(sixtyNine.some(word => message.content.includes(word))) {
        for (var i = 0; i < blacklist.length; i++ ) {
            if (message.member.roles.cache.some(role => role.name === `${blacklist[i]}`)) {
                blcountr++;
            }
        }
        if (blcountr === 0) {
            message.react('😏');
            console.log(`Smirked at ${message.author.tag}`);
        }
    }
})

// Deleted messages log
var DeletedMessageLog = "908271182246211594";
var delcountr = 0;
client.on('messageDelete', (messageDelete) => {

    const messageDeleteEmbed = new MessageEmbed()
	.setColor('#e7525c')
	.setAuthor(`${messageDelete.content}`)
	.addFields(
		{ name: 'Sender', value: `${messageDelete.author.tag}`, inline: true },
		{ name: 'Channel', value: `${messageDelete.channel}`, inline: true },
	)
	.setTimestamp()

    client.channels.cache.get(`${DeletedMessageLog}`).send({ embeds: [messageDeleteEmbed]});
})

// Command to send invite link
client.on('messageCreate', (message) => {
    if (message.author.id === client.user.id) return;
    if (message.content.charAt(0) === `${prefix}`) {
        const [cmd_name, ...args] = message.content.trim().substr(prefix.length).split("\/s+/");

        if (cmd_name === 'fetchinvite') {
            message.reply('Here you go :- https://discord.gg/K5UMjshn63');
        }
    }
})

// Command to delete other group links
var link = ['https://discord.gg/', 'https://chat.whatsapp.com/',]
client.on('messageCreate', (message) => {
    if (message.author.id === client.user.id) return;
    for (var i = 0; i < link.length; i++) {
        if (message.content.includes(link[i])) {
            message.delete();
            message.channel.send(`<@${message.author.id}> refrain from sending links`);
        }
    }
})


































client.login( process.env.DISCORDJS_BOT_TOKEN );