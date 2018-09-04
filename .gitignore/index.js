const discord = require('discord.js');
const bot = new discord.Client();
var PREFIX = "!";

bot.on("ready", function() {
    console.log('Ready');
    bot.user.setGame("!help for commands").catch(console.error);
});

bot.login(process.env.TOKEN);

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage("Hello " + member.mention + " ! Bienvenue sur Ordre de la Rédemption. Merci de lire " + message.guild.channels.get('329963414296461312').toString() + " avant tout autre action.");
    member.addRole(member.guild.roles.find("name", "jean"));
});

bot.on("message", function(message) {
    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(' ');

    switch (args[0].toLowerCase()) {
        case "help":
            var embed = new discord.RichEmbed()
                .addField("TRT >> Bot", "Made by assasinskilleur")
                .addField("Operateur :", ">compo {map}", true)
                .setColor(0xFF0000)
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "setautorole":
            if(args[1] && args[2]){
                autoroles = args[1] + " " + args[2]
            }
            if(args[1] && !args[2]){
                autoroles = args[1];
            }
            break;
        case "setprefix":
            if(args[1]){
                PREFIX = args[1];
            }
        default:
            message.channel.sendMessage("Invalid Command !");
            break;
    }
});
