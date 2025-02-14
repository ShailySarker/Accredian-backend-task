require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// 📝 Save referral data & send email
app.post("/referral", async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;
    const newReferral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail },
    });
    console.log(newReferral);
    res.status(201).json(newReferral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔄 Get all referrals
app.get("/referrals", async (req, res) => {
  const referrals = await prisma.referral.findMany();
  console.log(referrals);

  res.json(referrals);
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
