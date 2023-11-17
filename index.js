const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require('path');

const upload = require("./endpoints/upload")

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iklogmm.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

const app = express()
app.use(express.json())
app.use(cors())
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3003

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

app.get('/edit/:id', (req, res) => {
  const filePath = path.join(__dirname, 'edit.html');
  res.sendFile(filePath);
});

app.use("/upload", upload)

mongoose.connect(uri)
.then(() => {
  app.listen(process.env.PORT || PORT, () => {
    console.log("Server started")
    console.log(`Server located at http://localhost:${PORT}`)
  })
})
.catch(e => console.log(e))

