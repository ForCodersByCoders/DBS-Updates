const isCategory = async (client, message, args, name, code) => {

    let r = code.split("$isCategory[").length - 1

    let inside = code.split("$isCategory[")[r].split("]")[0]

    let category;

    try{
        category = await client.channels.fetch(inside)
        if(!category) result = false
        if(category.type == 'category') result = true
        if(category.type != 'category') result = false
    }catch{
      result = false
}
    
    code = code.replaceLast(`$isCategory[${inside}]`, result)

    return {
        code: code
    }
}

module.exports = isCategory;









