const {execSync} = require("child_process")
const { error } = require("console")
const {docs} = require("../functions/docs/docs.json");

const exec = async (client, message, args, name, code) => {

    let r = code.split("$exec[").length - 1
    
    let inside = code.split("$exec[")[r].split("]")[0]
    
    let exe = await execSync(inside)
    
    if(!inside) return message.channel.send(`:x: Missing console command in \`$exec[${inside}]\`.\n${docs.action}/exec`)
    
    try {exe} catch(err) {
        return message.channel.send(err.message)
     }

     code = code.replaceLast(`$exec[${inside}]`, exe)
 
     return {
         code: code
     }
 }
 
 module.exports = exec