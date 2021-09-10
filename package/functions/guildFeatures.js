const {docs} = require("discordbot-script/package/functions/docs/docs");

const guildFeatures = async (client, message, args, name, code) => {

    const r = code.split("$guildFeatures").length - 1

    if (code.split("$guildFeatures")[r].startsWith("[")) {

        let inside = code.split("$guildFeatures[")[r].split("]")[0]
        let id = (inside ? inside : message.guild.id)
        let guild = client.guilds.cache.get(id)
        let err = client.suppress.get(message.idd)
    
        if (!guild && err === undefined) return message.channel.send(`:x: Invalid guild ID in \`$guildFeatures[${inside}]\`.\n${docs.data}/guildfeatures`)
        else if (!guild && err !== undefined) return message.channel.send(err).catch(err => {})

try {
    result = guild.features.join()
} catch {
    result = undefined
}
        code = code.replaceLast(`$guildFeatures[${inside}]`, result)

        return {
            code: code,
        }
    } else {
        try {
            result = message.guild.features.join(", ")
        } catch {
            result = undefined
        }
        code = code.replaceLast("$guildFeatures", result)
        
        return {
            code: code
        }
    }
}
module.exports = guildFeatures;

/*
ANIMATED_ICON
BANNER
COMMERCE
COMMUNITY
DISCOVERABLE
FEATURABLE
INVITE_SPLASH
MEMBER_VERIFICATION_GATE
NEWS
PARTNERED
PREVIEW_ENABLED
RELAY_ENABLED
VANITY_URL
VERIFIED
VIP_REGIONS
WELCOME_SCREEN_ENABLED
*/