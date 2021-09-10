const { docs } = require("../functions/docs/docs.json");

const randomString = async (client, message, args, name, code) => {

    const r = code.split("$randomString").length - 1

    if (code.split("$randomString")[r].startsWith("[")) {

        let inside = code.split("$randomString[")[r].split("]")[0]

        let [amount, symbols] = inside.split(";")

        if (!amount) amount = "10"
        if (!symbols) symbols = "abcdefghijklmnopqrstuvwxyz1234567890+×÷=/_<>!@#$%^&*()-,?";

        let err = client.suppress.get(message.idd)

        if (isNaN(amount) || Number(amount) < 1 && err === undefined) return message.channel.send(`:x: Invalid string length in \`$randomString[${inside}]\`.\n${docs.data}/randomstring`)
        else if (isNaN(amount) || Number(amount) < 1 && err !== undefined) return message.channel.send(err).catch(err => { })
        else amount = Number(amount)

        let m = ""

        for (let i = 0; i < amount; i++) {
            let symbol = symbols[Math.floor(Math.random() * symbols.length)]

            if (Math.floor(Math.random() * 100) < 50) {
                m += symbol.toLowerCase()
            } else {
                m += symbol.toUpperCase()
            }
        }

        code = code.split(`$randomString[${inside}]`).join(m)

        return {
            code: code,
        }
    } else {
        let amount = "10"
        let symbols = "abcdefghijklmnopqrstuvwxyz1234567890+×÷=/_<>!@#$%^&*()-,?";
        let m = ""

        for (let i = 0; i < amount; i++) {
            let symbol = symbols[Math.floor(Math.random() * symbols.length)]

            if (Math.floor(Math.random() * 100) < 50) {
                m += symbol.toLowerCase()
            } else {
                m += symbol.toUpperCase()
            }
        }

        code = code.split("$randomString").join(m)

        return {
            code: code
        }
    }
}
module.exports = randomString;