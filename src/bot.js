require( 'dotenv' ).config();

const { Client, Intents } = require( 'discord.js' );
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on( 'ready' , () => {
    console.log( `Logged in as ${client.user.tag}!` );
  });
  
client.on('messageCreate', message => {
    if (message.content === 'ping') {
      message.channel.send('pong');
    }
  });

client.on('messageCreate'), message => {
    if (message.content === 'hello Kartus') {
        message.channel.send( `wassup ${client.user.tag}`);
    }
}

client.login( process.env.DISCORDJS_BOT_TOKEN );