const db = require("quick.db")

const resetMessageVar = async (client, message, args, name, code) => {

    let r= code.split("$resetMessageVar[").length - 1

    let variable = code.split("$resetMessageVar[")[r].split("]")[0]

    let items = await db.all()

    let array = []

    for(var i = 0; i < items.length; i++) {
      if(items[i].ID.startsWith(`${variable}_${message.guild.id}_`)) {
        array.push(items[i])
      }
    }

    items = array;
    
    for (let i = 0;i < items.length;i++) {
        db.set(`${variable}_${message.guild.id}_${items[i].ID.split("_")[2]}`, client.vars[variable])
    }

    code = code.replaceLast(`$resetMessageVar[${variable}]`, "")

    return {
        code: code
    }
}

module.exports = resetMessageVar