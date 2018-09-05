const discord = require('discord.js');
const bot = new discord.Client();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
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
            if(message.member.roles.has(message.guild.roles.find("name", "DJ"))){
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
            }
            break;
        case "leave":
            if(message.member.roles.has(message.guild.roles.find("name", "DJ"))){
                if(message.guild.voiceConnection){
                    message.member.voiceChannel.leave();
                }else{
                    message.channel.sendMessage("Je suis déjà partie.")
                }
            }
            break;
        case "play":
            const voiceChannel = message.member.voiceChannel;
            if(!message.member.roles.has(message.guild.roles.find("name", "DJ"))){
                message.channel.sendMessage("Vous devez être DJ pour jouer de la musique");
            }
            if (!voiceChannel) return message.channel.send('Vous devez être dans un channel.');
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                return message.channel.send("Je n'arrive pas à me connecter je n'ai pas les droits");
            }
            if (!permissions.has('SPEAK')) {
                return message.channel.send('Je ne peux pas parler dans ce channel');
            }

            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                }
                return message.channel.send(`✅ Playlist: **${playlist.title}** a été ajouté a la queue!`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        let index = 0;
                        message.channel.send(`__**Choix de la musique:**__ ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')} Veuillez choisir entre 1-10 la musique.`);
                        // eslint-disable-next-line max-depth
                        try {
                            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            return message.channel.send('No or invalid value entered, cancelling video selection.');
                        }
                        const videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        return message.channel.send("🆘 Je n'arrive pas a avoir de resulats.");
                    }
                }
                return handleVideo(video, message, voiceChannel);
            }
        case "skip":
            if (!message.member.voiceChannel) return message.channel.send("Tu n'est pas dans un channel vocale!");
            if (!serverQueue) return message.channel.send("La queue est vide.");
            serverQueue.connection.dispatcher.end('⏭ Musique Suivante');
            break;
        case "stop":
            if (!message.member.voiceChannel) return message.channel.send('Tu n\'est pas dans un channel vocale!');
            if (!serverQueue) return message.channel.send('Stop');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('⏹ Musique arreté ');
            break;
        case "queue":
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            message.channel.send(`__**File D'attente**__ ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} **Actuellement en route:** ${serverQueue.songs[0].title}`);
            break;
        default:
            message.channel.sendMessage("Invalid Command !");
            break;
    }
});



async function handleVideo(video, message, voiceChannel, playlist = false) {
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
}

// let modRole = message.guild.roles.find("name", "Mod");
// if(!message.member.roles.has(modRole.id)) {}
// if(!message.guild.roles.exists("name", "Mod")) {}

bot.login(process.env.TOKEN);
