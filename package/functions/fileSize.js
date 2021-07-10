const {docs} = require("../functions/docs/docs.json");
const fs = require("fs");

const fileSize = async (client, message, args, name, code) => {

    const r = code.split("$fileSize[").length - 1

        let inside = code.split("$fileSize[")[r].split("]")[0]
        let ERROR = `:x: Invalid file path \`$fileSize[${inside}]\`.\n${docs.data}/filesize`;
        let err = client.suppress.get(message.idd)

        if (!inside && err === undefined) return message.channel.send(ERROR)
            else if (!inside && err !== undefined) return message.channel.send(err).catch(err => {})

        FILE = 0;
        try {
            fs.readFileSync(`${inside}`).forEach(() => FILE++);
            if(FILE === undefined) FILE = fs.readFileSync(`../${inside}`).forEach(() => FILE++);
        } catch {
            return message.channel.send(ERROR)
        }

        code = code.replaceLast(`$fileSize[${inside}]`,  FILE)

        return {
            code: code,
        }
    }

module.exports = fileSize;
