import express from "express";
import bp from "body-parser";
import twilio from "twilio";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bp.urlencoded({ extended: false }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const MessagingResponse = twilio.twiml.MessagingResponse;

// client.messages
//   .create({
//     body: "Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/",
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+923414640493",
//   })
//   .then((message) => console.log(message.sid))
//   .done();

app.get("/", (req, res) => {
  res.send("Sample Endpoint!");
});

app.post("/sms", (req, res) => {
  // client.conversations.v1.conversations
  //   .create({ friendlyName: "Friendly Conversation" })
  //   .then((conversation) => console.log(conversation.sid));

  client.conversations.v1
    .conversations("CH278301a8734a4411bbc1dc5b10628038")
    .fetch()
    .then((conversation) => console.log(conversation.friendlyName));

  const twiml = new MessagingResponse();

  // Access the message body and the number it was sent from.
  // console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
  const mediaURL = "https://demo.twilio.com/owl.png";

  twiml.message(
    `Hi👋 *${req.body.ProfileName}*,

Welcome to WASA WhatsApp Self Service
For the desired service, reply with the option number.

  1️⃣ Duplicate Bill
  2️⃣ Go Green! Subscribe for E-Bill
  3️⃣ Technical Complaints
  4️⃣ Billing Complaints
  5️⃣ Tubewell Schedule of Your Area
  6️⃣ New Connections
  7️⃣ Bill Payment
  8️⃣ Language Selection
  9️⃣ Find Us
  `
  );
  // .media(mediaURL);

  res.set("Content-Type", "text/xml");
  res.status(200).send(twiml.toString());
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
