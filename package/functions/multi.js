const multi = (client, message, args, name, code) => {
  
  let r = code.split("$multi[").length - 1
  
  let inside = code.split("$multi[")[r].split("]")[0]
  
  let n = Number(inside.split(";")[0])
  
  inside.split(";").slice(1).map(e => n *= Number(e))
  
  code = code.replaceLast(`$multi[${inside}]`, n)
  
  return {
    code:code 
  } 
}

module.exports = multi