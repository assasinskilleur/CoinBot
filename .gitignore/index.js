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
            if(message.member.roles.has(message.guild.roles.find("name", "DJ").id)){
                if(!message.member.voiceChannel){
                    message.channel.sendMessage("Il faut être dans un channel vocale.");
                    return;
                }
                if(!message.guild.voiceConnection) {
			message.member.voiceChannel.join();
                    	message.channel.sendMessage("Le bot a rejoind " + message.member.voiceChannel.toString());
                }else{
                    message.channel.sendMessage("Je suis déjà dans un channel.");
                }
            }else{
		message.channel.sendMessage("Vous devez avoir le role DJ.");
	    }
            break;
        case "leave":
            if(message.member.roles.has(message.guild.roles.find("name", "DJ").id)){
                if(message.guild.voiceConnection){
                    message.member.voiceChannel.leave();
                }else{
                    message.channel.sendMessage("Je suis déjà partie.")
                }
            }else{
		message.channel.sendMessage("Vous devez avoir le role DJ.");
	    }
            break;
        case "play":
            break;
        case "skip":
            break;
	    case "stop":
            break;
        case "queue":
            break;
        default:
            message.channel.sendMessage("Invalid Command !");
            break;
    }
});



/*async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Je ne peut me connecter: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`Je ne peut me connecter ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅ **${song.title}** à été ajouté à la queue.`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}*/

// let modRole = message.guild.roles.find("name", "Mod");
// if(!message.member.roles.has(modRole.id)) {}
// if(!message.guild.roles.exists("name", "Mod")) {}

bot.login(process.env.TOKEN);
