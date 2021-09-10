const commandDescription = async (client, message, args, name, code) => {

    const r = code.split("$commandDescription").length - 1

    if (code.split("$commandDescription")[r].startsWith("[")) {

        let inside = code.split("$commandDescription[")[r].split("]")[0]
        let err = client.suppress.get(message.idd)

        let desc;
        if(!client.commands.get(inside)) desc = client.commands.get(name).description;
        else if(!client.commands.get(inside).description) desc = "None";
        else if(!inside && err === undefined) desc = "undefined";
        else desc = client.commands.get(inside).description;

        code = code.replaceLast(`$commandDescription[${inside}]`, desc)

        return {
            code: code,
        }
    } else {
 
        let description;
        if(!client.commands.get(name).description) description = "None";
        else description = client.commands.get(name).description;

        // let description = (!client.commands.get(name)) ? undefined : client.commands.get(name).description;

        code = code.replaceLast("$commandDescription", description)
        
        return {
            code: code
        }
    }
}
module.exports = commandDescription;

// notes... shh


// let desc = (!client.commands.get(inside)) ? undefined : client.commands.get(inside).description;

        // let description;
        // if (!client.commands.get(name)) description = "undefined";
        // else description = client.commands.get(name).description;

        ////  ------  /////

        // let desc;
        // if (!client.commands.get(inside)) desc = "undefined";
        // else desc = client.commands.get(inside).description;