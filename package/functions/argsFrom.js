const argsFrom = (client, message, args, name, code, array) => {

    let r = code.split("$argsFrom[").length - 1

    let inside = code.split("$argsFrom[")[r].split("]")[0];
let [start, end, sep] = inside.split(";");

    let err = client.suppress.get(message.idd);
start --;
end ++;
const result = [];
for (var i = start; i < (end - 1); i++) {
result.push(args[i]);
}
    code = code.replaceLast(`$argsFrom[${inside}]`, result.join(sep));

    return {
        code: code
    }
}
module.exports = argsFrom;