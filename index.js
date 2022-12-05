import express from "express";
import bp from "body-parser";
import twilio from "twilio";
import * as dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const app = express();
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: "Hello from Node",
    to: "+923414640493", // Text this number
    from: "+13854584239", // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.log(error));

process.exit(0);

app.use(bp.json());

app.get("/", (req, res) => {
  res.send("Yo Wasssup!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
