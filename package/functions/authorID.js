const authorID = (client, message, args, name, code) => {
  
  code = code.replaceLast("$authorID", message.author.id) 
    
  return {
    code: code,
  } 
}

module.exports = authorID;