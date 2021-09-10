const parse = require('parse-ms');
const ms = require("ms");
const {docs} = require("../functions/docs/docs.json");

const botTyping = async (client, message, args, name, code) => {

    const r = code.split("$botTyping").length - 1


    if (code.split("$botTyping")[r].startsWith("[")) {

        let inside = code.split("$botTyping[")[r].split("]")[0]
        let time = (isNaN(inside) ? ms(inside) : Number(inside) || 5000)

        let err = client.suppress.get(message.idd)

        if (!time && message && err === undefined) return message.channel.send(`:x: Invalid time in \`$botTyping[${inside}]\`.\n${docs.data}/bottyping`)
        else if (!time && message && err !== undefined) return message.channel.send(err).catch(err => {})

        message.channel.startTyping()
        setTimeout(() => {
            message.channel.stopTyping()
        }, time);
      
        code = code.replaceLast(`$botTyping[${inside}]`, "")

        return {
            code: code,
        }
    } else {
        message.channel.startTyping()
        setTimeout(() => {
            message.channel.stopTyping()
        }, 5000);

        code = code.replaceLast("$botTyping", "")
        
        return {
            code: code
        }
    }
}
module.exports = botTyping
