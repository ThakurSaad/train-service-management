// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const validator = require("validator");
// const { ObjectId } = mongoose.Schema.Types;

// const trainSchema = new Schema({
//   name: { type: String, required: true, unique: true },
//   stops: [
//     {
//       station: { type: ObjectId, ref: "Station", required: true },
//       arrivalTime: { type: Date, required: true },
//       departureTime: { type: Date, required: true },
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// const Train = mongoose.model("Train", trainSchema);

// module.exports = Train;
