const express = require("express");
const dotenv = require("dotenv");
const body = require("body-parser");
const http = require("https");
const axios = require('axios');


const app = express();

dotenv.config({ path: './config.env' })

let imageUrl;
//variables
const port = process.env.PORT
const apiKey = process.env.SECRETKEY
const url = process.env.URL

//appuse
app.use(express.static("public"))
app.use(body.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index")
})


app.post("/", (req, res) => {
  const prompts = req.body.prompt;
  console.log(prompts);
  const promptData = {
    prompt: prompts,
  };


  axios.post(url, promptData, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      const imageData = response.data.data[0].url;
      imageUrl = imageData
    res.render("image",{
      imageUrl:imageUrl
    })

    })
    .catch(error => {
      console.error('Error:', error.message);
    });

})


app.listen(port, (req, res) => {
  console.log(`server is running in the port ${port}`)
})