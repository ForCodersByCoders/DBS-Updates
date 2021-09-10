const { docs } = require("discordbot-script/package/functions/docs/docs");

const hostRAM = async (client, message, args, name, code) => {
    let r = code.split("$hostRAM[").length - 1
    let option = code.split("$hostRAM[")[r].split("]")[0]
    let opt = option.toLowerCase();
    let result;

    let si;
    try {
        si = require('systeminformation');
    } catch { return message.channel.send(`:x: Please \`npm install systeminformation\` for this function to work!\n${docs.compacts}/hostram`) }

    if (!opt) return message.channel.send(`:x: Missing option in \`$hostRAM[${option}]\`.\n${docs.compacts}/hostram`)
    if (![ // 10
        'clockspeed',
        'free',
        'freeswap',
        'manufacturer',
        'total',
        'totalswap',
        'used',
        'usedswap',
        'voltmax',
        'voltmin',
    ].includes(opt)) return message.channel.send(`:x: Invalid option in \`$hostRAM[${option}]\`.\n${docs.compacts}/hostram`)

    let ram = await si.mem()
    let ramData = await si.memLayout()

    switch (opt) {
        case "total": result = ram.total;
            break;
        case "free": result = ram.free
            break;
        case "used": result = ram.used
            break;
        case "totalswap": result = ram.swaptotal;
            break;
        case "usedswap": result = ram.swapused;
            break;
        case "freeswap": result = ram.swapfree;
            break;
        case "clockspeed": result = `${ramData[0].clockSpeed}MHz`;
            break;
        case "manufacturer": result = ramData[0].manufacturer;
            break;
        case "voltmin": result = ramData[0].voltageMin;
            break;
        case "voltmax": result = ramData[0].voltageMax;
            break;

        default: "undefined"
    }

    code = code.replaceLast(`$hostRAM[${option}]`, await result)

    return {
        code: code
    }
}
module.exports = hostRAM;