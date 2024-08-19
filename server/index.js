require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAI } = require("openai");

const app = express();
const { OPENAI_API_KEY } = process.env;
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

app.use(bodyParser.json());
app.use(cors());

app.listen(3005, () => {
  console.log("server started");
});

app.post("/create", async (req, res) => {
    const { prompt } = req.body;
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });      
      res.send(response.data[0].url);
    } catch (err) {
      res.send(err.message);
    }
  });
  

module.exports = app;
