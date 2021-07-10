const isValidInvite = async (client, message, args, name, code) => {

    const r = code.split("$isValidInvite[").length - 1

    const inside = code.split("$isValidInvite[")[r].split("]")[0]
    
    const url = inside.includes("https://") ? inside : inside.includes("discord.gg/") ? `https://${inside}` : `https://discord.gg/${inside}`
    
    const invite = await client.fetchInvite(url).catch(err => {})
    
    return {
        code: code.replaceLast(`$isValidInvite[${inside}]`, invite ? true : false)
    }
}

module.exports = isValidInvite