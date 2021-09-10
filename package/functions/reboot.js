const embed = require("../../package/embed.js")
const { execSync } = require("child_process")
const { docs } = require("../functions/docs/docs.json");
const { main } = require("../../../../package.json")

const reboot = async (client, message, args, name, code) => {

    const r = code.split("$reboot").length - 1

    if (code.split("$reboot")[r].startsWith("[")) {

        let feedback = code.split("$reboot[")[r].split("]")[0]

        if (!feedback) {
            execute = execSync(`node ${main}`);

        } else {
            let content = embed(feedback)
            return message.channel.send(content.error, content.embed).then(async () => execute = execSync(`node ${main}`))

        }

        try { execute } catch (err) {
            return message.channel.send(`${err.message}\n${docs.action}/reboot`)
        }

        code = code.replaceLast(`$reboot[${feedback}]`, execute)

        return {
            code: code,
        }
    } else {
        let execute = execSync(`node ${main}`);

        try { execute } catch (err) {
            return message.channel.send(`${err.message}\n${docs.action}/reboot`)
        }

        code = code.replaceLast("$reboot", "")

        return {
            code: code
        }
    }
}
module.exports = reboot;