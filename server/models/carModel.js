import mongoose from "mongoose";
import Email from "../controllers/mail.js";
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: {
    type: String,
  },

  model: {
    type: String,
  },

  year: {
    type: Number,
  },

  odometer: {
    type: Number,
  },
  transmission: {
    type: String,
  },
  fuelType: {
    type: String,
  },
  seatingCapacity: {
    type: Number,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
  },
  dailyRate: {
    type: Number,
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

class CarModel {
  static observers = [];

  static addObserver(observer) {
    this.observers.push(observer);
  }

  static removeObserver(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  static notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }

  static async bookcar(cid, rid) {
    const cars = await Car.findById(cid);

    if (!cars) {
      throw Error("Not Found");
    }
    cars.booked = true;
    cars.renterid = rid;
    await Car.replaceOne({ _id: cid }, cars);

    this.notifyObservers({ cid, rid });
  }
}

const email = new Email();
CarModel.addObserver(email);

export { Car, CarModel };
