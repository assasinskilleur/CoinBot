const discord = require('discord.js');
const fs = require("fs");
const client = new discord.Client();

var autoroles = "Chevalier 💀";

const ownerID = '183975684891213824';

const active = new Map();

client.on("ready", function() {
    console.log('Ready');
    client.user.setGame("!help for commands").catch(console.error);
});

client.on("guildMemberAdd", function(member) {
    member.addRole(member.guild.roles.find("name", autoroles).id);
});

client.on("guildMemberRemove", function(member) {
    member.guild.channels.get('488019025591402499').sendMessage("Goodbye <@!" + member.id + ">.. Bon vent !");
});

client.on('message', message => {
    
    let prefixs = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));

    if(!prefixs[message.guild.id]){
        prefixs[message.guild.id] = {
            prefixs: "!"
        }
    }

    let prefix = prefixs[message.guild.id].prefixs;

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    try {
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let ops = {
            ownerID: ownerID,
            autoroles: autoroles,
            prefix: prefix,
            active: active
        }

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, ops);

        
    }catch (e){
        console.log(e.stack);
    }

});

client.login("NDk1NjUzNjQzMTg2NDcwOTIz.DpFNBA.iEoc3PJI8a34PHQif6xdFAkUehQ");
