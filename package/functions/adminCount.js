const adminCount = async (client, message, args, name, code) => {
    const r = code.split("$adminCount[").length - 1

    if (code.split("$adminCount")[r].startsWith("[")) {

        let inside = code.split("$adminCount[")[r].split("]")[0]
        let [guildID, option = 'all'] = inside.split(";")

        let id = (guildID ? guildID : message.guild.id)
        let guild = client.guilds.cache.get(id)
        let result;
        let check;


        if (!guild) {
            result = "undefined"
        } else {
            if (option === "bot" || option === "human") {
                let res = (option === "bot" ? true : false)
                check = guild.members.cache.filter(member => member.user.bot === res)
                result = await check.filter(member => member.permissions.has("ADMINISTRATOR")).size
            } else {

                result = await guild.members.cache.filter(member => member.permissions.has("ADMINISTRATOR")).size
            }
        }

        code = code.replaceLast(`$adminCount[${inside}]`, result);
        return {
            code: code
        }
    }
    else {
        let result = message.guild.members.cache.filter(member => member.permissions.has("ADMINISTRATOR")).size

        code = code.replaceLast("$adminCount", result)
        return {
            code: code
        }
    }
}
module.exports = adminCount