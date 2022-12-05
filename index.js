import express from "express";
import bp from "body-parser";
import twilio from "twilio";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bp.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: "Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+923414640493",
  })
  .then((message) => console.log(message.sid))
  .done();

app.get("/", (req, res) => {
  res.send("Hey There!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
