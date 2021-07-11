const { docs } = require("../functions/docs/docs.json");

const abbreviate = async (client, message, args, name, code) => {

    const r = code.split("$abbreviate[").length - 1
    let inside = code.split("$abbreviate[")[r].split("]")[0]
    let numb = inside;

    if (!numb) return message.channel.send(`:x: no message provided in 2nd field of \`$abbreviate[${inside}]\`.\n${docs.action}/abbreviate`);
    if (isNaN(numb)) return message.channel.send(`:x: Invalid number in \`$abbreviate[${inside}]\`.\n${docs.action}/abbreviate`);

    const formatCash = n => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(1) + "T";
        if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(1) + "Qa";
        if (n >= 1e18 && n < 1e21) return +(n / 1e18).toFixed(1) + "Qi";
        if (n >= 1e21 && n < 1e24) return +(n / 1e21).toFixed(1) + "Sx";
        if (n >= 1e24 && n < 1e27) return +(n / 1e24).toFixed(1) + "Sp"
        if (n >= 1e27 && n < 1e30) return +(n / 1e27).toFixed(1) + "Oc"
        if (n >= 1e30 && n < 1e33) return +(n / 1e30).toFixed(1) + "No"
        if (n >= 1e33 && n < 1e36) return +(n / 1e33).toFixed(1) + "Dc";
        if (n >= 1e36 && n < 1e39) return +(n / 1e36).toFixed(1) + "Ud";
        if (n >= 1e39) return +(n / 1e39).toFixed(1) + "Dd";
    };

    return {
        code: code.replaceLast(`$abbreviate[${inside}]`, formatCash(numb))
    }
}

module.exports = abbreviate;