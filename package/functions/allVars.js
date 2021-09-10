require('quick.db')

const allVars = async (client, message, args, name, code) => {

    const r = code.split("$allVars").length - 1

    if (code.split("$allVars")[r].startsWith("[")) {

        let inside = code.split("$allVars[")[r].split("]")[0]

        const vars = client.vars;
        let res = [];


        if (inside.toLowerCase() === 'names') {
            Object.keys(vars).forEach(variable => {
                res.push(variable)
            })
        } else if (inside.toLowerCase() === 'values') {
            Object.keys(vars).forEach(variable => {
                res.push(vars[variable])
            })
        } else if (inside.toLowerCase() === 'both') {
            Object.keys(vars).forEach(variable => {
                res.push(`${variable}: ${vars[variable]}`)
            })
        } else if (!inside || !inside.includes('names', 'values', 'both')) {
            Object.keys(vars).forEach(variable => {
                res.push(`${variable}: ${vars[variable]}`)
            })
        } else {
            Object.keys(vars).forEach(variable => {
                res.push(`${variable}: ${vars[variable]}`)
            })
        }


        code = code.replaceLast(`$allVars[${inside}]`, res.join("\n"));

        return {
            code: code,
        }
    } else {

        const vars = client.vars;
        let res = [];

        Object.keys(vars).forEach(variable => {
            res.push(`${variable}: ${vars[variable]}`)
        })

        code = code.replaceLast("$allVars", res.join("\n"))

        return {
            code: code
        }
    }
}
module.exports = allVars;