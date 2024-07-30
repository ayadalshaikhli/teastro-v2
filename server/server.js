// const { ApolloServer } = require("apollo-server-express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const envPath = path.resolve(__dirname, "../server/.env");
require("dotenv").config({ path: envPath });
const app = express();

// const { typeDefs, resolvers } = require("./schemas");
const MURL = process.env.MONG_URI;
const DBNAME = process.env.DB_NAME;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["https://tea-tro.netlify.app"],
  })
);

const PORT = process.env.PORT || 5000;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.applyMiddleware({ app });

// mongoose
//   .connect(MURL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log(err, "Not Connected to MongoDB");
//   });

// app.use("/", require("./routes/authRouters"));

// Server the static assets if in production
// app.use(express.static(path.join(__dirname, "./")));

// const filmsRoute = require("./routes/films");
// app.use("/films", filmsRoute);

// const postsRoute = require("./routes/posts");
// app.use("/posts", postsRoute);

async function scrapeData() {
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--enable-low-end-device-mode",
        "--single-process",
      ],
    });
    const page = await browser.newPage();
    await page.goto(
      "https://mycima4.wecima.cam/category/%D8%A7%D9%81%D9%84%D8%A7%D9%85/"
    );
    const data = await page.evaluate(() => {
      const test = document.querySelector(".Grid--WecimaPosts");
      console.log(test);
      return srcs;
    });
    console.log(data);
    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

async function addDataInDB() {
  try {
    const client = new MongoClient(MURL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    await client.db(DBNAME).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db(DBNAME);
    const collection = database.collection("movies");

    async function puppet(pageUrl) {
      try {
        const browser = await puppeteer.launch({
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--enable-low-end-device-mode",
            "--single-process",
          ],
        });
        const page = await browser.newPage();
        await page.goto(pageUrl);
        const data = await page.evaluate(() => {
          const srcs = Array.from(
            document.querySelectorAll(".Grid--WecimaPosts .GridItem")
          ).map((GridItem) => {
            const imgElement = GridItem.querySelector(
              ".Thumb--GridItem a span"
            );
            const imgStyle = imgElement
              ? imgElement.getAttribute("style")
              : null;
            const imgRegex = /--image:url\(([^)]+)\);/;
            const imgMatch = imgStyle ? imgStyle.match(imgRegex) : null;
            const img = imgMatch ? imgMatch[1] : "";
            return {
              src: GridItem.querySelector(".Thumb--GridItem a").getAttribute(
                "href"
              ),
              img,
              title: GridItem.querySelector(".Thumb--GridItem a strong")
                .innerText,
            };
          });
          return srcs;
        });
        console.log(data);
        await browser.close();
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    const baseUrl =
      "https://mycima4.wecima.cam/category/%D8%A7%D9%81%D9%84%D8%A7%D9%85/page/";
    for (let i = 1; i <= 1; i++) {
      const pageUrl = `${baseUrl}${i}/`;
      const data = await puppet(pageUrl);
      if (data) {
        for (const item of data) {
          // Find the existing item in the collection based on title
          const existingItem = await collection.findOne({ title: item.title });
          if (!existingItem) {
            // Insert the item into the collection
            await collection.insertOne(item);
            console.log("Inserted document:", item);
          } else {
            // Create an update object with the fields to be updated
            const updateFields = {};
            const fieldsToCompare = ["src", "img"];
            fieldsToCompare.forEach((field) => {
              if (
                item.hasOwnProperty(field) &&
                existingItem[field] !== item[field]
              ) {
                updateFields[field] = item[field];
              }
            });
            if (Object.keys(updateFields).length > 0) {
              // Update the document with the new fields
              const filter = { _id: existingItem._id };
              const updateDoc = { $set: updateFields };
              await collection.updateOne(filter, updateDoc);
              console.log("Updated document:", item);
            } else {
              console.log("Item already exists:", item);
            }
          }
        }
      }
    }

    await client.close();
  } catch (err) {
    console.log(err);
  }
}
// addDataInDB();

async function movieDetailsFetch() {
  try {
    const client = new MongoClient(MURL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    await client.db(DBNAME).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const database = client.db(DBNAME);
    const collection = database.collection("movies");

    const pageSize = 100; // Number of documents to fetch per iteration
    let page = 1;
    let movies = [];
    let totalCount = 0;

    do {
      movies = await collection
        .find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();
      totalCount += movies.length;

      const browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--enable-low-end-device-mode",
          "--single-process",
        ],
      });

      for (const movie of movies) {
        if (movie.src) {
          if (!movie.movieLinks) {
            console.log("Fetching movie details for:", movie.src);

            const page = await browser.newPage();
            await page.goto(movie.src);

            const data = await page.evaluate(() => {
              const srcs = Array.from(document.querySelectorAll("btn")).map(
                (btn) => btn.getAttribute("data-url")
              );
              return srcs;
            });

            await page.close();

            // Add srcs to the movie collection as data-url
            const filter = { src: movie.src };
            const updateDoc = {
              $set: {
                movieLinks: data,
              },
            };
            const result = await collection.updateOne(filter, updateDoc);

            console.log(
              `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
            );

            if (result.modifiedCount === 0) {
              console.log("No changes made");
            }
          } else {
            console.log("Movie already has movieLinks:", movie.src);
          }
        } else {
          console.log("Invalid src:", movie.src);
        }
      }

      await browser.close();

      page++;
    } while (movies.length === pageSize);

    console.log("Total movies processed:", totalCount);

    await client.close();
  } catch (err) {
    console.log(err);
  }
}
// movieDetailsFetch();

async function deleteRepeatedMovies() {
  try {
    const client = new MongoClient(MURL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    await client.db(DBNAME).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db(DBNAME);
    const collection = database.collection("movies");

    const pipeline = [
      // Group documents by movie title and count the occurrences
      {
        $group: {
          _id: "$title",
          count: { $sum: 1 },
          duplicates: { $addToSet: "$_id" },
        },
      },
      // Match duplicates with count greater than 1
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ];

    const duplicates = await collection.aggregate(pipeline).toArray();

    if (duplicates.length > 0) {
      // Delete duplicate movies except for the first occurrence
      for (const duplicate of duplicates) {
        const [first, ...rest] = duplicate.duplicates;
        await collection.deleteMany({ _id: { $in: rest } });
        console.log(
          `Deleted ${rest.length} duplicates of movie "${duplicate._id}"`
        );
      }
    } else {
      console.log("No duplicate movies found.");
    }

    await client.close();
  } catch (err) {
    console.log(err);
  }
}
// deleteRepeatedMovies();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/getList", async (req, res) => {
  console.log("+++++++++");
  console.log(req.query); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log(req.route.path); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log("+++++++++");

  const { moviename, movieyear } = req.query;

  async function puppet() {
    // PUPPET | TRY-CATCH Error handling for remote website requests
    try {
      //PUPPET | Initialize Puppeteer
      const browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--enable-low-end-device-mode",
          "--single-process",
        ],
      });

      // PUPPET | Specify an page url to open
      const page = await browser.newPage();

      // PUPPET | Specify page url
      await page.goto(
        `https://mycima.actor:2083/watch/%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D8%A9-%D9%81%D9%8A%D9%84%D9%85-${moviename}-${movieyear}-%D9%85%D8%AA%D8%B1%D8%AC%D9%85/`
      );

      console.log("PUPPET | Page has been evaluated!");

      const data = await page.evaluate(() => {
        const srcs = Array.from(document.querySelectorAll("btn")).map((btn) =>
          btn.getAttribute("data-url")
        );
        return srcs;
      });

      console.log("PUPPET | Puppet Strings from page have been loaded.");
      console.log("PUPPET RESPONSE | puppetstrings \n", data);

      // End Puppeteer
      await browser.close();
      // return puppetStrings;

      return [data, null];
    } catch (error) {
      console.error(error);
      return [null, error];
    }
  }
  const [data, error] = await puppet();

  res.send(JSON.stringify(data));
});

app.get("/api/getMovies", async (req, res) => {
  console.log("REQUEST | params , query , route");
  console.log("+++++++++");
  console.log(req.query); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log(req.route.path); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log("+++++++++");
  // flip arabic from left to right

  const { moviename, movieyear } = req.query;

  async function puppet() {
    // PUPPET | TRY-CATCH Error handling for remote website requests
    try {
      //PUPPET | Initialize Puppeteer
      const browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--enable-low-end-device-mode",
          "--single-process",
        ],
      });
      // PUPPET | Specify an page url to open
      const page = await browser.newPage();

      await page.setBypassCSP(true);

      // PUPPET | Specify page url
      await page.goto(`https://mycimaa.tube/category/${moviename}/`);
      console.log(page, "PUPPET | Page has been evaluated!");

      const dataa = await page.evaluate(() => {
        const srcss = Array.from(
          // Select by class name
          document
            .querySelector(".Grid--MycimaPosts")
            .querySelectorAll(".GridItem")
        ).map((GridItem) => {
          return {
            src: GridItem.querySelector(".Thumb--GridItem")
              .querySelector("a")
              .getAttribute("href"),
            img: GridItem.querySelector(".Thumb--GridItem")
              .querySelector("a")
              .querySelector("span")
              .getAttribute("data-src"),
            title: GridItem.querySelector(".Thumb--GridItem")
              .querySelector("a")
              .querySelector("strong").innerText,
          };
        });
        return srcss;
      });
      // End Puppeteer
      await browser.close();
      // return puppetStrings;
      return [dataa, null];
    } catch (error) {
      console.error(error);
      return [null, error];
    }
  }
  const [data, error] = await puppet();

  res.send(JSON.stringify(data));
});

app.get("/api/hello", (req, res) => {
  console.log("REQUEST | params , query , route");
  console.log("+++++++++");
  console.log(req);
  res.send({ express: "Hello From Express" });
});

app.get("/api/scraped", async (req, res) => {
  const client = new MongoClient(MURL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  await client.db(DBNAME).command({ ping: 1 });

  const database = client.db(DBNAME);
  const collection = database.collection("movies");

  const data = await collection.find({}).toArray();
  console.log(data);
  res.send(JSON.stringify(data));
});

app.get("/api/moviesDB/:id", async (req, res) => {
  const id = req.params.id;

  const client = new MongoClient(MURL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db(DBNAME).command({ ping: 1 });

    const database = client.db(DBNAME);
    const collection = database.collection("movies");

    const data = await collection.findOne({ _id: new ObjectId(id) });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  } finally {
    await client.close();
  }
});

app.get("*", (req, res) => {
  res.sendStatus;
});

app.get("/barfoo", (req, res) => {
  console.log("+++++++++");
  console.log("REQUEST | params , query , route");
  console.log(req.body);
  console.log(req.params); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log(req.query); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
  console.log("+++++++++");

  console.log("Sent list of items");
  res.sendStatus;
});

// app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Mongodb connection
//     const client = new MongoClient(MURL, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
//     await client.connect();
//     await client.db(DBNAME).command({ ping: 1 });

//     const database = client.db(DBNAME);
//     const collection = database.collection("users");

//     const user = await collection.findOne({ email: email });
//     if (!user) {
//       return res.status(400).json({ error: "User does not exist" });
//     }
//     if (user.password !== password) {
//       return res.status(401).json({ error: "Invalid password" });
//     }

//     // Send Data email and user id
//     res.json({
//       message: "Login successful",
//       email: user.email,
//       id: user._id,
//     });

//     await client.close();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });
// app.post("/auth/register", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const client = new MongoClient(MURL);
//     await client.connect();

//     const database = client.db(DBNAME);
//     const collection = database.collection("users");

//     // Check if the user already exists in the database
//     const existingUser = await collection.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     // Create a new user
//     const newUser = {
//       email,
//       password,
//     };

//     await collection.insertOne(newUser);

//     // Successful signup
//     res
//       .status(201)
//       .json({ message: "User created", email: newUser.email, id: newUser._id });

//     // Close the MongoDB connection
//     await client.close();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server running on port: http://localhost:${PORT}`);

});
