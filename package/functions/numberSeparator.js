const {docs} = require("discordbot-script/package/functions/docs/docs");

const numberSeparator = async (client, message, args, name, code) => {

  let r = code.split("$numberSeparator[").length - 1

  let inside = code.split("$numberSeparator[")[r].split("]")[0]

  let [number, separator] = inside.split(";")

  const N = Number(number)

  if (!N && N !== 0) return message.channel.send(`:x: Invalid number in \`$numberSeparator[${inside}]\`.\n${docs.data}/numberseparator`)

        result = !separator ? N.toLocaleString() : N.toLocaleString().split(",").join(separator)

  code = code.replaceLast(`$numberSeparator[${inside}]`, result)

  return {
    code: code
  }
}

// function commafy(num, pattern) {
//   var str = num.toString().split('.');
//   if (str[0].length >= 4) {
//     str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, `$1${pattern}`);
//   }
//   if (str[1] && str[1].length >= 4) {
//     str[1] = str[1].replace(/(\d{3})/g, '$1 ');
//   }
//   return str.join('.');
// }


module.exports = numberSeparator;