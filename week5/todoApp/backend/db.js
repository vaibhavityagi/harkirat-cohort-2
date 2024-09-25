const mongooose = require("mongoose");

mongooose
  .connect(
    "mongodb+srv://vaibhavi:md95U5gKnp3FNvdl@cluster0.0r7fzlf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => "successful connection")
  .catch((err) => console.log(err));

const todoSchema = new mongooose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongooose.model("Todo", todoSchema);

module.exports = {
  Todo,
};
