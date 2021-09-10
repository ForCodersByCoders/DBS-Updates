const isValidHex = (client, message, args, name, code) => {

    let r = code.split("$isValidHex[").length - 1

    let n = code.split("$isValidHex[")[r].split("]")[0]

    code = code.replaceLast(`$isValidHex[${n}]`, isHex(n.replace("#", "")))

    return {
        code: code
    }
}

   function isHex(h) {
var a = parseInt(h,16);
return (a.toString(16) ===h.toLowerCase())
}

module.exports = isValidHex;