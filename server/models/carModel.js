import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: {
    type: String,
  },

  model: {
    type: String,
  },

  year: {
    type: String,
  },

  odometer: {
    type: String,
  },
  transmission: {
    type: String,
  },
  fuelType: {
    type: String,
  },
  seatingCapacity: {
    type: String,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
  },
  dailyRate: {
    type: String,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
  photo: {
    type: String,
  },
  listerid: {
    type: String,
  },
  renterid: {
    type: String,
  },
  booked: {
    type: Boolean,
  },
});

const Car = mongoose.model("Car", carSchema);
export default Car;
