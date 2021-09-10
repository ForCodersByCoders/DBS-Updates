const addreactions = async (client, message, msg) => {

    if (!client.addReactions.get(message.idd)) return;

    let reactions = client.addReactions.get(message.idd)

   reactions.forEach(async (m) => {
      await msg.react(m).catch(err => message.channel.send("Failed to react with "+ reaction))
   })
}

module.exports = addreactions;