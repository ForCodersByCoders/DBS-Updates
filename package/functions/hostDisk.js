const { docs } = require("discordbot-script/package/functions/docs/docs");

const hostDisk = async (client, message, args, name, code) => {
    let r = code.split("$hostDisk[").length - 1
    let option = code.split("$hostDisk[")[r].split("]")[0]
    let opt = option.toLowerCase();
    let result;

    let si;
    try {
        si = require('systeminformation');
    } catch { return message.channel.send(`:x: Please \`npm install systeminformation\` for this function to work! \n${docs.compacts}/hostdisk`) }

    if (!opt) return message.channel.send(`:x: Missing option in \`$hostDisk[${option}]\`.\n${docs.compacts}/hostdisk`)
    if (![// 21
        "available",
        "bytespersector",
        "cylindersperhead",
        "firmwareversion",
        "fstype",
        "isremovable",
        "name",
        "percentused",
        "physical",
        "sectorspertrack",
        "serialnumber",
        "size",
        "status",
        "storagetype",
        "totalcylinders",
        "totalheads",
        "totalsectors",
        "totaltracks",
        "trackspercylinder",
        "type",
        "used"
    ].includes(opt)) return message.channel.send(`:x: Invalid option in \`$hostDisk[${option}]\`.\n${docs.compacts}/hostdisk`)

    let disk = await si.diskLayout();
    let diskStorage = await si.fsSize();
    let diskStorageData = await si.blockDevices();

    switch (opt) {
        case "type": result = disk[0].type;
            break;
        case "name": result = disk[0].name;
            break;
        case "size": result = disk[0].size;
            break;
        case "bytespersector": result = disk[0].bytesPerSector;
            break;
        case "totalcylinders": result = disk[0].totalCylinders;
            break;
        case "totalheads": result = disk[0].totalHeads;
            break;
        case "totalsectors": result = disk[0].totalSectors;
            break;
        case "totaltracks": result = disk[0].totalTracks;
            break;
        case "trackspercylinder": result = disk[0].tracksPerCylinder;
            break;
        case "cylindersperhead": result = disk[0].totalCylinders / disk[0].totalHeads;
            break;
        case "sectorspertrack": result = disk[0].sectorsPerTrack;
            break;
        case "firmwareversion": result = disk[0].firmwareRevision;
            break;
        case "serialnumber": result = disk[0].serialNum;
            break;
        case "status": result = disk[0].smartStatus;
            break;
        case "storagetype": result = diskStorageData[0].type;
            break;
        case "fstype": result = diskStorageData[0].fsType;
            break;
        case "available": result = diskStorage[0].available;
            break;
        case "used": result = diskStorage[0].used;
            break;
        case "percentused": result = `${diskStorage[0].use}%`;
            break;
        case "physical": result = diskStorageData[0].physical;
            break;
        case "isremovable": result = diskStorageData[0].removable;



        default: "undefined"
    }

    code = code.replaceLast(`$hostDisk[${option}]`, result)

    return {
        code: code
    }
}
module.exports = hostDisk;