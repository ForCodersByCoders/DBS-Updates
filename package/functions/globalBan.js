const globalBan = (client, message, args, name, code) => {

  let r = code.split("$globalBan[").length - 1

  let inside = code.split("$globalBan[")[r].split("]")[0]

  let [userID, reason] = inside.split(";")

  let servers = inside.split(";")[2]

  if (!servers) servers = "all"
  else servers = inside.split(";").slice(2)

  code = code.replaceLast(`$globalBan[${inside}]`, "")

  client.guilds.cache.map(guild => {
    if (!guild.me.hasPermission("BAN_MEMBERS")) return;
    if (servers !== "all" && !servers.includes(guild.id)) return;

    guild.members.ban(userID, { reason: reason }).catch(err => { })

  })

  return {
    code: code
  }
}

module.exports = globalBan;