import express from "express";
import { MongoClient } from "mongodb";

const cors = require("cors");

async function start() {
  // const url = `mongodb+srv://priyanshu18032003:Priyanshu6535@cluster0.rn98rof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const uri = "mongodb+srv://prajapatipriyanshu077:IgiPztYBO19p2tLV@cluster0.y6k5l.mongodb.net/?appName=Cluster0";
  const Mongoclient = new MongoClient(uri);

  await Mongoclient.connect();
  const db = Mongoclient.db("FullStack-Database");
  console.log("Connected to the FullStack-Database");

  const app = express();
  app.use(express.json());

  // OR configure specific origins
  app.use(
    cors({
      origin: "full-stack-project-seven.vercel.app", // Frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.get("/api/product", async (req, res) => {
    const products = await db.collection("adminProducts").find({}).toArray();
    res.send(products);
  });

  app.post('/api/deleteadminProducts', async (req, res) => {
    const imgUrl = req.body.url;
    await db.collection("adminProducts").deleteOne({
      imageUrl: imgUrl,
    });
    res.send("Item Deleted Successfully!!");

  });

  app.post("/api/adminProducts", async (req, res) => {
    const adminProductName = req.body.name;
    const adminProductPrice = req.body.price;
    const adminProductUrl = req.body.url;
    const adminProductQty = req.body.qty;
    const adminProductTotalPrice = req.body.totalPrice;

    await db.collection("adminProducts").insertOne({
      name: adminProductName,
      price: adminProductPrice,
      imageUrl: adminProductUrl,
      qty: adminProductQty,
      totalPrice: adminProductTotalPrice
    });
    res.send("Added to database!!");
  });

  app.post("/api/addProduct", async (req, res) => {
    const productId = req.body.id;
    const productName = req.body.name;
    const productPrice = req.body.price;
    const productUrl = req.body.imageUrl;
    const productQty = req.body.qty;
    const productTotalPrice = req.body.totalPrice;

    await db.collection("products").insertOne({
      id: productId,
      name: productName,
      price: productPrice,
      imageUrl: productUrl,
      qty: productQty,
      totalPrice: productTotalPrice,
    });
    res.send("Added to database!!");
  });

  app.post("/api/deleteProduct", async (req, res) => {
    const productId = req.body.id;

    await db.collection("products").deleteOne({
      id: productId,
    });
    res.send("Deleted from database!!");
  });

  app.post("/api/register", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      const result = await user.save();
      const { password, ...data } = await result.toJSON();
      res.send(data);
    } catch (e) {
      return res.status(404).send({
        messge: "User Already registered",
      });
    }
  });

  app.post("/api/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        messge: "User not Found!!",
      });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({
        messge: "Invalid Credentials!!",
      });
    }

    const token = jwt.sign({ _id: user._id }, "supersecretsecret");

    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("jwt", token, options);

    res.send({
      message: "Success",
    });
  });

  app.get("/api/user", async (req, res) => {
    try {
      const cookie = req.cookies["jwt"];

      const claims = jwt.verify(cookie, "supersecretsecret");

      if (!claims) {
        return res.status(401).send({
          messge: "Unauthenticated!!",
        });
      }

      const user = await User.findOne({ _id: claims._id });

      const { password, ...data } = await user.toJSON();

      res.send(data);
    } catch (e) {
      return res.status(401).send({
        messge: "Unauthenticated!!",
      });
    }
  });

  app.post("/api/logout", async (req, res) => {
    const val = "";
    const options = { maxAge: 0 };

    res.cookie("jwt", val, options);

    res.send({
      message: "success",
    });
  });

  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}

start();
