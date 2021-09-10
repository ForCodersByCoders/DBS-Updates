const ms = require("ms")

const replyIn = async (client, message, args, name, code) => {

    let r = code.split("$replyIn[").length - 1

    let inside = code.split("$replyIn[")[r].split("]")[0]

    let time = inside

    if(isNaN(time)) time = ms(time)
    else time = Number(time)

    await new Promise(resolve => setTimeout(resolve, time))
    
    code = code.replaceLast(`$replyIn[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = replyIn