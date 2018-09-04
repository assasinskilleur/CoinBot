const discord = require('discord.js');
const bot = new discord.Client();
var PREFIX = "!";



bot.on("ready", function() {
    console.log('Ready');
    bot.user.setGame("!help for commands").catch(console.error);
});


bot.login(process.env.TOKEN);
