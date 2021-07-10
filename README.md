# discordbot-script

![Discord](https://img.shields.io/discord/743438202005618747?label=DB-Script%20Official%20Server&logo=discord&logoColor=white)  [![NPM Downloads](https://img.shields.io/npm/dt/discordbot-script.svg?maxAge=3600)](https://www.npmjs.com/package/discordbot-script)
____

```js
$ npm install discordbot-script
```
This package allows you to make Discord bots with ease. We have a similar language structure as the well known mobile app, "Bot Designer for Discord".
If you are not familiar with the app, you can still use this package because its very simple to understand.

```js

const Dlang = require('discordbot-script')
const bot = new Dlang({
  token: "TOKEN_HERE",
  prefix: ["?", "!"]
})

bot.MessageEvent()
 
bot.Command({
  name: "ping",
  code: `
$ping ms
  `
})
```



### EVENTS
You can use events very easily! Events are for allowing the bot to respond when a particular action has taken place. For example, when someone joins the server, there is an event for it, below is an example.

```js
bot.JoinedCommand({
name: "channelID or variable",
code: `
Something here like, <@$authorID> thanks for joining the server!
`
})
bot.onJoined()


bot.UserUpdateCommand({
name: "channelID or variable",
code: `
{tag} Updated thier username!
Old - {oldname}
New - {newname}
`
})
bot.onUserUpdate()
```


### FUNCTIONS
DiscordBot-Script functions are an essential key to perform tasks and execute commands, lets take a look at the simple example given below:

```js
bot.Command({
  name: "clear",
  code: `
Cleared $message[1] messages
$clear[$message[1]]
  `
})
```


### COMMAND HANDLER
The command handler is an extremely useful tool to allow you to store commands in organized folders and files instead of all in your main file. This chunk of code is stored in your main file.

NOTE: The commented content are options to log in the console upon bot start-up. There's already a default command log in this handler, edit as you wish. The commented content can be left there in your code as a note or be taken out.

```js
const fs = require('fs');
const folders = fs.readdirSync("./commands/")

for (const files of folders) {
    const folder = fs.readdirSync(`./commands/${files}/`).filter(file => file.endsWith(".js"))

    for (const commands of folder) {
        const command = require(`./commands/${files}/${commands}`)
        bot.Command(command);
        console.log(`Loaded: ${command.name} [${command.status}]`);
    }
    // ${folder} = File name with extension
    // ${folders} = All Folder names
    // ${command.name} = The loaded command name
    // ${command.aliases} = All the aliases of the loaded command. Returns 'undefined' if no aliases are found
    // ${command.status} = The status of the command. Returns 'undefined' if there's no status defined in the command header of the loaded command
}
```


### EVENT HANDLER
The Event Handler will reduce thousands of lines in the main file by allowing events and other bot functions that would normally have to be in the main file, can be in their own files with this Handler being in the main file.

NOTE: Please visit the Official DB-Script [Documentation](https://docs.db-script.xyz/guides/event-handler) on Gitbook for more information on how to use the Event Handler.

```js
const events = fs.readdirSync("./events/");
for (const Files of events) {
    const eventFile = fs.readdirSync(`./events/${Files}/`).filter(file => file.endsWith(".js"))
    for (const event of eventFile) {
        const obj = require(`./events/${Files}/${event}`);
        if (typeof(obj) != "object") {
        console.log("invalid module.exports data ...shutting down");
        process.exit();
}
        const eventName = Object.keys(obj);
        const eventData = Object.values(obj)[0];
        if (typeof(eventData) != "object") {
            if (typeof(eventData) != "number") {
                console.log("invalid event data ...shutting down");
                process.exit();
             }
        }
        bot[eventName](eventData);
        if(bot.vars){
            bot.Variables(eventData);
        } if(bot.awaitedCommands){
            bot.AwaitedCommand(eventData);
        }

        console.log(`Loaded Event: ${event}`);
    }
}
```


### CODE INTERPRETATION
All discordbot-script command codes are seen, read and executed by the bot from *bottom to top*

____





### [Official DB-Script Documentation](https://docs.db-script.xyz/)