// Usage - $createFile[text;filename;extension;channelid]
// Example - $createFile[Here goes the note;Speshul_Notes;.txt;$channelID[]]
const {docs} = require("../functions/docs/docs.json");

const createFile = async (client, message, args, name, code) => {
  
  let discord = require("discord.js")
  
  let r = code.split("$createFile[").length - 1
  
  let inside = code.split("$createFile[")[r].split("]")[0]
  
  let fields = inside.split(";")
  
  if (!fields[0]) return message.channel.send(`No text has been given in first field of \`${inside}\`.\n${docs.action}/createfile`)
  
  let text = fields[0]
  
  let filename = fields[1]
  
  if (!fields[1]) filename = "text"
  
  let ext = fields[2]
  
  if (!fields[2]) ext = "txt"
  
  let channel = client.channels.cache.get(fields[3])
  
  if (!fields[3] || !channel) channel = client.channels.cache.get(message.channel.id)
  
  let buffer = new discord.MessageAttachment(Buffer.from(text), `${filename}.${ext}`)
  
  channel.send(buffer)

    code = code.replaceLast(`$createFile[${inside}]`, "")

    return {
        code: code
    }
}

module.exports = createFile;