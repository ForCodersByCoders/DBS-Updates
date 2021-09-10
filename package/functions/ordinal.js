const ordinal = (client, message, args, name, code) => {

    let r = code.split("$ordinal[").length - 1

    let inside = code.split("$ordinal[")[r].split("]")[0];

let result = inside;
if (isNaN(inside)) result = "undefined";
else if (result.endsWith("11")) result = inside + "th";
else if (result.endsWith("12")) result = inside + "th";
else if (result.endsWith("13")) result = inside + "th";
else if (result.endsWith("1")) result = inside + "st";
else if (result.endsWith("2")) result = inside + "nd";
else if (result.endsWith("3")) result = inside + "rd";
else result = inside + "th";

    code = code.replaceLast(`$ordinal[${inside}]`, result);

    return {
        code: code
    }
}

module.exports = ordinal;