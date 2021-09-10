const Discord = require("discord.js")
const edit = require('discordbot-script/package/bot/edit')
const delete_ = require('discordbot-script/package/bot/delete')
const interpret = require("discordbot-script/package/interpreter")
const addreactions_ = require("discordbot-script/package/bot/addreactions")

const guildUpdate = async (client, oldGuild, newGuild) => {

    client.guildUpdate.map(async command => {

        let message = {
            guild: oldGuild,
            content: "",
            idd: Math.floor(Math.random() * 10101003949393),
            author: newGuild
        }

        let commandCode = command.code
            .replace(/{oldname}/gm, oldGuild.name).replace(/{newname}/gm, newGuild.name)
            .replace(/{oldicon}/gm, oldGuild.iconURL()).replace(/{newicon}/gm, newGuild.iconURL())
            .replace(/{oldowner}/gm, oldGuild.ownerID).replace(/{newowner}/gm, newGuild.ownerID)
            .replace(/{oldafkchannel}/gm, oldGuild.afkChannelID).replace(/{newafkchannel}/gm, newGuild.afkChannelID)
            .replace(/{oldtimeout}/gm, oldGuild.afkTimeout).replace(/{newtimeout}/gm, newGuild.afkTimeout)
            .replace(/{oldupdateschannel}/gm, oldGuild.publicUpdatesChannelID).replace(/{newupdateschannel}/gm, newGuild.publicUpdatesChannelID)
            .replace(/{oldruleschannel}/gm, oldGuild.rulesChannelID).replace(/{newruleschannel}/gm, newGuild.rulesChannelID)
            .replace(/{oldsystemchannel}/gm, oldGuild.systemChannelID).replace(/{newsystemchannel}/gm, newGuild.systemChannelID)
            .replace(/{olddescription}/gm, oldGuild.description).replace(/{newdescription}/gm, newGuild.description)
            .replace(/{oldnotifications}/gm, oldGuild.defaultMessageNotifications).replace(/{newnotifications}/gm, newGuild.defaultMessageNotifications)
            .replace(/{oldexplicitfilter}/gm, oldGuild.explicitContentFilter).replace(/{newexplicitfilter}/gm, newGuild.explicitContentFilter)
            .replace(/{oldverificationlvl}/gm, oldGuild.verificationLevel).replace(/{newverificationlvl}/gm, newGuild.verificationLevel)
            .replace(/{oldmfa}/gm, oldGuild.mfaLevel).replace(/{newmfa}/gm, newGuild.mfaLevel)
            .replace(/{oldregion}/gm, oldGuild.region).replace(/{newregion}/gm, newGuild.region)
            .replace(/{oldlocale}/gm, oldGuild.preferredLocale).replace(/{newlocale}/gm, newGuild.preferredLocale)
            .replace(/{oldpartnered}/gm, oldGuild.partnered).replace(/{newpartnered}/gm, newGuild.partnered)
            .replace(/{oldverified}/gm, oldGuild.verified).replace(/{newverified}/gm, newGuild.verified)
            .replace(/{oldvanity}/gm, oldGuild.vanityURLCode).replace(/{newvanity}/gm, newGuild.vanityURLCode)

        let name = await interpret(client, message, message.content.split(" "), command.name, command.name)

        let channel = await client.channels.fetch(name).catch(err => { })

        if (!channel) return console.error(`Missing or incorrect channel: GuildUpdateCommand[${name}]`)

        client.embeds.set(message.idds, new Discord.MessageEmbed())

        let code = await interpret(client, message, message.content.split(" "), command.name, commandCode)

        if (code) {
            let msg = channel.send(code, client.embeds.get(message.idd)).catch(err => { })

            edit(client, message, msg, client.editIn.get(message.idd))

            delete_(client, message, msg)

            addreactions_(client, message, msg)

            client.addReactions.delete(message.idd)

            client.suppress.delete(message.idd)

            client.embeds.delete(message.idd)
        }

    })
}

module.exports = guildUpdate;