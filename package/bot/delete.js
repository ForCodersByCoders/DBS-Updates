const deleteIn = (client, message, msg) => {



    let time = client.deleteIn.get(message.idd)


    if (!time) return

    else {
        msg.delete({timeout: time})

        client.editIn.delete(message.idd)
    }
}

module.exports = deleteIn;