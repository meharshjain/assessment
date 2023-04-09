var mongoose = require("mongoose");
var unallocatedTask = new mongoose.Schema({
  productType: String,
  issueType: Array,
  description: String,
  policy: Object,
  date:String,
  userid:String,
  user: Object,
});
module.exports = mongoose.model("unallocatedTask", unallocatedTask);
