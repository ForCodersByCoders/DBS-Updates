const { docs } = require("../functions/docs/docs.json");

const inviteInfo = async (client, message, args, name, code) => {

    let r = code.split("$inviteInfo[").length - 1

    let inside = code.split("$inviteInfo[")[r].split("]")[0]

    let fields = inside.split(";")

    let invite;
    try {
        invite = await client.fetchInvite(fields[0])
    } catch {
        return message.channel.send(`:x: Invalid guild invite in 1st field of \`$inviteInfo[${inside}]\`.\n${docs.data}/inviteinfo`)
    }

    if (fields[1] === "channel") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.channel.id || "undefined")
    }

    else if (fields[1] === "author") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.inviter.id || "undefined")
    }

    else if (fields[1] === "uses") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.uses || "undefined")
    }

    else if (fields[1] === "members") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.guild.memberCount || "undefined")
    }

    else if (fields[1] === "maxuses") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.maxUses || "undefined")
    }

    else if (fields[1] === "code") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.code || "undefined")
    }

    else if (fields[1] === "temporary") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.temporary || "undefined")
    }

    else if (fields[1] === "guild") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.guild.id || "undefined")
    }

    else if (fields[1] === "age") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.maxAge || "undefined")
    }

    else if (fields[1] === "deletable") {
        code = code.replaceLast(`$inviteInfo[${inside}]`, invite.deletable || "undefined")
    }

    else {
        return message.channel.send(`:x: Invalid option in 2nd field of \`$inviteInfo[${inside}]\``)
    }

    return {
        code: code
    }
}

module.exports = inviteInfo