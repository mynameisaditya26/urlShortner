const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const Url = require("../models/Url");

// Home Page
router.get("/", async (req, res) => {
  const urls = await Url.find();
  res.render("index", { urls });
});

// Create Short URL
router.post("/shorten", async (req, res) => {
  const fullUrl = req.body.fullUrl;
  const shortUrl = shortid.generate();

  await Url.create({ full: fullUrl, short: shortUrl });
  res.redirect("/");
});

// Redirect to Original URL
router.get("/:shortId", async (req, res) => {
  const url = await Url.findOne({ short: req.params.shortId });
  if (!url) return res.sendStatus(404);

  url.clicks++;
  await url.save();

  res.redirect(url.full);
});

module.exports = router;