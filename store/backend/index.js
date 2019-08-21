const express = require("express");
const app = express();
const cors = require("cors");
const keys = require("./config/keys");
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const url = keys.mongoURI;
let isLoggedIn = undefined;
let db = undefined;
let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["fghdjlport"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  db = client.db("online-store");
});
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.collection("users")
    .findOne({ username: username })
    .then(user => {
      if (!user) {
        res.json({ success: false });
      }
      if (password !== user.password) {
        res.json({ success: false });
        return;
      }
      req.session.user_id = user._id;
      res.json({ success: true });
      isLoggedIn = req.session.user_id;
    });
});

app.post("/signup", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  db.collection("users")
    .findOne({ username: username })
    .then(user => {
      if (user) {
        res.json({ success: false });
        return;
      }
      db.collection("users").insertOne(
        {
          username: username,
          password: password
        },

        (err, result) => {
          if (err) throw err;
          res.json({ success: true });
        }
      );
      db.collection("users")
        .findOne({
          username: username
        })
        .then(user => {
          req.session.user_id = user._id;
          isLoggedIn = req.session.user_id;
        });
    });
});

app.get("/products", (req, res) => {
  db.collection("products")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send({ products: result });
    });
});

app.get("/products/:id", (req, res) => {
  let ObjectID = mongo.ObjectID;
  db.collection("products")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then(product => res.json(product))
    .catch(err => res.json({ none: "Not found" }));
});

app.post("/post-review/:id", (req, res) => {
  let itemId = req.body.itemId;
  let newReview = req.body.review;
  let username = req.body.username;
  db.collection("reviews").insertOne(
    { itemId: itemId, user: username, review: newReview },
    (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});
app.get("/reviews/:id", (req, res) => {
  db.collection("reviews")
    .find({ itemId: req.params.id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send({ reviews: result });
    });
});
app.get("/cart", (req, res) => {
  db.collection("cart")
    .find({ user: isLoggedIn })
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

app.post("/add-to-cart/:id", (req, res) => {
  let ObjectID = mongo.ObjectID;

  db.collection("products")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then(item =>
      db.collection("cart").insertOne(
        {
          user: isLoggedIn,
          itemId: req.params.id,
          name: item.name
        },
        (err, result) => {
          if (err) throw err;
          res.json({ success: true });
        }
      )
    );
});

app.delete("/remove-cart/:id", (req, res) => {
  let ObjectID = mongo.ObjectID;
  db.collection("cart")
    .deleteOne({ user: new ObjectID(isLoggedIn), itemId: req.params.id })
    .then(res.json({ success: true }))
    .catch(err => res.json({ none: "Not found" }));
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.send(JSON.stringify({ success: true }));
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
