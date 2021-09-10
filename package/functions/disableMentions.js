const {docs} = require("../functions/docs/docs.json");

const disableMentions = async (client, message, args, name, code) => {

  if (code.split("$disableMentions[").length >= 3) return message.channel.send(`:x: Cant use more than one $disableMentions.\n${docs.action}/disablementions`)

  let inside = code.split("$disableMentions[")[1].split("]")[0]
  
  let option;
  if (!inside) option = "all"
  else if(inside.toLowerCase() === "all" || inside.toLowerCase() === "everyone") option = inside.toLowerCase();
  else return message.channel.send(`:x: Invalid option provided in \`$disableMentions[${inside}]\``)

  client.options.disableMentions = option;
  code = code.replaceLast(`$disableMentions[${inside}]`, "")

  return {
    code: code
  }
}

module.exports = disableMentions;