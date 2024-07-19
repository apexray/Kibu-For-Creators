const express = require("express");
const path = require("path");
const app = express();
const hbs = require("express-handlebars");

app.use(express.json());

//setup static file
app.use(express.static(path.join(__dirname, "public")));

//setup views engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: path.join(__dirname, "views"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

//routes
app.get("/", (req, res) => {
  res.render('main')
});

app.listen(3000, () =>
  console.log(`server is lisend on port http://localhost:3000`)
);
