const embed = require("../../package/embed.js")
const execute = require("../../package/bot/executeCommand.js")

const blackListRoles = async (client, message, args, name, code) => {

    let r = code.split("$blackListRoles[").length - 1

    let inside = code.split("$blackListRoles[")[r].split(/]$/gm)[0]

    let fields = inside.split(";")

    let error = fields.pop()

    let roles = fields

    if (roles.some(r => message.member.roles.cache.some(role => role.id === r || role.name === r))) {
        if (error) {
            if (error.includes("{execute:")) {
                let m = await execute(client, message, args, error)
        
                error = m.error;
        
                if (!error) return undefined
              }
                    
              error = embed(error)
              
              message.channel.send(error.error, error.embed) 
        }

        return ""
    }

    await new Promise(resolve => setTimeout(resolve, 10))

    code = code.replaceLast(`$blackListRoles[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = blackListRoles;


// if (!cond) {
//     if (error) {

//       if (error.includes("{execute:")) {
//         let m = await execute(client, message, args, error)

//         error = m.error;

//         if (!error) return undefined
//       }
            
//       error = embed(error)
      
//       message.channel.send(error.error, error.embed) 
//     }
    
//     return ""
//   }