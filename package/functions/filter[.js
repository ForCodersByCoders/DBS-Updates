const filter = (client, message, args, name, code) => {
  
    const r = code.split("$filter[").length - 1
    const inside = code.split("$filter[")[r].split("]")[0]

    let [ msg, chars ] = inside.split(";")

    for (const letter of chars.split("")) {
        msg = msg.split(letter).join("")
    }
    code = code.replaceLast(`$filter[${inside}]`, msg)

    return {
        code: code
    }
}
module.exports = filter