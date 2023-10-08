const express = require("express");
const connectDB = require("./config/db");
const port = 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/items", require("./item/itemRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
