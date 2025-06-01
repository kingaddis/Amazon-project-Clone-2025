const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Load .env variables (optional, if using dotenv locally)
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});



app.post("/payment/created", async (req, res) => {
  const total =parseInt(req.query.total);

  if (!total || total <= 0) {
    return res.status(400).json({ error: "Invalid total amount." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({ clientSecret:paymentIntent.client_secret, });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(403).json({ error: error.message });
  }
});

// Export the Express app as a Firebase Function
exports.api = onRequest(app);
