const express = require("express");
const port = 5000;
const db = require("./config/db");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect Database
db.connectDB();

// Router
routes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
