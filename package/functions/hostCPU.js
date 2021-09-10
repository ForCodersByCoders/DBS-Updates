const { docs } = require("discordbot-script/package/functions/docs/docs");

const hostCPU = async (client, message, args, name, code) => {
    let r = code.split("$hostCPU[").length - 1
    let option = code.split("$hostCPU[")[r].split("]")[0]
    let opt = option.toLowerCase();
    let result;

    let si;
    try {
        si = require('systeminformation');
    } catch { return message.channel.send(`:x: Please \`npm install systeminformation\` for this function to work! \n${docs.compacts}/hostcpu`) }

    if (!opt) return message.channel.send(`:x: Missing option in \`$hostCPU[${option}]\`.\n${docs.compacts}/hostcpu`)
    if (![ // 16
        'avgload',
        'avgspeed',
        'brand',
        'cache',
        'cores',
        'currentload',
        'manufacturer',
        'maxspeed',
        'minspeed',
        'model',
        'physicalcores',
        'processors',
        'socket',
        'vendor',
        'virtualization',
        'voltage'
    ].includes(opt)) return message.channel.send(`:x: Invalid option in \`$hostCPU[${option}]\`.\n${docs.compacts}/hostcpu`)

    let host = await si.cpu();
    let hostTemp = await si.cpuTemperature();
    let hostSpeed = await si.cpuCurrentSpeed()
    let hostLoad = await si.currentLoad()

    switch (opt) {
        case "manufacturer": result = host.manufacturer;
            break;
        case "brand": result = host.brand;
            break;
        case "vendor": result = host.vendor;
            break;
        case "model": result = host.model;
            break;
        case "voltage": result = host.voltage;
            break;
        case "cores": result = host.cores;
            break;
        case "physicalcores": result = host.physicalCores;
            break;
        case "processors": result = host.processors;
            break;
        case "socket": result = host.socket;
            break;
        case "virtualization": result = host.virtualization;
            break;
        case "cache": result = si.cpu().then(data => 'l1d: ' + data.cache.l1d + '\n' + 'l1i: ' + data.cache.l1i + '\n' + 'l2: ' + data.cache.l2 + '\n' + 'l3: ' + data.cache.l3);
            break;
        case "avgspeed": result = `${hostSpeed.avg}GHz`;
            break;
        case "minspeed": result = `${hostSpeed.min}GHz`;
            break;
        case "maxspeed": result = `${hostSpeed.max}GHz`;
            break;
        case "avgload": result = `${hostLoad.avgLoad.toFixed(2)}%`;
            break;
        case "currentload": result = `${hostLoad.currentLoad.toFixed(2)}%`;
            break;

        default: "undefined"
    }

    code = code.replaceLast(`$hostCPU[${option}]`, await result)

    return {
        code: code
    }
}
module.exports = hostCPU;