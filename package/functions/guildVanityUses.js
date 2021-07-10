const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildVanityUses = async (client, message, args, name, code, channel) => {

    const r = code.split("$guildVanityUses").length - 1

    if (code.split("$guildVanityUses")[r].startsWith("[")) {

        let inside = code.split("$guildVanityUses[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id);

        let err = client.suppress.get(message.idd)

        if (!guild && message.channel && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildVanityUses[${inside}]\`.\n${docs.data}/guildvanityuses`)
        else if (!guild && message.channel && err !== undefined) return message.channel.send(err).catch(err => {})

        let result;
        try {
      let vanity = await guild.fetchVanityData();
      result = vanity.uses
      } catch {
      result = "undefined";
      }
      
        code = code.replaceLast(`$guildVanityUses[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        let guild = message.guild
        let result;
        try {
      let vanity = await guild.fetchVanityData();
      result = vanity.uses;
      } catch {
      result = "undefined";
      }

        code = code.replaceLast("$guildVanityUses", result)
        
        return {
            code: code
        }
    }
}
module.exports = guildVanityUses;