//basic route dependencies
require("dotenv").config();
// require("express-async-errors");

const express = require("express");
const cors = require("cors");
const conncetDB = require("./utils/connectDB");
const indexroute = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(indexroute);
app.use(errorHandler);

const port = process.env.PORT || 3000;
conncetDB(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connceted");
    app.listen(port, () => {
      console.log(`server listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB error occured ", err);
  });
