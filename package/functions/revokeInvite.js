const { docs } = require("../functions/docs/docs.json");

const revokeInvite = async (client, message, args, name, code) => {

    let r = code.split("$revokeInvite[").length - 1

    let inside = code.split("$revokeInvite[")[r].split("]")[0]

    let invite;
    try {
        invite = await client.fetchInvite(inside)
    } catch {
        return message.channel.send(`:x: Invalid server invite in \`$revokeInvite[${inside}]\`.\n${docs.data}/revokeinvite`)
    }
    if (!invite.deletable) return message.channel.send(`❌ Failed to delete invite.`)
    invite = await invite.delete().catch(Err => { })

    code = code.replaceLast(`$revokeInvite[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = revokeInvite;