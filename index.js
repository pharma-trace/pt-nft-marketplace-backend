import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//bridge-between-routes-controllers
import { readdirSync } from "fs";

require("dotenv").config();

const app = express();

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("PharmaTrace Database Connected"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(express.static('public'));
    
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () =>
    console.log(`PharmaTrace Server Connected at Port ${port}`)
);