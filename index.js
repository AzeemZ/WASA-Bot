import express from "express";
import bp from "body-parser";
import twilio from "twilio";
import session from "express-session";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(
  session({
    secret: "anything-you-want-but-keep-secret",
    saveUninitialized: false,
  })
);

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

// client.conversations.v1.conversations
//   .create({ uniqueName: "test convo" })
//   .then((conversation) => console.log(conversation.sid))
//   .catch((err) => console.log(err));

// client.conversations.v1
//   .conversations("CHd292994751bb4a9a9a5579f1717e2b55")
//   .fetch()
//   .then((conversation) => console.log(conversation));

// client.conversations.v1
//   .conversations("CH6f79d6760a60477dacbb1088f97373c3")
//   .fetch()
//   .then((conversation) => console.log(conversation.friendlyName));

app.post("/sms", (req, res) => {
  const smsCount = req.session.counter || 0;

  let message = "Hello, thanks for the new message.";

  if (smsCount > 0) {
    message = "Hello, thanks for message number " + (smsCount + 1);
  }

  req.session.counter = smsCount + 1;

  const twiml = new MessagingResponse();
  twiml.message(message);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());

  //   const twiml = new MessagingResponse();

  //   // Access the message body and the number it was sent from.
  //   // console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
  //   const mediaURL = "https://demo.twilio.com/owl.png";

  //   twiml.message(
  //     `Hi👋 *${req.body.ProfileName}*,

  // Welcome to WASA WhatsApp Self Service
  // For the desired service, reply with the option number.

  //   1️⃣ Duplicate Bill
  //   2️⃣ Go Green! Subscribe for E-Bill
  //   3️⃣ Technical Complaints
  //   4️⃣ Billing Complaints
  //   5️⃣ Tubewell Schedule of Your Area
  //   6️⃣ New Connections
  //   7️⃣ Bill Payment
  //   8️⃣ Language Selection
  //   9️⃣ Find Us
  //   `
  //   );
  //   // .media(mediaURL);

  //   res.set("Content-Type", "text/xml");
  //   res.status(200).send(twiml.toString());
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
