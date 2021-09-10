const interpret = require("discordbot-script/package/interpreter");
const { docs } = require("discordbot-script/package/functions/docs/docs");

const eval = async (client, message, args, name, code) => {
    const r = code.split("$eval").length - 1

    let inside = code.split("$eval[")[r].split("]")[0]

    let err = client.suppress.get(message.idd)
    if (!inside && err === undefined) return message.channel.send(`:x: Missing DB-Script code content to evaluate in \`$eval[${inside}]\`.\n${docs.action}/eval.\nPlease report any bugs to the developer in the Official Server\n${docs.discord}`)
    else if (!inside && err !== undefined) return message.channel.send(err).catch(err => { })

    const embedInCode = inside.includes("{title:", "{description:", "{author:", "{hyper:", "{field:", "{authoricon:", "{color:", "{attachment:", "{thumbnail:", "{image:", "{footer:", "{footericon:", "{execute:");

    const embedAndCode = inside.replace(/a2008E/gm, '[').replace(/a2008A/gm, ']').replace(/:/gm, ';').replace(/{title;/gm, '{title:').replace(/{description;/gm, '{description:').replace(/{author;/gm, '{author:').replace(/{hyper;/gm, '{hyper:').replace(/{field;/gm, '{field:').replace(/{authoricon;/gm, '{authoricon:').replace(/{color;/gm, '{color:').replace(/{attachment;/gm, '{attachment:').replace(/{thumbnail;/gm, '{thumbnail:').replace(/{image;/gm, '{image:').replace(/{footer;/gm, '{footer:').replace(/{footericon;/gm, '{footericon:').replace(/{execute;/gm, '{execute:')

    let res;
    if (!embedInCode) {
        res = await interpret(client, message, args, name, inside.replace(/a2008E/gm, '[').replace(/a2008A/gm, ']').replace(/:/gm, ';'));
    } else {
        res = await interpret(client, message, args, name, embedAndCode);
    }

    if (res === undefined) res = ""


    code = code.replaceLast(`$eval[${inside}]`, res);

    return {
        code: code
    }
}
module.exports = eval;