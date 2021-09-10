// https://www.calculateme.com/time/days/to-milliseconds/1
const { docs } = require("../functions/docs/docs.json");

const creationTimestamp = async (client, message, args, name, code) => {

    let r = code.split("$creationTimestamp[").length - 1

    let inside = code.split("$creationTimestamp[")[r].split("]")[0]

    let opt = inside.split(";")[1] || "user"

    let id = inside.split(";")[0]

    let option = message.guild.roles.cache.get(id) || client.users.cache.get(id) || message.guild.channels.cache.get(id) || client.guilds.cache.get(id)

    let err = client.suppress.get(message.idd)

    if (!option && err === undefined) return message.channel.send(`:x: Invalid ID in \`$creationTimestamp[${inside}]\`.\n${docs.data}/creationtimestamp`)
    else if (!option && err !== undefined) return message.channel.send(err).catch(err => { })

    if (client.users.cache.get(id) && message.guild.members.cache.get(id)) {
        if (opt === "member") {
            let member = message.guild.members.cache.get(id)
            option = member.joinedTimestamp
        }
    }

    if (opt !== "member") option = option.createdTimestamp
    else {
        option = Date.now() - option
    }

    code = code.replaceLast(`$creationTimestamp[${inside}]`, option)

    return {
        code: code
    }
}

module.exports = creationTimestamp;

/* const creationTimestamp = async (client, message, args, name, code) => {

  let r = code.split("$creationTimestamp[").length - 1

  let inside = code.split("$creationTimestamp[")[r].split("]")[0]

  let user;
  try {
    user = await client.users.fetch(inside)
  } catch {
    return message.channel.send(`Invalid user ID given in \`${inside}\`.`)
  }

  let check = Date.now() - user.createdTimestamp

    code = code.replaceLast(`$creationTimestamp[${inside}]`, check)

    return {
        code: code
    }
}

module.exports = creationTimestamp; */