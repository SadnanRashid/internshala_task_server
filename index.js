const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
// end of require
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Server Works !!! At port ${port}`);
});

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
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  res.send(result);
});

//
app.post("/check-user", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //
  const cursor = await collection.findOne({ email: email, password: password });
  //   const findResult = await collection.find({
  //     email: email,
  //     password: password,
  //   });
  //
  if (cursor) {
    res.send(cursor);
  } else {
    res.send({ name: false });
  }
});
