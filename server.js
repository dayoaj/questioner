import http from "http";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
app.server = http.createServer(app);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" })
);

app.server.listen(process.env.PORT || 8080, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

module.exports = app;
