const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
// const db = require('./config/connection');
const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors"); // Import the cors package

const { typeDefs, resolvers } = require("./schemas");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "https://tea-tro.netlify.app",
  })
);

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const filmsRoute = require("./routes/films");
app.use("/films", filmsRoute);

const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

// Server the static assets if in production
app.use(express.static(path.join(__dirname, "./")));

app.get("/", (req, res) => {
  res.send("Hello World!" | movieDetailsFetch());
});

const MURL = process.env.MONG_URI;
const DBNAME = process.env.DB_NAME;

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
            return {
              src: GridItem.querySelector(".Thumb--GridItem a").getAttribute(
                "href"
              ),
              img: GridItem.querySelector(
                ".Thumb--GridItem a span"
              ).getAttribute("style"),
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
          // Check if the item already exists in the collection
          const existingItem = await collection.findOne({ src: item.src });
          if (!existingItem) {
            // Insert the item into the collection
            await collection.insertOne(item);
            console.log("Inserted document:", item);
          } else {
            console.log("Item already exists:", item);
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

    const movies = await collection
      .find({ details: { $exists: false } })
      .toArray();

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
      try {
        const page = await browser.newPage();
        await page.goto(movie.src);

        const data = await page.evaluate(() => {
          const srcs = Array.from(document.querySelectorAll(".btn")).map(
            (btn) => btn.getAttribute("data-url")
          );
          return srcs;
        });

        console.log(data);
        await browser.close();

        movie.details = data;
        await collection.updateOne(
          { _id: movie._id },
          { $set: { details: data } }
        );
      } catch (err) {
        console.log(err);
        continue;
      }
    }

    client.close();
  } catch (err) {
    console.log(err);
  }
}

movieDetailsFetch();

async function runScraping() {
  while (true) {
    // await addDataInDB();
    await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 60 * 24));
  }
}

// runScraping();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/getList", async (req, res) => {
  console.log("REQUEST | params , query , route");
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.listen(PORT, () => {
  console.log(`API server running on port: http://localhost:${PORT}`);
  // log where we can go to test our GQL API
  console.log(`Use GraphQL at: http://localhost:${PORT}${server.graphqlPath}`);
});
