const allCategoriesCount = (client, message, args, name, code) => {

    code = code.replaceLast(`$allCategoriesCount`, client.channels.cache.filter(ch => ch.type === "category").size)

    return {
        code: code
    }
}

module.exports = allCategoriesCount;