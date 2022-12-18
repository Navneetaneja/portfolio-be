const express = require("express");
const PORT = 9045;
const app = express();
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_API_KEY);

let corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://navneet-aneja-dev.netlify.app",
    "https://navneet-aneja.netlify.app",
  ],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  return res.redirect("https://navneet-aneja.netlify.app");
});

const checkEmpty = (prop) => {
  return prop === null || prop === undefined || prop === "";
};

app.post("/send-email", function (req, res) {
  const data = req.body;
  if (
    checkEmpty(data?.name) ||
    checkEmpty(data?.email) ||
    checkEmpty(data?.message)
  ) {
    return res.sendStatus(404);
  }
  const msg = {
    to: "navneet.aneja.portfolio@gmail.com", // Change to your recipient
    from: "navneetaneja2001@hotmail.com", // Change to your verified sender
    subject: "Message From User In Portfolio",
    html: `<h3>Message : ${data?.message}</h3><br/><h3>Email: ${data?.email}</h3><br/><h3>Name: ${data?.name}</h3>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      //   console.log("Email sent");
      return res.sendStatus(200);
    })
    .catch((error) => {
      //   console.error(error);
      return res.sendStatus(500);
    });
});

app.get("/**", function (req, res) {
  return res.redirect("/");
});

app.listen(process.env.PORT || PORT, function (err) {
  if (err) {
    console.log("Error in starting server", err);
    return;
  }
  return console.log("server started", PORT);
});
