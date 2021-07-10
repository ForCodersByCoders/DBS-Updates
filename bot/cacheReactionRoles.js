const db = require("quick.db")

const cacheReactions = async (client) => {

    let reactionRoles = await db.fetch(`reactionRoles_0`) || []

    reactionRoles.map(async info => {

        let guild = client.guilds.cache.get(info.guildID)

        if (!guild) return

        let channel = client.channels.cache.get(info.channelID)

        if (!channel) return;

        await channel.messages.fetch(info.messageID).catch(err => {})
    })
}

module.exports = cacheReactions;