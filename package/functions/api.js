const {docs} = require("../functions/docs/docs.json");

const fetch = require("node-fetch")

const api = async (client, message, args, name, code, array, api) => {

 
let err = client.suppress.get(message.idd)

  if(api) {

  let r = code.split("$api[").length - 1

  let inside = code.split("$api[")[r].split("]")[0]
  let fields = inside.split(";")

  if(!fields && err === undefined) return message.channel.send(`:x: Invalid Property in \`$api[${inside}]\`.\n${docs.action}/api`);
 
let ung = ''

for(let i = 0;i < fields.length; i++) {
  if(i !== fields.length - 1) {
  ung = ung + fields[i] + '.'
  } else {
    ung = ung + fields[i]
  }
}



try {
let json = api; 
    

     function index(obj,i) {return obj[i]}
    let o = ung.split('.').reduce(index, json)


 code = code.replaceLast(`$api[${inside}]`, o)
} catch(err) {
  
}

   return {
        code: code
    }

  } else {

    let r = code.split("$api[").length - 1

  let inside = code.split("$api[")[r].split("]")[0]
  let fields = inside.split(";")

  let link = fields[0]
  if(!link && err === undefined) return message.channel.send(`:x: Invalid API link provided in 1st field of \`$api[${inside}]\`.\n${docs.action}/api`)
  if(!fields && err === undefined) return message.channel.send(`:x: Invalid Property in \`$api[${inside}]\`.\n${docs.action}/api`);
 
let ung = ''

for(let i = 1;i < fields.length; i++) {
  if(i !== fields.length - 1) {
  ung = ung + fields[i] + '.'
  } else {
    ung = ung + fields[i]
  }
}



try {
let json = await fetch(link)
json = await json.json()
    

     function index(obj,i) {return obj[i]}
    let o = ung.split('.').reduce(index, json)


 code = code.replaceLast(`$api[${inside}]`, o)
} catch(err) {
  if(err === undefined) return message.channel.send(err)
}

   return {
        code: code
    }
  }
}

module.exports = api;