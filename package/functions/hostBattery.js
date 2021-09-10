const { docs } = require("discordbot-script/package/functions/docs/docs");

const hostBattery = async (client, message, args, name, code) => {
    let r = code.split("$hostBattery[").length - 1
    let option = code.split("$hostBattery[")[r].split("]")[0]
    let opt = option;
    let result;

    let si;
    try {
        si = require('systeminformation');
    } catch { return message.channel.send(`:x: Please \`npm install systeminformation\` for this function to work!\n${docs.compacts}/hostbattery`) }

    if (!opt) return message.channel.send(`:x: Missing option in \`$hostBattery[${option}]\`.\n${docs.compacts}/hostbattery`)
    if (![ //14
        "capacityunit",
        "current",
        "cyclecount",
        "designedmax",
        "hasbattery",
        "ischarging",
        "ispluggedin",
        "manufacturer",
        "max",
        "model",
        "percent",
        "timeremaining",
        "type",
        "voltage"
    ].includes(opt)) return message.channel.send(`:x: Invalid option in \`$hostBattery[${option}]\`.\n${docs.compacts}/hostbattery`)

    let batt = await si.battery()

    switch (opt) {
        case "hasbattery": result = batt.hasBattery;
            break;
        case "cyclecount": result = batt.cycleCount;
            break;
        case "ischarging": result = batt.isCharging;
            break;
        case "designedmax": result = batt.designedCapacity + `mW`;
            break;
        case "max": result = batt.maxCapacity + `mW`;
            break;
        case "current": result = batt.currentCapacity + `mW`;
            break;
        case "capacityunit": result = batt.capacityUnit;
            break;
        case "voltage": result = batt.voltage;
            break;
        case "percent": result = batt.percent + '%';
            break;
        case "timeremaining": result = batt.timeRemaining;
            if (result === null) {
                result = 'undefined'
            }
            break;
        case "ispluggedin": result = batt.acConnected;
            break;
        case "type": result = batt.type;
            break;
        case "model": result = batt.model;
            break;
        case "manufacturer": result = batt.manufacturer;
            break;

        default: "undefined";

    }

    code = code.replaceLast(`$hostBattery[${option}]`, result)

    return {
        code: code
    }
}
module.exports = hostBattery;