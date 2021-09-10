const Discord = require('discord.js')
const client = new Discord.Client() //{ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }
const db = require("quick.db")
const chalk = require('chalk');
const fs = require('fs');
const moment = require("moment");


client.server = new Discord.Collection()
client.editIn = new Discord.Collection()
client.commands = new Discord.Collection()
client.spaceCommands = new Discord.Collection()
client.vars = new Discord.Collection()
client.joined = new Discord.Collection()
client.leave = new Discord.Collection()
client.deleteIn = new Discord.Collection()
client.channel = new Discord.Collection()
client.botLeave = new Discord.Collection()
client.executableCommands = new Discord.Collection()
client.botJoin = new Discord.Collection()
client.awaitedCommands = new Discord.Collection()
client.deletedCommands = new Discord.Collection()
client.embeds = new Discord.Collection()
client.attachment = new Discord.Collection()
client.addReactions = new Discord.Collection()
client.awaitReactions = new Discord.Collection()
client.ready = new Discord.Collection()
client.suppress = new Discord.Collection()
client.emojiCreate = new Discord.Collection()
client.emojiDelete = new Discord.Collection()
client.roleCreate = new Discord.Collection()
client.roleDelete = new Discord.Collection()
client.channelCreate = new Discord.Collection()
client.channelDelete = new Discord.Collection()
client.channelUpdate = new Discord.Collection()
client.userUpdate = new Discord.Collection()
client.reactionAdd = new Discord.Collection()
client.reactionRemove = new Discord.Collection()
client.guildUpdate = new Discord.Collection()
client.rateLimit = new Discord.Collection()
client.musicEnd = new Discord.Collection()
client.inviteCreate = new Discord.Collection()
// client.presenceUpdate = new Discord.Collection()
client.banned = new Discord.Collection()
client.unBanned = new Discord.Collection()
client.queue = new Discord.Collection()
client.error = new Discord.Collection()
client.logs = []


const botLeave = require("../../package/events/onBotLeave.js")
const banned = require("discordbot-script/package/events/guildBanAdd")
const unBanned = require("discordbot-script/package/events/guildBanRemove")
const emojiCreate = require("../../package/events/onEmojiCreate")
const rateLimit = require("../../package/events/onRateLimit")
const emojiDelete = require("../../package/events/onEmojiDelete")
const roleDelete = require("../../package/events/onRoleDelete")
const roleCreate = require("../../package/events/onRoleCreate")
const userUpdate = require("../../package/events/onUserUpdate")
const guildUpdate = require("../../package/events/onGuildUpdate")
const channelDelete = require("../../package/events/onChannelDelete")
const channelCreate = require("../../package/events/onChannelCreate")
const channelUpdate = require("../../package/events/onChannelUpdate")
const botJoin = require("../../package/events/onBotJoin.js")
const Status = require('../../package/bot/status.js')
const Message = require('../../package/events/message.js')
const Joined = require('discordbot-script/package/events/guildMemberAdd')
const Leave = require('discordbot-script/package/events/guildMemberRemove')
const LoopCommand = require("../../package/bot/loop.js")
const deletedMessage = require("../../package/events/messageDelete.js")
const Ready = require("../../package/events/onReady.js")
const CacheReactions = require("../../package/bot/cacheReactionRoles.js")
const ReactionAddCommand = require("../../package/events/onReactionAdd.js")
const ReactionRemoveCommand = require("../../package/events/onReactionRemove.js")
const ErrorCommand = require("../../package/events/onError.js")
// const presenceUpdate = require("../../../../../DB-Script_Updates/other/Not_Finished/onPresenceUpdate.js")
// const inviteCreate = require("../../../../../DB-Script_Updates/other/Not_Finished/onInviteCreate.js")

class DiscordLang {
    constructor(ops) {

        if (!ops.token) return console.error(chalk.redBright(`Invalid token!`))

        if (!ops.prefix) return console.error(chalk.redBright(`Invalid prefix!`))

        if (typeof ops.prefix !== "object") return console.error(chalk.redBright(`Prefix must be an array! `, chalk.greenBright(`Example: ["!", "?"]`)))

        this.prefix = ops.prefix

        client.login(ops.token)

        client.on("ready", async () => {
            console.log(chalk.greenBright(`Ready! ${moment(client.readyAt).format("LLLL")}`, chalk.cyanBright(`\n${client.user.tag} | ${client.user.id}`)))

            if (await db.fetch("downtime_0") != null) db.set("reconnect_0", Date.now())
            if (client.ready.size) {
                Ready(client)
                // CacheReactions(client)
            }
            CacheReactions(client)
        })

        // client.consoleSuppress = (ops.consoleSuppress || 'false')
        // client.consoleReturn = (ops.consoleReturn || 'false')

        client.on("reconnect", async () => {
            await db.set("reconnect_0", Date.now())
        })

        client.on("disconnect", async () => {
            await db.set("downtime_0", Date.now())
        })

    }





    MusicEndCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`MusicEndCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`MusicEndCommand needs a code! Name: ${x.name}\n`)
            client.musicEnd.set(x.name, x)
        })
    }



    ReactionAddCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`ReactionAdd Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`ReactionAdd Command needs a code! Name: ${x.name}\n`)
            client.reactionAdd.set(x.name, x)
        })
    } onReactionAdd() {
        client.on("messageReactionAdd", async (reaction, user) => {
            await ReactionAddCommand(client, reaction, user)
        })
    }


    ReactionRemoveCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`ReactionRemove Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`ReactionRemove Command needs a code! Name: ${x.name}\n`)
            client.reactionRemove.set(x.name, x)
        })
    } onReactionRemove() {
        client.on("messageReactionRemove", async (reaction, user) => {
            await ReactionRemoveCommand(client, reaction, user)
        })
    }


    Variables(ops) {
        if (typeof ops !== "object") return console.error(chalk.redBright(`Variable must be an object!`))
        Object.entries(ops).map(x => {
            client.vars[x[0]] = x[1]
        })
    }


    /*
      PresenceUpdateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
          if (!x.name) return console.error(`PresenceCommand needs a name! Code:\n${ops.code}`)
          if (!x.code) return console.error(`PresenceCommand needs a code! Name: ${ops.name}\n`)
          client.presence.set(x.name, x)
        })
      } onPresenceUpdate() {
        client.on("presenceUpdate", async (oldPresence, newPresence) => {
        await presenceUpdate(client, oldPresence, newPresence)
        })
      }
    */






    // Variables(ops) {
    //     if (typeof ops !== "object") return console.error(`Variable must be an object!`)

    //     if (!db.has("noDeletionVars")) db.set("noDeletionVars", {});
    //     Object.entries(ops).map(x => {
    //         db.set("noDeletionVars." + x[0], x[1]);
    //         client.vars[x[0]] = x[1]
    //     });

    //     Object.keys(db.get("noDeletionVars")).forEach(variable => {
    //         if (db.has("noDeletionVars." + variable.toLowerCase()) && client.vars[variable]) return;
    //         else return db.delete("noDeletionVars." + variable);
    //     });

    //     if (!db.has("permanentVars")) db.set("permanentVars", {});
    //     Object.keys(db.get("permanentVars")).forEach(variable => {
    //         let value = db.get("permanentVars." + variable.toLowerCase())
    //         client.vars[variable] = value;
    //     });
    // }




    ExecutableCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`ExecutableCommand needs a name! Code:\n${ops.code}`)
            if (!x.code) return console.error(`ExecutableCommand needs a code! Name: ${ops.name}\n`)
            client.executableCommands.set(x.name, x)
        })
    }



    ReadyCommand(ops) {
        if (!ops.name) return console.error(`Ready Command needs a name! Code:\n${ops.code}`)
        if (!ops.code) return console.error(`Ready Command needs a code! Name: ${ops.name}\n`)
        client.ready.set(ops.name, ops)
    }



    AwaitedCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`awaitedCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`awaitedCommand needs a code! Name: ${x.name}\n`)
            client.awaitedCommands.set(x.name, x)
        })
    }



    LoopCommand(ops, time) {
        if (!ops.name) return console.error(`Loop command needs a name. Code:\n${ops.code}`)
        else if (!ops.code) return console.error(`Loop command needs a code. Name: ${ops.name}`)
        else if (!time) return console.error(`Loop command needs an interval! Name: ${ops.name}\nCode:\n${ops.code}`)
        if (isNaN(time)) return console.error(`Loop command interval must be milliseconds. Not: ${time}`)
        LoopCommand(client, ops, time)
    }




    BotJoinCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`BotJoin Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`BotJoin Command needs a code! Name: ${x.name}\n`)
            client.botJoin.set(x.name, x)
        })
    } onBotJoin() {
        client.on("guildCreate", async guild => {
            await botJoin(client, guild)
        })
    }


    BotLeaveCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`BotLeave Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`BotLeave Command needs a code! Name: ${x.name}\n`)
            client.botLeave.set(x.name, x)
        })
    } onBotLeave() {
        client.on("guildDelete", async guild => {
            await botLeave(client, guild)
        })
    }





    EmojiCreateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`EmojiCreate Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`EmojiCreate Command needs a code! Name: ${x.name}\n`)
            client.emojiCreate.set(x.name, x)
        })
    } onEmojiCreate() {
        client.on("emojiCreate", async emoji => {
            await emojiCreate(client, emoji)
        })
    }

    EmojiDeleteCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`EmojiDelete Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`EmojiDelete Command needs a code! Name: ${x.name}\n`)
            client.emojiDelete.set(x.name, x)
        })
    } onEmojiDelete() {
        client.on("emojiDelete", async emoji => {
            await emojiDelete(client, emoji)
        })
    }




    RoleCreateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`RoleCreate Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`RoleCreate Command needs a code! Name: ${x.name}\n`)
            client.roleCreate.set(x.name, x)
        })
    } onRoleCreate() {
        client.on("roleCreate", async role => {
            await roleCreate(client, role)
        })
    }



    RoleCreateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`RoleCreate Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`RoleCreate Command needs a code! Name: ${x.name}\n`)
            client.roleCreate.set(x.name, x)
        })
    } onRoleCreate() {
        client.on("roleCreate", async role => {
            await roleCreate(client, role)
        })
    }



    RoleDeleteCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`RoleDelete Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`RoleDelete Command needs a code! Name: ${x.name}\n`)
            client.roleDelete.set(x.name, x)
        })
    } onRoleDelete() {
        client.on("roleDelete", async role => {
            await roleDelete(client, role)
        })
    }




    ChannelCreateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`ChannelCreate Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`ChannelCreate Command needs a code! Name: ${x.name}\n`)
            client.channelCreate.set(x.name, x)
        })
    } onChannelCreate() {
        client.on("channelCreate", async CH => {
            await channelCreate(client, CH)
        })
    }

    ChannelDeleteCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`ChannelDelete Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`ChannelDelete Command needs a code! Name: ${x.name}\n`)
            client.channelDelete.set(x.name, x)
        })
    } onChannelDelete() {
        client.on("channelDelete", async CH => {
            await channelDelete(client, CH)
        })
    }

    ChannelUpdateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`ChannelUpdate Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`ChannelUpdate Command needs a code! Name: ${x.name}\n`)
            client.channelUpdate.set(x.name, x)
        })
    } onChannelUpdate() {
        client.on("channelUpdate", async (oldChannel, newChannel) => {
            await channelUpdate(client, oldChannel, newChannel)
        })
    }





    UserUpdateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`RoleCreate Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`RoleCreate Command needs a code! Name: ${x.name}\n`)
            client.userUpdate.set(x.name, x)
        })
    } onUserUpdate() {
        client.on("userUpdate", async (oldUser, newUser) => {
            await userUpdate(client, oldUser, newUser)
        })
    }





    GuildUpdateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`RoleCreate Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`RoleCreate Command needs a code! Name: ${x.name}\n`)
            client.guildUpdate.set(x.name, x)
        })
    } onGuildUpdate() {
        client.on("guildUpdate", async (oldGuild, newGuild) => {
            await guildUpdate(client, oldGuild, newGuild)
        })
    }




    RateLimitCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`RateLimit Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`RateLimit Command needs a code! Name: ${x.name}\n`)
            client.rateLimit.set(x.name, x)
        })
    } onRateLimit() {
        client.on("rateLimit", async rateLimitInfo => {
            await rateLimit(client, rateLimitInfo)
        })
    }


    /*
      InviteCreateCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
          if (!x.name) return console.error(`RateLimit Command needs a name! Code:\n${x.code}`)
          if (!x.code) return console.error(`RateLimit Command needs a code! Name: ${x.name}\n`)
          client.inviteCreate.set(x.name, x)
        })
      } onInviteCreate() {
        client.on("inviteCreated", async invite => {
            // let id = invite
        await inviteCreate(client, invite)
        })
      }
    */



    MessageDeleteCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`MessageDeleteCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`MessageDeleteCommand needs a code! Name: ${x.name}\n`)
            client.deletedCommands.set(x.name, x)
        })
    } onMessageDelete() {
        client.on("messageDelete", async (message) => {
            await deletedMessage(client, message)
        })
    }




    JoinedCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`JoinedCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`JoinedCommand needs a code! Name: ${x.name}\n`)
            x.id = Math.floor(Math.random() * 39022439082982882223)
            client.joined.set(x.id, x)
        })
    } onJoined() {
        client.on("guildMemberAdd", async member => {
            await Joined(client, member)
        })
    }




    LeaveCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`LeaveCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`LeaveCommand needs a code! Name: ${x.name}\n`)
            x.id = Math.floor(Math.random() * 39022439082982882223)
            client.leave.set(x.id, x)
        })
    } onLeave() {
        client.on("guildMemberRemove", async member => {
            await Leave(client, member)
        })
    }




    BanCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`BanCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`BanCommand needs a code! Name: ${x.name}\n`)
            client.banned.set(x.name, x)
        })
    } onBan() {
        client.on("guildBanAdd", async (guild, user) => {
            await banned(client, guild, user)
        })
    }


    UnbanCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`UnbanCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`UnbanCommand needs a code! Name: ${x.name}\n`)
            client.unBanned.set(x.name, x)
        })
    } onUnban() {
        client.on("guildBanRemove", async (guild, user) => {
            await unBanned(client, guild, user)
        })
    }



    ErrorCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`ErrorCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`ErrorCommand needs a code! Name: ${x.name}\n`)
            client.error.set(x.name, x)
        })
    } onError() {
        client.on("error", async (error) => {
            await ErrorCommand(client, error)
        })
    }





    Command(ops) {
        ops = Array.from(arguments);

        if (!ops) return;
        ops.forEach(x => {
            if (!x.name) return console.error(`Command needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`Command needs a code! Name: ${x.name}\n`)

            let check = client.commands.get(x.name)
            if (check) {
                check.code.push(x.code)
            } else {
                x.code = [x.code]
                check = x;
            }
            client.commands.set(check.name, check)
        })
    }




    SpaceCommand(ops) {
        ops = Array.from(arguments);
        ops.forEach(x => {
            if (!x.name) return console.error(`SpaceCommand needs a name! Code:\n${x.code}`)
            if (!x.code) return console.error(`SpaceCommand needs a code! Name: ${x.name}\n`)
            client.spaceCommands.set(x.name, x)
        })
    }



    MessageEvent() {
        client.on("message", async message => {
            Message(client, message, this.prefix)
        })
    }



    Status(ops, time) {
        Status(client, ops, time)
    }



    MessageEditEvent() {
        client.on("messageUpdate", async (omsg, message) => {
            if (omsg.content === message.content) return
            await Message(client, message, this.prefix)
        })
    }


}

module.exports = DiscordLang