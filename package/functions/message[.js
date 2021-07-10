const prefix = require('../main/script.js');
const { docs } = require("../functions/docs/docs.json");

const message = (client, message, args, name, code) => {

    let r = code.split("$message[").length - 1

    let inside = code.split("$message[")[r].split("]")[0]

    if (!inside) {
        code = code.replaceLast("$message[]", args.join(" "))
    } else {
        if ((isNaN(inside) || Number(inside) < 0) && inside.toLowerCase() !== "last") return message.channel.send(`❌ Invalid arg number or option in \`$message[${inside}]\`.\n${docs.data}/message`)


        let argz = message.content.trim().split(' ');
        firstArg = argz[0]

        let n = args[Number(inside) - 1] || ""
        if (Number(inside) === 0) { n = firstArg }
        else {
            if (inside.toLowerCase() === "last") n = argz.pop()
        }


        code = code.replaceLast(`$message[${inside}]`, n)
    }


    return {
        code: code
    }
}
module.exports = message;



/**
 *   Works with $message and $message[] and $message[number]
 *   But it breaks other function names with `message` in the name
 *
 */// vvvvvvvvvvvvvvvvvv


// const message = async (client, message, args, name, code) => {

//     if (code.split("$message")[1].startsWith("[")) {
//         let r = code.split("$message[").length - 1
//         let inside = code.split("$message[")[r].split("]")[0]

//           if (isNaN(inside) || Number(inside) < 0) return message.channel.send(`❌ Invalid arg number in \`$message[${inside}]\``)

//         let n = args[Number(inside) - 1] || ""
//             if(Number(inside) === 0) n = name

//         code = code.replaceLast(`$message[${inside}]`, n)

//         return {
//             code: code,
//         }
//     } else {
//         code = code.replaceLast("$message", args.join(" "))

//         return {
//             code: code
//         }
//     }
// }
// module.exports = message