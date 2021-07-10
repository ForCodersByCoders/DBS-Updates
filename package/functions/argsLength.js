const argsLength = async (client, message, args, name, code) => {

    const r = code.split("$argsLength").length - 1

    if (code.split("$argsLength")[r].startsWith("[")) {

        let inside = code.split("$argsLength[")[r].split("]")[0]

        let content = inside.split(" ");
            content = content.length;
        if(!inside) content = args.length
      
        code = code.replaceLast(`$argsLength[${inside}]`, content)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$argsLength", args.length)
        
        return {
            code: code
        }
    }
}
module.exports = argsLength;