const mongoose = require("mongoose");
const Mixed = require("mongoose/lib/schema/mixed");
const { Schema } = mongoose;

// to use as reference (userid)
// const User = require('./User');

const productSchema = new Schema({
  images: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },

  company: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  height: {
    type: String,
    require: true,
  },
  width: {
    type: String,
    require: true,
  },

  dummyPrice: {
    type: Number,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type:String,
    require: true
  }

});

module.exports = mongoose.model("Product", productSchema);
