const randomText = async (client, message, args, name, code) => {

    if (!code.includes("$randomText[")) return { code: code}
  
    let r = code.split("$randomText[").length - 1

    let inside = code.split("$randomText[")[r].split("]")[0]

    let texts = inside.split(";")

    let t = texts[Math.floor(Math.random() * texts.length)]

    code = code.split(`$randomText[${inside}]`).join(t)
    
    return {
        code: code
    }

}

module.exports = randomText;