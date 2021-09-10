const {docs} = require("../functions/docs/docs.json");

const channelCount = async (client, message, args, name, code) => {

    const r = code.split("$channelCount").length - 1

    if (code.split("$channelCount")[r].startsWith("[")) {

    let inside = code.split("$channelCount[")[r].split("]")[0]

    let [guildID = message.guild.id, option] = inside.split(";")
    
      guild = client.guilds.cache.get(guildID || message.guild.id)
    
      if(!guild) return message.channel.send(`:x: Invalid guild ID in 1st field of \`$channelCount[${inside}]\`.\n${docs.data}/channelcount`)
    
      if(!option) option = "total";
      if(![
          "voice",
          "text",
          "news",
          "category",
          "total"
      ].includes(option)) return message.channel.send(`:x: Invalid option in 2nd field of \`$channelCount[${inside}]\`.\n${docs.data}/channelcount`)
    
        switch (option) {
            case "voice": code = code.replaceLast(`$channelCount[${inside}]`, guild.channels.cache.filter(c => c.type == 'voice').size)
        break;
            case "text": code = code.replaceLast(`$channelCount[${inside}]`, guild.channels.cache.filter(c => c.type == 'text').size)
        break;
            case "news": code = code.replaceLast(`$channelCount[${inside}]`, guild.channels.cache.filter(c => c.type == 'news').size)
        break;
            case "category": code = code.replaceLast(`$channelCount[${inside}]`, guild.channels.cache.filter(c => c.type == 'category').size)
        break;
            case "total": code = code.replaceLast(`$channelCount[${inside}]`, guild.channels.cache.size)
        default: undefined
        break;
        }

        return {
            code: code,
        }
    } else {
        code = code.replaceLast("$channelCount",  message.guild.channels.cache.size)
        
        return {
            code: code
        }
    }
}
module.exports = channelCount





// const {DOCS} = require("../functions/docs/docs.json");

// const channelCount = async (client, message, args, name, code) => {

//  let r = code.split("$channelCount[").length - 1

//  let inside = code.split("$channelCount[")[r].split("]")[0]

//  let [guildID = message.guild.id, option = "total"] = inside.split(";")
 
//    guild = client.guilds.cache.get(guildID || message.guild.id)
 
//    if(!guild) return message.channel.send(`:x: Missing guild ID in 1st field of \`$channelCount[${inside}]\`.\n${DOCS}/channelcount`)
 
 
//    if(!option) return message.channel.send(`:x: Missing option in 2nd field of \`$channelCount[${inside}]\`.\n${DOCS}/channelcount`)
//    if(![
//        "voice",
//        "text",
//        "news",
//        "category",
//        "total"
//    ].includes(option)) return message.channel.send(`:x: Invalid option in 2nd field of \`$channelCount[${inside}]\`.\n${DOCS}/channelcount`)
 
//      switch (option) {
//          case "voice": code = code.replaceLast(`$channelCount[${inside}]`, guild.channels.cache.filter(c => c.type == 'voice').size || "undefined")
//      break;
//          case "text": code = code.replaceLast(`$channelCount[${inside}]`, guild.channels.cache.filter(c => c.type == 'text').size || "undefined")
//      break;
//          case "news": code = code.replaceLast(`$channelCount[${inside}]`,guild.channels.cache.filter(c => c.type == 'news').size || "undefined")
//      break;
//          case "category": code = code.replaceLast(`$channelCount[${inside}]`,guild.channels.cache.filter(c => c.type == 'category').size || "undefined")
//      break;
//          case "total": code = code.replaceLast(`$channelCount[${inside}]`,guild.channels.cache.filter(c => c.type != 'category').size || "undefined")
//      default: undefined
//      break;
//      }

//     return {
//         code: code
//     }
// }

// module.exports = channelCount;



