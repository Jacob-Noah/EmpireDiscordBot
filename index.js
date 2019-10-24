const Discord = require("discord.js");
const bot = new Discord.Client();

const PREFIX = "$";

bot.on("ready", () => {
    console.log("Bot Online!")
    bot.user.setPresence({game:{name:"Prefix $ | Made by VexNoid Services", type:"PLAYING"}});
});

bot.on("message", (message) => {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "help":
            let embed = new Discord.RichEmbed()
                .setColor(0xFFD700)
                .setTitle("Commmands")
                .addField("New Commands", "N/A")
                .addField("Useful Commands", "Help - List all the commands\nDm - DM a user through the bot\nDmall - DMs all the users in the server")
                .setFooter("Made by VexNoid | Fallen#9211");

            message.author.send(embed)
            message.author.send()
            message.channel.send("Check yo DM'S! :scream:")
            break;
        case "dmall":
            if (args.length >= 2) {
                if (message.member.roles.find("name", "[Owner]")) {
                    args.shift();
                    let user = message.mentions.users.first();
                    let users = message.guild.members; 
                    users.forEach(user => user.send(" " + args.slice(1).join(" ")));
                } else {
                    message.channel.send("You must have the [Owner] role to use this command!");
                }
            } else {
                message.channel.send("Please use this format `~DMALL (Message)`")
            }
            break;
        case "discord":
            let embed = new Discord.RichEmbed()
                .setTitle("Our Discord")
                .addField("Discord", "https://discord.gg/ZKfUDgK")
            message.channel.sendEmbed(embed);
            break;
                break;  
            case "dm":
            if (args.length >= 3) {
                if (message.member.roles.find("name", "[Owner]")) {
                    args.shift();
                    let user = message.mentions.users.first();
                    user.send(args.slice(1).join(" "));
                    message.channel.send("Your DM message was sent! :white_check_mark:");
                } else {
                    message.channel.send("You must have the [Owner] role to use this command!");
                }
            } else {
                message.channel.send("Please use this format `~DM @(user) (Message)`")
            }
            break;
        default:
            message.channel.send("**Invalid Command! :red_circle:**")
    }
});
bot.login(process.env.TOKEN);
