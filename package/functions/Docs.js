let { documents } = require("./docs/DocsAPI.json");
const { docs } = require("../functions/docs/docs.json");

const Docs = async (client, message, args, name, code) => {

    const r = code.split("$Docs[").length - 1

    let inside = code.split("$Docs[")[r].split("]")[0]

    let [func, data] = inside.split(";");
    let final;

    let doc = documents[func]

    switch (func) {
        case (func):
            if (!Object.keys(documents).includes(func) && (data != "functioncount") && (data != "link")) { final = "invalidFunction" }
            else
                switch (data) {
                    case "name": final = doc.name
                        break;
                    case "description": final = doc.description
                        break;
                    case "url": final = doc.url
                        break;
                    case "usage": final = doc.usage
                        break;
                    case "type": final = doc.type
                        break;
                    case "property": final = doc.property
                        break;
                    case "link": final = documents.link
                        break;
                    case "functioncount": final = Object.keys(documents).length - 1
                        break;
                    case "alias": final = doc.alias.join(", ")
                        break;
                    case "placeholders": final = doc.placeholders
                }
    }

    if (!func && (data != "functioncount") && (data != "link")) { final = "missingFunction" }

    if (![
        "name",
        "url",
        "description",
        "usage",
        "type",
        "property",
        "link",
        "functioncount",
        "alias",
        "placeholders"
    ].includes(data)) { final = "invalidProperty" }
    if (!data) { final = "missingProperty" }

    code = code.replaceLast(`$Docs[${inside}]`, final)

    return {
        code: code
    }
}
module.exports = Docs;