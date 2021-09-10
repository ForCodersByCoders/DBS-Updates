const {docs} = require("../functions/docs/docs.json");
const fs = require("fs");

const fileCount = async (client, message, args, name, code) => {

    const r = code.split("$fileCount[").length - 1

        let inside = code.split("$fileCount[")[r].split("]")[0]
        let ERROR = `:x: Invalid file path \`$fileCount[${inside}]\`.\n${docs.data}/filecount`;
        let err = client.suppress.get(message.idd)

        if (!inside && err === undefined) return message.channel.send(ERROR)
            else if (!inside && err !== undefined) return message.channel.send(err).catch(err => {})

        FILE = 0;
        try {
            fs.readdirSync(`${inside}`).forEach(() => FILE++);
            if(FILE === undefined) FILE = fs.readdirSync(`../${inside}`).forEach(() => FILE++);
        } catch {
            return message.channel.send(ERROR)
        }

        code = code.replaceLast(`$fileCount[${inside}]`,  FILE)

        return {
            code: code,
        }
    }

module.exports = fileCount;
