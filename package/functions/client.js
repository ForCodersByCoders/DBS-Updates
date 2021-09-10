const Discord = require("discord.js")
const { docs } = require("discordbot-script/package/functions/docs/docs");
const moment = require("moment");
const ms = require('parse-ms');

const client = async (client, message, args, name, code) => {

    const r = code.split("$client").length - 1

    if (code.split("$client")[r].startsWith("[")) {

        let inside = code.split("$client[")[r].split("]")[0]

        let option = inside;

        const app = await client.fetchApplication()
        const owner = app.owner

        /* Returns the date and time the bot came online */
        let readyat = moment(client.readyAt).format("LLLL");

        /* Returns how long ago the bot came online */
        let readytimestamp = Object.entries(ms(Date.now() - client.readyTimestamp)).map((x, y) => {
            if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
        }).filter(x => x).join(", ");


        /* Returns the date and time the bot was created in the developer portal */
        let appCreatedAt = moment(app.createdAt).format("LLLL");

        /* Returns how long ago the bot was created in the developer portal */
        let appCreatedTimestamp = Object.entries(ms(Date.now() - app.createdTimestamp)).map((x, y) => {
            if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
        }).filter(x => x).join(", ");


        if (!option) return message.channel.send(`:x: Missing option in \`$client[${inside}]\`.\n${docs.compacts}/client`)
        if (![ //22 options   |   26 options with the duplicate output options
            "name",
            "id",
            "tag",
            "mention",
            "discriminator",
            "discrim",
            "avatar",
            "presence",
            "status",
            "activity",
            "lastmessagechannelid",
            "lastmcid",
            "lastmid",
            "lastmessageid",
            "readyat",
            "readytimestamp",
            "token",
            "ownerid",
            "appdescription",
            "ispublic",
            "appicon",
            "createdat",
            "createdtimestamp",
            "appname",
            "requireauth",
            "isownerverified"
        ].includes(option.toLowerCase())) return message.channel.send(`:x: Invalid option in \`$client[${inside}]\`.\n${docs.compacts}/client`)

        switch (option) {
            case "name": option = client.user.username;
                break;
            case "id": option = client.user.id;
                break;
            case "tag": option = client.user.tag;
                break;
            case "mention": option = client.user.toString()
                break;
            case "discriminator":
            case "discrim":
                option = client.user.discriminator
                break;
            case "readytimestamp": option = readytimestamp
                break;
            case "avatar": option = client.user.displayAvatarURL();
                break;
            case "presence":
            case "status":
                option = client.presence.status;
                break;
            case "activity": option = client.presence.activities;
                if (client.presence.activities[0]) {
                    option.activity = client.presence.activities[0].name
                }
                else option = "none"
                break;
            case "lastmessagechannelid":
            case "lastmcid":
                option = client.user.lastMessageChannelID;
                if (option === null) option = undefined
                break;
            case "lastmessageid":
            case "lastmid":
                option = client.user.lastMessageID;
                if (option === null) option = undefined
                break;
            case "readyat": option = readyat;
                break;
            case "token": option = client.token;
                break;
            case "ownerid":
                option = owner instanceof Discord.User ? owner.id : (() => {
                    const owners = app.owner.members.filter(e => app.owner.ownerID !== e.user.id).map(u => u.user.id)

                    owners.unshift(app.owner.ownerID)

                    owners.filter(x => x).join(", ")
                })()
                break;
            case "appdescription":
                option = app.description || "undefined"
                break;
            case "ispublic": option = app.botPublic ? true : false
                break;
            case "appicon": option = app.iconURL({ dynamic: true, size: 512 })
                break;
            case "createdat": option = appCreatedAt
                break;
            case "createdtimestamp": option = appCreatedTimestamp
                break;
            case "appname": option = app.name
                break;
            case "requireauth": option = app.botRequireCodeGrant
                break;
            case "isownerverified": option = client.user.verified;
                break;

            default: undefined
        };

        code = code.replaceLast(`$client[${inside}]`, option)

        return {
            code: code
        }
    } else {

        code = code.replaceLast("$client", client.user.id)

        return {
            code: code
        }
    }
}
module.exports = client;