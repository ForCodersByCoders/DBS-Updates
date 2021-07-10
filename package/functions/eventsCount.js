const eventsCount = (client, message, args, name, code) => {

    const fs = require('fs');
    events = 0;

    fs.readdirSync('./node_modules/discordbot-script/package/events').forEach(() => events++);
    if (events === undefined) events = fs.readdirSync('../../node_modules/discordbot-script/package/events').forEach(() => events++);

    code = code.replaceLast(`$eventsCount`, events)

    return {
        code: code
    }
}
module.exports = eventsCount;