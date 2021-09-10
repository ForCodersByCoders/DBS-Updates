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
  let passchecker;

  //---------------------------------------- A P I ------------------------------------------------------------------------------

  if (ops === "status") {
    passchecker = "status";
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
      passchecker = m;
    } catch (err) {

    }
  }



  //----------------------------------------------------------------------------------------


  args = args.join(" ").split("[").join("a2008E").split("]").join("a2008A").split(";").join(":").split(" ")
  if (code.toLowerCase().includes('$if[')) {
		for (let statecheck of code.split(/\$if\[/gi).slice(1).reverse()) {
			const r = code.toLowerCase().split("$if[").length - 1
       //check if code endswith endif
			if (!code.toLowerCase().includes("$endif")){
        message.channel.send(`\`$endif\` is missing`);
        return;
      }
      //split it into parts
			let allsplit = code.split(/\$if\[/gi)[r].split(/\$endif/gi)[0]
			statecheck = code.split(/\$if\[/gi)[r].split(/\$endif/gi)[0]
      // end
      //check the condition
			let conditioncheck = statecheck.split("\n")[0].trim()
			conditioncheck = conditioncheck.slice(0, conditioncheck.length - 1)
			const passcheck = (await interpreter(client, message, args, name,`$checkCondition[${conditioncheck}]`,ops)) === "true"
      let elseifs = {}
      let elseifaction = statecheck.toLowerCase().includes('$elseif')
			if (elseifaction) {
				for (const data of statecheck.split(/\$elseif\[/gi).slice(1)) {
					if (!data.toLowerCase().includes('$endelseif')) return message.channel.send(`\`$endelseif\` is missing!`)
					const inside = data.split(/\$endelseIf/gi)[0]
					let cond = inside.split("\n")[0].trim()
					cond = cond.slice(0, cond.length - 1)
					const secondcode = inside.split("\n").slice(1).join("\n")
					elseifs[cond] = secondcode
					function escapeRegExp(string) {
						return string.replace(/[.*+?^${}()|[\]\\\n]/g, '\\$&')
					}
					statecheck = statecheck.replace(new RegExp(`\\$elseif\\[${escapeRegExp(inside)}\\$endelseif`, 'mi'), "")
				}
			}
			const elseaction = statecheck.toLowerCase().includes('$else')
			const ifCode = elseaction ? statecheck.split("\n").slice(1).join("\n").split(/\$else/gi)[0] : statecheck.split("\n").slice(1).join("\n").split(/\$endif/gi)[0]
			const elseCode = elseaction ? statecheck.split(/\$else/gi)[1].split(/\$endif/gi)[0] : ""
			let passcheckes = false
			let oldcode
			if (elseifaction) {
				for (const data of Object.entries(elseifs)) {
					if (!passcheckes) {
						const CHECK =(await interpreter(client, message, args, name,`$checkCondition[${data[0]}]`,ops)) === "true"

						if (CHECK) {
							passcheckes = true
							oldcode = data[1]
						}
					}
				}
			}
      //remove endifs
			code = code.replace(/\$if\[/gi, '$if[').replace(/\$endif/gi, '$endif')
			code = code.replaceLast(`$if[${allsplit}$endif`, passcheck ? ifCode : passcheckes ? oldcode : elseCode)
		}
	}

  for (let x = functions.length - 1; x > 0; x--) {

    if (code === undefined) return

    let split = "$" + functions[x]

    let func = funcs.find(
      func => split.replace(split.split("$" + func)[1], "") === "$" + func
    )

    if (func) {


      let m = await require("../package/functions/" + func + ".js")(client, message, args, name, code, array, passchecker, vars);

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


String.prototype.replaceLast = function(what, replacement) {
  var pcs = this.split(what);
  var lastPc = pcs.pop();
  return pcs.join(what) + replacement + lastPc;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}