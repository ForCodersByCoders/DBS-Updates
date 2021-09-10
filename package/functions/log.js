const log = (client, message, args, name, code) => {
    
    const r = code.split("$log[").length - 1
    
    let inside = code.split("$log[")[r].split("]")[0]
    
    let [content, option] = inside.split(";")
    
    let result;
    if(option && option === ("return" || "send")) result = content
    if(result === undefined) result = ""
    
    console.log(content)
    
    return {
        code: code.replaceLast(`$log[${inside}]`, result)
    }
}
module.exports = log;