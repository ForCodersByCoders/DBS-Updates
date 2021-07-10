const fs = require("fs");
const fetch = require("node-fetch")
const funcs = [];

fs.readdirSync(__dirname + "/functions/").filter(file => {
    funcs.push(file.split(".js")[0]);
});

const interpreter = async (client, message, args, name, code, ops) => {
    let functions = code.split("$");

    let array = []
    let vars = {}
    let passer;

    //---------------------------------------- A P I ------------------------------------------------------------------------------

    if (ops === "status") {
        passer = "status";
    } else if (ops && ops.link) {

        let data = { method: ops.method || "GET" }

        if (ops.body) {
            let test = await interpreter(client, message, args, name, ops.body)
            data.body = test
        }

        if (ops.headers) {
            data.headers = ops.headers;
        }


        try {
            let m = await fetch(ops.link, data)
            m = await m.json()
            passer = m;
        } catch (err) {

        }
    }



    //----------------------------------------------------------------------------------------

    client.options.messageCacheLifetime = 0;
    client.options.messageCacheMaxSize = 500;

    args = args.join(" ").split("[").join("a2008E").split("]").join("a2008A").split(";").join(":").split(" ")

    for (let x = functions.length - 1; x > 0; x--) {

        if (code === undefined) return

        let split = "$" + functions[x]

        let func = funcs.find(
            func => split.replace(split.split("$" + func)[1], "") === "$" + func
        )

        if (func) {


            let m = await require("../package/functions/" + func + ".js")(client, message, args, name, code, array, passer, vars);

            if (m) code = m.code;
            else code = undefined

            if (m && m.array) {
                array = m.array
            }
        }
    }

    let embed;

    if (message) embed = client.embeds.get(message.idd)

    if (embed && embed.color === undefined && embed.description === undefined && embed.title === undefined) client.embeds.set(message.idd, undefined), embed = undefined

    if (embed) {
        Object.entries(embed).map(x => {
            let name = x[0]
            if (name === "fields") return
            if (name === "footer") {
                if (embed[name] === "footer") {
                    if (embed[name]) embed.footer.text = embed.footer.text.split("a2008E").join("[").split("a2008A").join("]")
                }
            } else {
                if (typeof embed[name] !== "string") return
                if (embed[name]) embed[name] = embed[name].split("a2008E").join("[").split("a2008A").join("]")
            }
        })

        client.embeds.set(message.idd, embed)
    }

    if (code !== undefined) {

        code = code.split("\n")
            .filter(x => x !== '')
            .join("\n")


        code = code.split("a2008E").join("[").split("a2008A").join("]")

        return code;
    }
};

module.exports = interpreter;


String.prototype.replaceLast = function (what, replacement) {
    var pcs = this.split(what);
    var lastPc = pcs.pop();
    return pcs.join(what) + replacement + lastPc;
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
