const attachmentLink = (client, message, args, name, code) => {

  let output = undefined;
  if(message.attachments.first()) output = message.attachments.first().url;



  code = code.replaceLast("$attachmentLink", output)

  return {
      code: code
  }
}
module.exports = attachmentLink