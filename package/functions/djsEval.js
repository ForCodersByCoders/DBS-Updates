const fs = require("fs");
const util = require('util');
const ms = require('parse-ms');
const moment = require("moment");
const {docs} = require("../functions/docs/docs.json");
const db = require("quick.db");

const djsEval = async (client, message, args, name, code) => {

    const { channel, author, member, guild, id, mentions, array } = message

    let r = code.split("$djsEval[").length - 1
    
    let inside = code.split("$djsEval[")[r].split("]")[0]

    // let [codee, depth] = inside.split(";")

    if(!inside) return message.channel.send(`:x: Missing Discord.js code in \`$djsEval[${inside}]\`.\n${docs.action}/djseval`)

    try {
        c = eval(inside.replace(/a2008E/gm, "[").replace(/a2008A/gm,"]").replace(/;/gm,":").replace(/:/gm,";"))
     } catch(err) {
        return message.channel.send(err.message)
     }

//  if(!depth) depth = 0
//  if(isNaN(Number(depth))) return message.channel.send(`:x: Invalid depth number in 2nd field of \`$djsEval[${inside}]\``)
//  depth = Number(depth)
//  if(depth < 0) depth = 0
depth = 0

let ev = util.inspect(c, {
"depth": depth
})

     code = code.replaceLast(`$djsEval[${inside}]`, ev)
 
     return {
         code: code
     }
 }
 
 module.exports = djsEval