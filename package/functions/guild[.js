const moment = require("moment")
const ms = require('parse-ms')
const {docs} = require("../functions/docs/docs.json");

const guild = async (client, message, args, name, code) => {

    let r = code.split("$guild[").length - 1
    
    let inside = code.split("$guild[")[r].split("]")[0]
 
    let [id, option] = inside.split(";")
    
    let s = (client.guilds.cache.get(id ? id : message.guild.id))

    let err = client.suppress.get(message.idd)

    if (!s && (option.toLowerCase() != "isbotremoved")) option = undefined

 if(!option) return message.channel.send(`:x: Missing option in 2nd field of \`$guild[${inside}]\`.\n${docs.compacts}/guild`)

 if(![ // 28 options
    "name",
    "id",
    "afkchannelid",
    "afktimeout",
    "isavailable",
    "isbotremoved",
    "isverified",
    "ispartnered",
    "description",
    "created",
    "region",
    "membercount",
    "boostcount",
    "boostlevel",
    "updateschannel",
    "ruleschannel",
    "systemchannelid",
    "verificationlvl",
    "timestamp",
    "acronym",
    "emojicount",
    "mfalevel",
    "contentfilter",
    "count",
    "features",
    "icon",
    "vanityurl",
    "vanityuses"
].includes(option.toLowerCase())) return message.channel.send(`:x: Invalid option in 2nd field of \`$guild[${inside}]\`.\n${docs.compacts}/guild`)

switch(option) {
    case "name": option = s.name;
        break;
    case "isavailable": option = s.available;
        break;
    case "isbotremoved": 
        try {
            option = s.deleted;
            if(option === null) option = undefined
        } catch {
            option = undefined
        }
        break;
    case "isverified" : option = s.verified;
        break;
    case "ispartnered": option = s.partnered;
        break;
    case "id": option = s.id;
        break;
    case "afkchannelid": 
        try {
            option = s.afkChannelID;
            if(option === null) option = undefined
        } catch {
            option = undefined
        }
        break;
    case "afktimeout": 
        try {
            option = s.afkTimeout;
            if(option === null) option = undefined
        } catch {
            option = undefined
        }
        break;
    case "created": option = moment(s.createdAt).format("LLLL");
        break;
    case "timestamp":
        option = Object.entries(ms(Date.now() - s.createdTimestamp)).map((x,y)=> {
            if (x[1] > 0 && y < 4) return `${x[1]} ${x[0]}`
        }).filter(x => x).join(", ")
        if(!option) option = undefined
        break;
    case "description": 
        try {
            option = s.description;
            if(option === null) option = undefined
        } catch {
            option = undefined
        }
        break;
    case "region": option = s.region;
        break;
    case "membercount": option = s.memberCount;
        break;
    case "boostcount": option = s.premiumSubscriptionCount;
        break;
    case "boostlevel": option = s.premiumTier;
        break;
    case "updateschannel": 
        try {
            option = s.publicUpdatesChannel;
            if(option === null) option = undefined
        } catch {
            option = undefined
        }
        break;
    case "ruleschannel": 
        try {
            option = s.rulesChannelID;
            if(option === null) option = undefined
        } catch {
            option = undefined
        }
        break;
    case "systemchannelid": 
        try {
            option = s.systemChannelID;
            if(option === null) option = undefined
        } catch {
            option = undefined
        }
        break;
    case "verificationlvl": option = s.verificationLevel;
        break;
    case "acronym": option = s.nameAcronym;
        break;
    case "emojicount": option = s.emojis.cache.size;
        break;
    case "contentfilter": option = s.explicitContentFilter;
        break;
    case "count": option = client.guilds.cache.size;
        break;
    case "features": option = s.features.join();
        break;
    case "icon": option = s.iconURL({dynamic: true, size: 512});
        break;
    case "vanityurl":
        try {
            let vanity = await s.fetchVanityData();
              option = "https://discord.gg/" + vanity.code;
            } catch {
              option = "undefined";
            };
    case "vanityuses":
        try {
            let vanity = await s.fetchVanityData();
              option = vanity.uses
            } catch {
              option = "undefined";
            }
        break;

    default: undefined
    };
    
     code = code.replaceLast(`$guild[${inside}]`, option)
 
     return {
         code: code
     }
 }
 
 module.exports = guild;