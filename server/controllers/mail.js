import nodemailer from "nodemailer";
import observer from "./observer.js";
import User from "../models/userModel.js";

class Email extends observer {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "CaRnRBot@gmail.com",
        pass: "ucurrnxftivogidg",
      },
    });
  }

  async update(data) {
    const { cid, rid } = data;

    const user = await User.findById(rid);
    const umail = user.email;
    const mail = {
      from: "CaRnRBot@gmail.com",
      to: umail,
      subject: "Car Booking Confirmation",
      text: `Your booking for car ID ${cid} has been confirmed.`,
    };

    try {
      await this.transporter.sendMail(mail);
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export default Email;
