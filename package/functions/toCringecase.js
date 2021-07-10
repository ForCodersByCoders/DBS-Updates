const { docs } = require("../functions/docs/docs.json");

const toCringecase = (client, message, args, name, code) => {
    let r = code.split("$toCringecase[").length - 1

    let msg = code.split("$toCringecase[")[r].split("]")[0]

    if (!msg) return message.channel.send(`:x: Missing message in \`$toCringecase[${msg}]\`.\n${docs.data}/tocringecase`)


    var alternateCase = function (s) {
        var chars = s.toLowerCase().split("");
        for (var i = 0; i < chars.length; i += 2) {
            chars[i] = chars[i].toUpperCase();
        }
        return chars.join("");
    };


    code = code.replaceLast(`$toCringecase[${msg}]`, alternateCase(msg))

    return {
        code: code
    }
}

module.exports = toCringecase;
