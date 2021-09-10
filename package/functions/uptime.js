const uptime = (client, message, args, name, code) => {

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400)
    totalSeconds %= 86400
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)

    let result;

    if ((days) === 0 && (hours) === 0 && (minutes) === 0) {
        result = `${seconds} Seconds`
    } else if ((days) === 0 && (hours) === 0) {
        result = `${minutes} Minutes, ${seconds} Seconds`
    } else if (days === 0) {
        result = `${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`
    } else result = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`


    code = code.replaceLast("$uptime", result)

    return {
        code: code
    }
}
module.exports = uptime;