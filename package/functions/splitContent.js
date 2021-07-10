const splitContent = (client, message, args, name, code) => {

    let r = code.split("$splitContent[").length - 1

    let inside = code.split("$splitContent[")[r].split("]")[0]

    let [text, amount, actual, splitter] = inside.split(";")

    if (!splitter) splitter = ";"

    if (!amount) amount = 5
    else amount = Number(amount)

    let x = 1

    let content = []

    let f = []

    text.split(actual).map((m, y) => {
        f.push(m)
        console.log(x)
        if (x === amount) content.push(f.join("\n")), x = 1, f = []
        else {
            x++
            if (y === text.split(actual).length) content.push(f.join("\n")), x = 1
        }
    })

    code = code.replaceLast(`$splitContent[${inside}]`, content.join(splitter))

    return {
        code: code
    }
}

module.exports = splitContent