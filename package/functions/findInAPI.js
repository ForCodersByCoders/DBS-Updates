const fetch = require("node-fetch")
const { docs } = require("../functions/docs/docs.json");

const findInAPI = async (client, message, args, name, code, array, api) => {

    let err = client.suppress.get(message.idd)
    if (!api && err === undefined) return message.channel.send(`:x: You can not use this keyword without **api** property in command.\n${docs.data}/findinapi`)

    let r = code.split("$findInAPI[").length - 1

    let inside = code.split("$findInAPI[")[r].split("]")[0]
    let fields = inside.split(";")



    let ung = 'api.'

    for (let i = 0; i < fields.length; i++) {
        if (i !== fields.length - 1) {
            ung = ung + fields[i] + '.'
        } else {
            ung = ung + fields[i]
        }
    }

    let result = eval(ung)

    code = code.replaceLast(`$findInAPI[${inside}]`, result)

    return {
        code: code
    }

}


module.exports = findInAPI;