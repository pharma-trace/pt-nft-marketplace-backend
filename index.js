import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//bridge-between-routes-controllers
import { readdirSync } from "fs";

require("dotenv").config();

const app = express();

var whitelist = [
  "http://localhost:3000",
  "https://pt-nft-market-place-frontend-v1.vercel.app/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("PharmaTrace Database Connected"))
  .catch((err) => console.log(err));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static("public"));

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`PharmaTrace Server Connected at Port ${port}`)
);
