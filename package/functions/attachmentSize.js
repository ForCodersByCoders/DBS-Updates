  const attachmentSize = async (client, message, args, name, code) => {

    const r = code.split("$attachmentSize").length - 1

    if (code.split("$attachmentSize")[r].startsWith("[")) {

        let inside = code.split("$attachmentSize[")[r].split("]")[0]

        let output = undefined;
        if(message.attachments.first()) output = message.attachments.first().size;

    switch (inside) {
        case "b":
            output = message.attachments.first().size;
            break;
        case "kb":
            output = output / 1000
            break;
        case "mb":
            output = output / 1000000
        default: undefined
    }
        code = code.replaceLast(`$attachmentSize[${inside}]`, output)

        return {
            code: code,
        }
    } else {
        output = undefined
        if(message.attachments.first()) output = message.attachments.first().size;

        code = code.replaceLast("$attachmentSize", output)
        
        return {
            code: code
        }
    }
}
module.exports = attachmentSize;























// const attachmentSize = async (client, message, args, name, code) => {

//     const r = code.split("$attachmentSize").length - 1

//     if (code.split("$attachmentSize")[r].startsWith("[")) {

//         let inside = code.split("$attachmentSize[")[r].split("]")[0]

//         let output = undefined;


//     switch (inside) {
//         case "bytes":
//             try {
//                 if(message.attachments.first()) output = message.attachments.first().size;
//             } catch {
//                 output = undefined
//             }
//             break;
//         case "kb":
//             try {
//                 if(output > 1000) output = output / 1000
//                 else output = message.attachments.first().size
//             } catch {
//                 output = undefined
//             }
//             break;
//         case "mb":
//             try {
//                 if(output > 1000000) output = output / 1000000
//                 else if(output < 1000000)
//                 if(output > 1000) output = message.attachments.first().size / 1000
//                 else message.attachments.first().size
//             } catch {
//                 output = undefined
//             }
//         default: undefined
//     }
//         code = code.replaceLast(`$attachmentSize[${inside}]`, output)

//         return {
//             code: code,
//         }
//     } else {
//         output = undefined
//         if(message.attachments.first()) output = message.attachments.first().size;

//         code = code.replaceLast("$attachmentSize", output)
        
//         return {
//             code: code
//         }
//     }
// }
// module.exports = attachmentSize;