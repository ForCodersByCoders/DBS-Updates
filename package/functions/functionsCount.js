let path1 = './node_modules/discordbot-script/package/functions';
let path2 = '../../node_modules/discordbot-script/package/functions';

const functionsCount = (client, message, args, name, code) => {

    const fs = require('fs');
    F = 0;

    fs.readdirSync(path1).forEach(() => F++);
        if(F === undefined) F = fs.readdirSync(path2).forEach(() => F++);

    code = code.replaceLast(`$functionsCount`, F)
    
    return {
      code:code 
    } 
  }
  module.exports = functionsCount;