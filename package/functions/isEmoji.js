const isEmoji= async (client, message, args, name, code) => {

    const r = code.split("$isEmoji").length - 1

        let inside = code.split("$isEmoji[")[r].split("]")[0]

        let [text] = inside.split(";");

        let err = client.suppress.get(message.idd)
        let result;

        if (!text && err === undefined) result = false

        if (!/[a-zA-Z1234567890]/g.test(text) && /\p{Extended_Pictographic}/u.test(text) && text.length == 2) result = true;
        else result = false;

        code = code.replaceLast(`$isEmoji[${inside}]`, result)

        return {
            code: code
        }
    }
module.exports = isEmoji;