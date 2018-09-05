const discord = require('discord.js');
const bot = new discord.Client();
var PREFIX = "!";
var autoroles = "Chevalier 💀";

bot.on("ready", function() {
    console.log('Ready');
    bot.user.setGame("!help for commands").catch(console.error);
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "new").sendMessage("Hello " + member.mention + " ! Bienvenue sur Ordre de la Rédemption. Merci de lire " + message.guild.channels.get('329963414296461312').toString() + " avant tout autre action.");
    member.addRole(member.guild.roles.find("name", autoroles));
});

bot.on("message", function(message) {
    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(' ');

    switch (args[0].toLowerCase()) {
        case "help":
            var embed = new discord.RichEmbed()
                .addField("!setautorole {arg}", "Changer le role quand un joueur rejoinds")
                .addField("!setprefix {arg}", "Changer le prefix " + PREFIX + " en n'importe quoi", true)
                .setColor(0xFF0000)
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "setautorole":
            if((message.guild.member(message.author).hasPermission("ADMINISTRATOR")) || (message.guild.member(message.author).hasPermission("MANAGE_ROLES"))) {
                if(args[1] && args[2]){
                    autoroles = args[1] + " " + args[2]
                }
                if(args[1] && !args[2]){
                    autoroles = args[1];
                }
            }
            break;
        case "setprefix":
            if(message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
                if(args[1]){
                    PREFIX = args[1];
                }
            }
            break;
        default:
            message.channel.sendMessage("Invalid Command !");
            break;
    }
});

// let modRole = message.guild.roles.find("name", "Mod");
// if(!message.member.roles.has(modRole.id)) {}
// if(!message.guild.roles.exists("name", "Mod")) {}

bot.login(process.env.TOKEN);
