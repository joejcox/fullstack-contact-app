const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// IMPORT MODELS
require("./models/Product");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`
);

app.get("/", (req, res) => {
  res.send("Yo waddup!");
});

app.use(bodyParser.json());

//IMPORT ROUTES
require("./routes/productRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
