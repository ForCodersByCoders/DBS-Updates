const db = require('quick.db')

const dbPing = async (client, message, args, name, code) => {

    let date = Date.now();
    await db.set("ricky", "gae");

    code = code.replaceLast("$dbPing", Date.now() - date)

    return {
        code: code
    }
}
module.exports = dbPing