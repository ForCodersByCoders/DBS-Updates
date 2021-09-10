const packageVersion = (client, message, args, name, code) => {
  
    code = code.replaceLast(`$packageVersion`, require("../../package.json").version)
    
    return {
      code:code 
    } 
  }
  module.exports = packageVersion 