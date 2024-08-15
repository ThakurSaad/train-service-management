const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const trainSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },

    stops: [
      {
        _id: {
          type: ObjectId,
          unique: true,
          auto: true,
        },
        station: { type: String, required: true, trim: true },
        distanceFromCenter: {
          type: Number,
          required: true,
        },
        arrivalTime: {
          type: String,
          required: true,
          trim: true,
          set: function (value) {
            return value.replace(/^\s+|\s+$/g, ""); // removing all spaces to ensure "HH:mm" format
          },
        },
        departureTime: {
          type: String,
          required: true,
          trim: true,
          set: function (value) {
            return value.replace(/^\s+|\s+$/g, "");
          },
          validate: {
            validator: function (value) {
              return value > this.arrivalTime;
            },
            message: "Departure time must be after arrival time",
          },
        },
      },
    ],

    status: {
      type: String,
      enum: ["Scheduled", "In Transit", "Arrived", "Delayed"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
