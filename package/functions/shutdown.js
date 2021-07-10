const embed = require("../../package/embed.js")
const { docs } = require("../functions/docs/docs.json");

const shutdown = async (client, message, args, name, code) => {

    const r = code.split("$shutdown").length - 1

    if (code.split("$shutdown")[r].startsWith("[")) {

        let feedback = code.split("$shutdown[")[r].split("]")[0]

        if (!feedback) {
            execute = await client.destroy();

        } else {
            let content = embed(feedback)
            return message.channel.send(content.error, content.embed).then(async () => execute = await client.destroy())

        }

        try { execute } catch (err) {
            return message.channel.send(`${err.message}\n${docs.action}/shutdown`)
        }

        code = code.replaceLast(`$shutdown[${feedback}]`, execute)

        return {
            code: code,
        }
    } else {
        let execute = await client.destroy();

        try { execute } catch (err) {
            return message.channel.send(`${err.message}\n${docs.action}/shutdown`)
        }

        code = code.replaceLast("$shutdown", "")

        return {
            code: code
        }
    }
}
module.exports = shutdown;