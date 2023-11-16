const { Schema, model} = require("mongoose");

const fileSchema = new Schema({
  // data: Buffer,
  data: String,
  type: String
})

module.exports = model("File", fileSchema)