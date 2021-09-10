const hasAttachment = (client, message, args, name, code) => {

  let output = false;
  if(message.attachments.first()) output = true;



  code = code.replaceLast("$hasAttachment", output)

  return {
      code: code
  }
}
module.exports = hasAttachment