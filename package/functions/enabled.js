const embed = require("../../package/embed.js")
const {docs} = require("../functions/docs/docs.json");
const execute = require("../../package/bot/executeCommand.js")

const enabled = async (client, message, args, name, code) => {
  if (code.split("$enabled[").length >= 3) return message.channel.send(`:x: Cant use more than one $enabled[].\n${docs.limiters}/enabled`)
  
  let inside = code.split("$enabled[")[1].split(/]$/gm)[0]

  let [condition, error] = inside.split(";");

  if (!error && condition.toLowerCase().trim() === "no") return;
  else (!error && condition.toLowerCase().trim() === "yes") 

  if (condition.toLowerCase().trim() === "no") {
    if (error.includes("{execute:")) {
        let m = await execute(client, message, args, error)

        error = m.error;

        if (!error) return undefined
      }
            
      error = embed(error)
      
      return message.channel.send(error.error, error.embed)
  }
  
  code = code.replaceLast(`$enabled[${inside}]`, "")

  return {
    code: code
  }
}
module.exports = enabled;