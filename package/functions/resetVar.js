const db = require("quick.db")

const resetVar = async (client, message, args, name, code) => {

    let r= code.split("$resetVar[").length - 1

    let variable = code.split("$resetVar[")[r].split("]")[0]

    let items = await db.all()

    let array = []

    for(var i = 0; i < items.length; i++) {
      if(items[i].ID.startsWith(`${variable}_`)) {
        array.push(items[i])
      }
    }

    items = array;

    items = items.filter(e => client.users.cache.get(e.ID.split("_")[1]))

    for (let i = 0;i < items.length;i++) {
        db.set(`${variable}_${items[i].ID.split("_")[1]}`, client.vars[variable])
    }

    code = code.replaceLast(`$resetVar[${variable}]`, "")

    return {
        code: code
    }
}

module.exports = resetVar