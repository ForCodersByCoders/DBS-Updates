const sortGuildNames = async (client, message, args, name, code, channel) => {

    const r = code.split("$sortGuildNames").length - 1

    if (code.split("$sortGuildNames")[r].startsWith("[")) {

        let inside = code.split("$sortGuildNames[")[r].split("]")[0]
        let [number, separator] = inside.split(";")
        let err = client.suppress.get(message.idd)

        if (!separator) separator = "\n"
        if (isNaN(number) || Number(number) < 1 || (!number)) number = 10

        code = code.replaceLast(`$sortGuildNames[${inside}]`, client.guilds.cache.map(guild => guild.name.split("[").join("").split("]").join("")).slice(0, Number(number)).join(separator))

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$sortGuildNames", client.guilds.cache.map(guild => guild.name.split("[").join("").split("]").join("")).slice(0, 10).join("\n"))

        return {
            code: code
        }
    }
}
module.exports = sortGuildNames;