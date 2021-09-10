// const db = require('quick.db')

// const serverLeaderboard = async (client, message, args, name, code) => {
  
//   let r = code.split("$serverLeaderboard[").length - 1
  
//   let inside = code.split("$serverLeaderboard[")[r].split("]")[0]
  
//   let [variable, op, custom] = inside.split(";")
  
//   if (!custom) custom = "{top} - {name} - {value}"
  
//  let items = await db.all();


//   let array = []

//     for(var i = 0; i < items.length; i++) {
//       if(items[i].ID.startsWith(`${variable}_`)) {
//         array.push(items[i])
//       }
//     }

//     items = array;
  
//   if (op !== "desc") op = "asc"
  
//   let content = []
  
//   let top = 1
  
//   items = items.filter(i => i.ID.split("_")[2] === undefined)

//   items = items.sort((x, y) => Number(y.data) - Number(x.data))
  
//   await new Promise(resolve => setTimeout(resolve, 1500))
  
//   for (let i = 0;i < (items.length >= 10 ? 10 : items.length);i++) {
    
//     let guild = client.guilds.cache.get(items[i].ID.split("_")[1])
    
//     if (guild) {
      
//       let m = custom.replace("{top}", top).replace("{value}", items[i].data).replace("{name}", guild.name).replace("{id}", guild.id)
      
//       content.push(m) 
      
//       top++
//     } 
//   }
  
  
//   code = code.replaceLast(`$serverLeaderboard[${inside}]`, content.join("\n"))
  
//   return {
//     code:code 
//   } 
// }

// module.exports = serverLeaderboard 




const db = require('quick.db')

const guildLeaderboard = async (client, message, args, name, code) => {
  
  let r = code.split("$guildLeaderboard[").length - 1
  
  let inside = code.split("$guildLeaderboard[")[r].split("]")[0]
  
  let [variable, op, custom] = inside.split(";")
  
  if (!custom) custom = "{top} - {name} - {value}"
  
 let items = await db.all();


  let array = []

    for(var i = 0; i < items.length; i++) {
      if(items[i].ID.startsWith(`${variable}_`)) {
        array.push(items[i])
      }
    }

    items = array;
  
  if (op !== "desc") op = "asc"
  
  let content = []
  
  let top = 1
  
  items = items.filter(i => i.ID.split("_")[2] === undefined)

  items = items.sort((x, y) => Number(y.data.split('"').join("")) - Number(x.data.split('"').join("")))
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  for (let i = 0;i < (items.length >= 10 ? 10 : items.length);i++) {
    
    let guild = client.guilds.cache.get(items[i].ID.split("_")[1])
    
    if (guild) {
      
      let m = custom.replace("{top}", top).replace("{value}", items[i].data).replace("{name}", guild.name).replace("{id}", guild.id)
      
      content.push(m) 
      
      top++
    } 
  }
  
  
  code = code.replaceLast(`$guildLeaderboard[${inside}]`, content.join("\n"))
  
  return {
    code:code 
  } 
}

module.exports = guildLeaderboard;