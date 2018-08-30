const discord = require('discord.js');
const bot = new discord.Client();
const PREFIX = ">";

bot.on("ready", function() {
    console.log('Ready');
    bot.user.setGame("[Dev] assasinskilleur").catch(console.error);
});

bot.login(process.env.TOKEN);
