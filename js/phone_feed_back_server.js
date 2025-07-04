const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.brainykids.com.ua",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post("/send", async (req, res) => {
  const { phone } = req.body;

  const valid = /^\+?[0-9\s\-()]{9,15}$/.test(phone);
  if (!valid) return res.status(400).json({ message: "Некоректний номер телефону" });

  try {
    await transporter.sendMail({
      from: '"BrainyKids feedback form" <info@brainykids.com.ua>',
      to: "brainykids.vn@gmail.com, kidscenter.vn.office@gmail.com", 
      subject: "Заявка з сайту, Вам залишили номер телефону",
      text: `Користувач залишив номер телефону: ${phone}`
    });

    res.json({ message: "Номер телефону успішно відправлено!" });
  } catch (err) {
    console.error("Помилка надсилання:", err);
    res.status(500).json({ message: "Помилка сервера при надсиланні" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Сервер працює на http://localhost:${PORT}`));