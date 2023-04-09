var mongoose = require("mongoose");
var allocatedTasks = new mongoose.Schema({
  productType: String,
  issueType: Array,
  description: String,
  policy: Object,
  userid: String,
  user: Object,
  allocatedto: String,
  date: String,
  status: { type: String, default: "open" },
});
module.exports = mongoose.model("allocatedTasks", allocatedTasks);
