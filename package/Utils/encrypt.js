function encrypt(op){
  let buffer = Buffer.from(op)
  return buffer.toString('base64')
}
module.exports = encrypt
