const db = require('quick.db')
const {docs} = require("../functions/docs/docs.json");

const getVar = async (client, message, args, name, code, ary, options) => {

  let r = code.split("$getVar[").length - 1

  let inside = code.split("$getVar[")[r].split("]")[0]

  let [variable, id] = inside.split(";")

  if (!id) id = "0"



  if (options !== "status") {
    let err = client.suppress.get(message.idd)

    if (client.vars[variable] === undefined && err === undefined) return message.channel.send(`❌ Variable \`${variable}\` not found in command name: ${name}!\n${docs.variables}/getvar`)
    else if (client.vars[variable] === undefined && err !== undefined) return message.channel.send(err).catch(err => { })
  }
  let item = await db.fetch(`${variable}_${id}`)

  if (item === null) {
    item = client.vars[variable]
    db.set(`${variable}_${id}`, client.vars[variable])
  }

  code = code.replaceLast(`$getVar[${inside}]`, item)

  return {
    code: code
  }
}

module.exports = getVar