const { docs } = require("../functions/docs/docs.json");

const clear = async (client, message, args, name, code) => {

    if (code.split("$clear[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$clear\`.\n${docs.action}/clear`)

    let inside = code.split("$clear[")[1].split("]")[0]

    let [number, user, channel] = inside.split(";")

    let err = client.suppress.get(message.idd)

    if (isNaN(number) || Number(number) < 1 && err === undefined) return message.channel.send(`:x: Invalid amount in \`$clear[${inside}]\`.\n${docs.action}/clear`)
    else if (isNaN(number) || Number(number) < 1 && err !== undefined) return message.channel.send(err).catch(err => { })
    else number = Number(number)

    if (!user) user = "everyone"

    if (!channel) channel = message.channel
    else channel = client.channels.cache.get(channel)

    if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$clear[${inside}]\`.\n${docs.action}/clear`)
    else if (!channel && err !== undefined) return message.channel.send(err).catch(err => { })

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES") && err === undefined) return message.channel.send(`:x: Failed to delete messages. Check bot permissions.\n${docs.action}/clear`)
    else if (!message.guild.me.hasPermission("MANAGE_MESSAGES") && err !== undefined) return message.channel.send("Error " + err).catch(err => { })

    if (user === "everyone") {
        await channel.bulkDelete(Number(number)).catch(err => { })

        code = code.replaceLast(`$clear[${inside}]`, "")
        return {
            code: code
        }
    }

    let messages = await channel.messages.fetch({
        limit: number
    })

    messages.map(msg => {
        if (user === "everyone") {
            msg.delete(1)
        } else {
            if (user === msg.author.id) msg.delete(1)
        }
    })

    code = code.replaceLast(`$clear[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = clear;









// const clear = async (client, message, args, name, code) => {

//     if (code.split("$clear[").length >= 3) return message.channel.send(`:x: Cant use more than one \`$clear\`.\n${docs.action}/clear`)

//     let inside = code.split("$clear[")[1].split("]")[0]

//     let [number, user, channel] = inside.split(";")

//     let err = client.suppress.get(message.idd)

//     if (isNaN(number) || Number(number) < 1 && err === undefined) return message.channel.send(`:x: Invalid amount in \`$clear[${inside}]\`.\n${docs.action}/clear`)
//     else if (isNaN(number) || Number(number) < 1 && err !== undefined) return message.channel.send(err).catch(err => {})
//     else number = Number(number)

//     if (!user) user = "everyone"
//     else user = client.users.cache.get(user)

//     if (!channel) channel = message.channel.id
//     else channel = client.channels.cache.get(channel)

//     if (!channel && err === undefined) return message.channel.send(`:x: Invalid channel ID in \`$clear[${inside}]\`.\n${docs.action}/clear`)
//     else if (!channel && err !== undefined) return message.channel.send(err).catch(err => {})

//     if (!message.guild.me.hasPermission("MANAGE_MESSAGES") && err === undefined) return message.channel.send(`:x: Failed to delete messages. Check bot permissions.\n${docs.action}/clear`)
//     else if (!message.guild.me.hasPermission("MANAGE_MESSAGES") && err !== undefined) return message.channel.send("Error "+ err).catch(err => {})

//     if (user === "everyone") {
//         await channel.bulkDelete(Number(number)).catch(err => {})

//         code = code.replaceLast(`$clear[${inside}]`, "")
//         return{
//             code: code
//         }
//     }

//     let messages = await channel.messages.fetch({
//         limit: number
//     }) 

//     messages.map(msg => {
//         if (user === "everyone") {
//             msg.delete(1)
//         } else {
//             if (user === msg.author.id) msg.delete(1)
//         }
//     })

//     code = code.replaceLast(`$clear[${inside}]`, "")

//     return {
//         code: code
//     }
// }

// module.exports = clear;




// switch (user) {
//     case "everyone":
//             if(channel){
//             await channel.bulkDelete(Number(number)).catch(err => {})
//         } 

//     default:
//         break;
// }