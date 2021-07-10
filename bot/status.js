// const interpret = require('../../package/interpreter.js')

// const Status = async (client, ops, time) => {

//   if (isNaN(time) || time < 9000) return console.error(`API limitation reached: Status change cannot be faster than 9 seconds / 9000`)

//   let y = 0,
//       arr = Object.entries(ops)

//   setInterval(async () => {
//     if (y >= arr.length) y = 0

//     let code = await interpret(client, undefined, [], undefined, arr[y][1].description, "status")

//     if (!client.readyAt) return;

//     if (code) { 
//       client.user.setActivity(code, { type: arr[y][1].type }) 
//     } 
//     y++
//   }, time) 
// }

// module.exports = Status;

const chalk = require('chalk');

const interpret = require('../../package/interpreter.js')

const Status = async (client, ops, time) => {

    if (isNaN(time) || time < 9000) return console.error(chalk.redBright('API limitation reached:'), `Status change cannot be faster than 9 seconds / 9000`)

    let y = 0,
        arr = Object.entries(ops)

    setInterval(async () => {
        if (y >= arr.length) y = 0

        let code = await interpret(client, undefined, [], undefined, arr[y][1].description, "status")

        if (!client.readyAt) return;
        if (!code) return;
        if (arr[y][1].type === "STREAMING") {
            client.user.setPresence({
                activity: {
                    name: code,
                    type: arr[y][1].type, url: arr[y][1].url
                }
            })
        } else {
            client.user.setPresence({
                activity: {
                    name: code,
                    type: arr[y][1].type
                }, status: arr[y][1].status
            })
        }
        y++
    }, time)
}

module.exports = Status;