const emb = require("discordbot-script/package/embed")
const { docs } = require("../functions/docs/docs.json");

const sendCrosspostDM = async (client, message, args, name, code) => {

    if (code.split("$sendCrosspostDM").length >= 3) return message.channel.send(`:x: Cannot use more than one \`$sendCrosspostDM\`.\n${docs.action}/sendcrosspostdm`)

    const r = code.split("$sendCrosspostDM").length - 1

    let inside = code.split("$sendCrosspostDM[")[r].split(/]$/gm)[0]

    let [msg, ...userIDs] = inside.split(";");
    const m = emb(msg)

    let err = client.suppress.get(message.idd)


    userIDs.map(async id => {
        let user = await client.users.fetch(id).catch(err => { })
        if (!user) return message.channel.send(`:x: Invalid user ID in \`$sendCrosspostDM[${inside}]\`.\n${docs.action}/sendcrosspostdm`)

        if (user)
            user.send(m.error, m.embed).catch(err => { })

        if (!user && message.channel && err === undefined) return message.channel.send(`:x: Invalid user ID in \`$sendCrosspostDM[${inside}]\`.\n${docs.action}/sendcrosspostdm`)
        else if (!user && message.channel && err !== undefined) return message.channel.send(err).catch(err => { })

        // if (!user) return console.error(`Invalid user ID in $sendCrosspostDM[${inside}].\n${docs.action}/sendcrosspostdm`)

        code = code.replaceLast(`$sendCrosspostDM[${inside}]`, "")
        client.channel.set(message.idd, user)
    })

    return {
        code: code,
    }
}

module.exports = sendCrosspostDM;