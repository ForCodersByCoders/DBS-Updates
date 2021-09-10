const { docs } = require("discordbot-script/package/functions/docs/docs");

const usersWithTag = async (client, message, args, name, code) => {

    let r = code.split("$usersWithTag[").length - 1

    let inside = code.split("$usersWithTag[")[r].split("]")[0]

    let [Tag, guildID] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let id = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$usersWithTag[${inside}]\`.\n${docs.action}/userswithtag`)



    if ((!Tag) && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Tag is not given in \`$usersWithTag\`\n${docs.data}/userswithtag`);
    } else if ((!Tag) && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Tag is not given in 1st field of \`$usersWithTag\`\n${docs.data}/userswithtag`);
    }


    if ((Tag > 9999 || Tag.length < 4 || Tag.length > 4 || isNaN(Tag) || Tag === "undefined" || Tag === "false") && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Invalid tag in \`$usersWithTag\`\n${docs.data}/userswithtag`);
    } else if ((Tag > 9999 || Tag.length < 4 || Tag.length > 4 || isNaN(Tag) || Tag === "undefined" || Tag === "false") && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Invalid tag in 1st field of \`$usersWithTag\`\n${docs.data}/userswithtag`);
    }

    let user = await guild.members.cache.filter(x => x.user.discriminator == (Tag || message.author.discriminator));

    if (!user && err === undefined) return message.channel.send(`:x: No tags found in \`$usersWithTag[${inside}]\`.\n${docs.data}/userswithtag`)

    let users = []

    user.forEach(x => { users.push(x.user.tag) })

    code = code.replaceLast(`$usersWithTag[${inside}]`, users.join("\n") || "None")

    return {
        code: code
    }
}

module.exports = usersWithTag;