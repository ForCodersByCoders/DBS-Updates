const getBotInvite = async (client, message, args, name, code) => {

    const r = code.split("$getBotInvite").length - 1

    if (code.split("$getBotInvite")[r].startsWith("[")) {
        let inside = code.split("$getBotInvite[")[r].split("]")[0]
        let option = inside

    if(!['normal', 'admin', 'none'].includes(option))
        opt = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147483639&scope=bot`

        
    switch(option) {
        case 'normal':
            option = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147483639&scope=bot`
            break;
        case 'admin':
            option = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
            break;
        case 'none':
            option = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`
    }
      
        code = code.replaceLast(`$getBotInvite[${inside}]`, option)

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$getBotInvite", `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147483639&scope=bot`)
        
        return {
            code: code
        }
    }
}
module.exports = getBotInvite