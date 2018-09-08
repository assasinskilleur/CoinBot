const discord = require('discord.js');
const bot = new discord.Client();
//const YoutubeStream = require('youtube-audio-stream');
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
        case "ping":
            message.channel.sendMessage("POOOOOOONNNNNNNNGGGGGGGGGG !!!!!!!!!!");
            break;
        case "help":
            var embed = new discord.RichEmbed()
                .setTitle("Liste des commandes :")
                .addField(PREFIX + "setprefix {arg}", "Change le préfixe actuel.")
                .addField(PREFIX + "setautorole {arg}", "Affecte automatiquement le bon rôle à une personne rejoignant le serveur.")
                .addField(PREFIX + "play {arg}", "Comming Soon.")
                .addField(PREFIX + "stop", "Comming Soon.")
                .addField(PREFIX + "queue", "Comming Soon.", true)
                .setColor(0xFF0000)
                .setThumbnail("https://cdn.discordapp.com/attachments/418027455719407627/486979032815239168/redemption.jpg")
            message.channel.sendEmbed(embed);
            break;
        case "info":
            var embed = new discord.RichEmbed()
                .setTitle("Liste des informations :")
                .addField("Préfix", "Le préfixe actuel est : **" + PREFIX + "**")
                .addField("Autorole", "L'autorôle est configuré sur : **" + autoroles + "**", true)
                .setColor(0xFF0000)
                .setThumbnail("https://cdn.discordapp.com/attachments/418027455719407627/486979032815239168/redemption.jpg")
            message.channel.sendEmbed(embed);
            break;
        case "setautorole":
            if((message.guild.member(message.author).hasPermission("ADMINISTRATOR")) || (message.guild.member(message.author).hasPermission("MANAGE_ROLES"))) {
                if(args[1] && args[2]){
                    autoroles = args[1] + " " + args[2]
                    message.channel.sendMessage("L'autorôle est paramétré sur : " + autoroles);
                }
                if(args[1] && !args[2]){
                    autoroles = args[1];
                    message.channel.sendMessage("L'autorôle est paramétré sur : " + autoroles);
                }else{
                    message.channel.sendMessage("Commande incorrecte : " + PREFIX + "setautorole {arg}");
                }
            }else{
                message.channel.sendMessage("Vous n'avez pas la permission.");
            }
            break;
        case "setprefix":
            if(message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
                if(args[1]){
                    PREFIX = args[1];
                    message.channel.sendMessage("Le préfixe a bien été changé : " + PREFIX);
                }else{
                    message.channel.sendMessage("Commande incorrecte : " + PREFIX + "setprefix {arg}");
                }
            }else{
                message.channel.sendMessage("Vous n'avez pas la permission.");
            }
            break;
        case "join":
            break;
        case "play":
            /*let voiceChannel = message.guild.channels
            .filter(function (channel) { return channel.type === 'voice' })
            .find("name", "Music");
            // On récupère les arguments de la commande 
            // il faudrait utiliser une expression régulière pour valider le lien youtube
            // On rejoint le channel audio
            voiceChannel
            .join()
            .then(function (connection) {
            // On démarre un stream à partir de la vidéo youtube
            let stream = YoutubeStream(args[1])
            stream.on('error', function () {
                message.reply("Je n'ai pas réussi à lire cette vidéo :(")
                connection.disconnect()
            });
            // On envoie le stream au channel audio
            // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
            connection
                .playStream(stream)
                .on('end', function () {
                connection.disconnect()
                });
            });*/
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
