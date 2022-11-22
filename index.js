const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
// end of require
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Server Works !!! At port ${port}`);
});

// jsonwebtoken secret
const jwtSecret =
  "853fe7a9f32b722852f257533081953a1878c295242b48e506b4084782eda529";

//MongoDB setup
const uri =
  "mongodb+srv://admin:eYSROojCWMksH0l8@cluster0.nx7ynwz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const collection = client.db("task_internshala").collection("users");
// end of MongoDB
// apis:
app.get("/", (req, res) => {
  res.send("Developed by Sadnan");
});

app.post("/add-user", async (req, res) => {
  const { email, name, password } = req.body;
  const doc = { email: email, password: password, name: name };
  const result = await collection.insertOne(doc);
  res.send(result);
});

//
app.post("/check-user", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //
  const cursor = await collection.findOne({ email: email, password: password });

  if (cursor) {
    console.log(cursor);
    const token = jwt.sign(
      {
        email: cursor.email,
        id: cursor._id,
      },
      jwtSecret
    );
    return res.send({ name: cursor.name, token: token });
  } else {
    res.send({ name: false });
  }
});
