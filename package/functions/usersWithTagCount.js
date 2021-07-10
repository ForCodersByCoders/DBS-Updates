const { docs } = require("../functions/docs/docs.json");

const usersWithTagCount = async (client, message, args, name, code) => {

    let r = code.split("$usersWithTagCount[").length - 1

    let inside = code.split("$usersWithTagCount[")[r].split("]")[0]

    let [Tag, guildID] = inside.split(";")
    let err = client.suppress.get(message.idd)

    let id = (guildID ? guildID : message.guild.id)
    let guild = client.guilds.cache.get(id)
    if (!guild) return message.channel.send(`:x: Invalid guild ID in 2nd field of \`$usersWithTagCount[${inside}]\`.\n${docs.action}/userswithtagcount`)



    if ((!Tag) && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Tag is not given in \`$usersWithTagCount\`\n${docs.data}/userswithtagcount`);
    } else if ((!Tag) && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Tag is not given in 1st field of \`$usersWithTagCount\`\n${docs.data}/userswithtagcount`);
    }


    if ((Tag > 9999 || Tag.length < 4 || Tag.length > 4 || isNaN(Tag) || Tag === "undefined" || Tag === "false") && (inside.split(";").length === 1) && err === undefined) {
        return message.channel.send(`:x: Invalid tag in \`$usersWithTagCount\`\n${docs.data}/userswithtagcount`);
    } else if ((Tag > 9999 || Tag.length < 4 || Tag.length > 4 || isNaN(Tag) || Tag === "undefined" || Tag === "false") && (inside.split(";").length === 2) && err === undefined) {
        return message.channel.send(`:x: Invalid tag in 1st field of \`$usersWithTagCount\`\n${docs.data}/userswithtagcount`);
    }

    let user = await guild.members.cache.filter(x => x.user.discriminator == (Tag || message.author.discriminator));


    if (!user && err === undefined) return message.channel.send(`:x: No tags found in \`$usersWithTagCount[${inside}]\`.\n${docs.data}/usersWithtagcount`)

    let users = []

    user.forEach(x => { users.push(x.user.tag) })

    code = code.replaceLast(`$usersWithTagCount[${inside}]`, users.length)

    return {
        code: code
    }
}

module.exports = usersWithTagCount;