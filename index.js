const express = require("express");
const mongoose = require("mongoose");
const Shorten = require("./models/shorten.model");
const bodyParser = require("body-parser");
const shortId = require("shortid");
const { URL } = require("url");
const { error } = require("console");

const app = express();
const port = 3000;

app.use(express.json()); // to be able to read the data in json

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from Node Api Sever updated");
});

// post originalurl and shortenedurl
app.post("/api/shorten", async (req, res) => {
  const { name, originalUrl } = await Shorten.create(req.body);
  try {
    const randonurl = shortId.generate();
    const urlSubmit = new Shorten({
      name,
      originalUrl,
      shortenedUrl: randonurl,
    });
    await urlSubmit.save();
    res.json({
      status: true,
      shortenedUrl: `${randonurl}`,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
});

// get all users urls
app.get("/api/shortened", async (req, res) => {
  try {
    const shortened = await Shorten.find({});
    res.status(200).json(shortened);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  const { shortUrlId } = req.params;
  const originalUrl = Shorten[shortUrlId];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

// Redirect from short URL to original URL
app.get("/:shortUrlId", async (req, res) => {
  try {
    const { shortUrlId } = req.params;
    const shortenedUrl = `http://localhost:${port}/${shortUrlId}`;

    const shorten = await Shorten.findOne({ shortenedUrl });
    if (shorten) {
      res.redirect(shorten.originalUrl);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Database connection (Mongo)
mongoose
  .connect(
    "mongodb+srv://dennismureti:G1oVE7B29KlO5Cl8@cluster0.8bkiw3k.mongodb.net/shorten?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
