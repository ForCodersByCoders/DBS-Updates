const db = require('quick.db')

const userLeaderboard = async (client, message, args, name, code) => {

    let r = code.split("$userLeaderboard[").length - 1

    let inside = code.split("$userLeaderboard[")[r].split("]")[0]

    let [variable, op, custom] = inside.split(";")

    if (!custom) custom = "{top} - {username} - {value}"

    let items = await db.all();


    let array = []

    for (var i = 0; i < items.length; i++) {
        if (items[i].ID.startsWith(`${variable}_${message.guild.id}_`)) {
            array.push(items[i])
        }
    }

    items = array;

    if (op !== "desc") op = "asc"

    let content = []

    let top = 1

    items = items.sort((x, y) => Number(y.data.split('"').join("")) - Number(x.data.split('"').join("")))

    await new Promise(resolve => setTimeout(resolve, 1500))

    for (let i = 0; i < (items.length >= 10 ? 10 : items.length); i++) {

        let user = client.users.cache.get(items[i].ID.split("_")[2])

        if (user) {

            let m = custom.replace("{top}", top).replace("{value}", items[i].data).replace("{username}", user.username).replace("{id}", user.id).replace("{tag}", user.tag)

            content.push(m)

            top++
        }
    }


    code = code.replaceLast(`$userLeaderboard[${inside}]`, content.join("\n"))

    return {
        code: code
    }
}

module.exports = userLeaderboard;