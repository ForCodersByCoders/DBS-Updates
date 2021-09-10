const {docs} = require("../functions/docs/docs.json");

 const cmd = async (client, message, args, name, code) => {

    const r = code.split("$cmd").length - 1

    if (code.split("$cmd")[r].startsWith("[")) {

        let inside = code.split("$cmd[")[r].split("]")[0]
 
        let [command, option] = inside.split(";")
        let err = client.suppress.get(message.idd)
        
        let result;
        let COMMAND;
       try {
       COMMAND = await client.commands.get(command || name)
       if (!COMMAND && (option === "exists")) result = false;
    } catch {
        
    }
    
     if(!option) return message.channel.send(`:x: Missing option in 2nd field of \`$cmd[${inside}]\`.\n${docs.compacts}/cmd`)
        if(![
            "name",
            "aliases",
            "description",
            "error",
            "exists",
            "status",
            "usage"
        ].includes(option.toLowerCase())) return message.channel.send(`:x: Invalid option in 2nd field of \`$cmd[${inside}]\`.\n${docs.compacts}/cmd`)
    
        switch(option) {
            case "name": 
            if (!COMMAND && err === undefined) result = undefined;
                else result = COMMAND.name;
        break;
            case "aliases": 
            if (!COMMAND && err === undefined) result = undefined;
                else result = COMMAND.aliases;
        break;
            case "description" : 
            if (!COMMAND && err === undefined) result = undefined;
                else result = COMMAND.description;
        break;
            case "error": 
            if (!COMMAND && err === undefined) result = undefined;
                else result = COMMAND.error;
        break;
            case "exists": 
            if(COMMAND) result = true;
                else result = false;
        break;
            case "status": 
            if (!COMMAND && err === undefined) result = undefined;
                else result = COMMAND.status;
        break;
            case "usage": 
            if (!COMMAND && err === undefined) result = undefined;
                else result = COMMAND.usage;
    
            default: undefined;
        break;
            };
       
         code = code.replaceLast(`$cmd[${inside}]`, result)
     
         return {
             code: code
         }
    } else {

        code = code.replaceLast("$cmd", client.commands.get(name).name)
        
        return {
            code: code
        }
    }
}
module.exports = cmd;