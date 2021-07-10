const divide = (client, message, args, name, code, channel) => {
 let r = code.split("$divide[").length - 1
  
  let inside = code.split("$divide[")[r].split("]")[0]
  
   let n = Number(inside.split(";")[0])
  
  inside.split(";").slice(1).map(e => n /= Number(e))
 
  code = code.replaceLast(`$divide[${inside}]`, n)
  
  return {
    code: code, 
  } 
}

module.exports = divide;