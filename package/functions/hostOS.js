const { docs } = require("discordbot-script/package/functions/docs/docs");

const hostOS = async (client, message, args, name, code) => {
    let r = code.split("$hostOS[").length - 1
    let option = code.split("$hostOS[")[r].split("]")[0]
    let opt = option.toLowerCase();
    let result;

    let si;
    try {
        si = require('systeminformation');
    } catch { return message.channel.send(`:x: Please \`npm install systeminformation\` for this function to work! \n${docs.compacts}/hostos`) }

    if (!opt) return message.channel.send(`:x: Missing option in \`$hostOS[${inside}]\`.\n${docs.compacts}/hostos`)
    if (![// 6
        "arch",
        "build",
        "distro",
        "hostname",
        "kernel",
        "platform"
    ].includes(opt)) return message.channel.send(`:x: Invalid option in \`$hostOS[${inside}]\`.\n${docs.compacts}/hostos`)

    let os = await si.osInfo();

    switch (opt) {
        case "platform": result = os.platform;
            break;
        case "distro": result = os.distro;
            break;
        case "kernel": result = os.kernel;
            break;
        case "arch": result = os.arch;
            break;
        case "hostname": result = os.hostname;
            break;
        case "build": result = os.build;
            break;

        default: "undefined"
    }

    code = code.replaceLast(`$hostOS[${option}]`, result)

    return {
        code: code
    }
}
module.exports = hostOS;