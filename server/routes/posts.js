const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const fs = require('fs');
const { json } = require('express');



router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.send(posts);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.get('/api/movies', async(req, res) => {
    const { movieid } = req.query
    // console.log(movieid, "movieid");
    try{
        const post = await Post.findById(movieid);
        res.send(post);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// router.post("/api/movies", async (req, res) => {
//     console.log("REQUEST | params , query , route");
//     console.log("+++++++++");
//     console.log(req.query); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
//     console.log(req.route.path); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
//     console.log("+++++++++");
//     // flip arabic from left to right
  
//     // const { moviename, movieyear } = req.query
//     async function puppet() {
//       // PUPPET | TRY-CATCH Error handling for remote website requests
//       try {
//         //PUPPET | Initialize Puppeteer
//         const browser = await puppeteer.launch({
//           args: [
//             "--no-sandbox",
//             "--disable-setuid-sandbox",
//             "--disable-dev-shm-usage",
//             "--enable-low-end-device-mode",
//             "--single-process",
//           ],
//         });
//         // PUPPET | Specify an page url to open
//         const page = await browser.newPage();
  
//         await page.setBypassCSP(true);
  
//         // PUPPET | Specify page url
//         await page.goto(
//           ``
//         );
//         console.log(page ,"PUPPET | Page has been evaluated!");
  
//         const dataa = await page.evaluate(() => {
//           const srcss = Array.from(
//             // Select by class name
//             document.querySelector(".Grid--MycimaPosts").querySelectorAll(".GridItem")
//           ).map((GridItem) => {
//             return {
//               src: GridItem.querySelector(".Thumb--GridItem").querySelector("a").getAttribute("href"),
//               img: GridItem.querySelector(".Thumb--GridItem").querySelector("a").querySelector("span").getAttribute("data-src"),
//               title: GridItem.querySelector(".Thumb--GridItem").querySelector("a").querySelector("strong").innerText,
//             }
//           }
//           )
//           return srcss;
//         });
//         // End Puppeteer
//         await browser.close();
//         // return puppetStrings;
//         return [dataa, null];
//       } catch (error) {
//         console.error(error)
//         return [null, error]
//       }
//     };
//     const [data, error] = await puppet();
//     // res.json(data);
//     const dataa = JSON.stringify(data);

//     data.forEach(element => {
//         const post = new Post({
//             src: element.src,
//             title: element.title,
//         });
//         post.save();
        
//     })
// });

// router.post('/', async (req, res) => {
 
    
    
// });

router.post('/', async (req, res) => {
 
    console.log("REQUEST | params , query , route");
    console.log("+++++++++");
    console.log(req.query); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
    console.log(req.route.path); // /lor/creatures/hobbit?familyname=Baggins&home=Shire
    console.log("+++++++++");
    // flip arabic from left to right
  
    // const { moviename, movieyear } = req.query
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
        await page.goto(
          `https://mycimaa.tube/category/%d8%a7%d9%81%d9%84%d8%a7%d9%85/page/10/`
        );
        console.log(page ,"PUPPET | Page has been evaluated!");
  
        const dataa = await page.evaluate(() => {
          const srcss = Array.from(
            // Select by class name
            document.querySelector(".Grid--MycimaPosts").querySelectorAll(".GridItem")
          ).map((GridItem) => {
            return {
              src: GridItem.querySelector(".Thumb--GridItem").querySelector("a").getAttribute("href"),
              img: GridItem.querySelector(".Thumb--GridItem").querySelector("a").querySelector("span").getAttribute("data-src"),
              title: GridItem.querySelector(".Thumb--GridItem").querySelector("a").querySelector("strong").innerText,
            }
          }
          )
          return srcss;
        });
        // End Puppeteer
        await browser.close();
        // return puppetStrings;
        return [dataa, null];
      } catch (error) {
        console.error(error)
        return [null, error]
      }
    };
    const [data, error] = await puppet();
    console.log(data);
    const dataa = JSON.stringify(data);



    data.forEach(element => {
        const post = new Post({
            src: element.src,
            title: element.title,
        });
        post.save();
        
    })

    function async (){
        data.forEach(element => {
            const src = element.src;
            async function puppet(){
                try{

                
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
                  await page.goto(
                    `${src}`
                    );
                    console.log(page ,"PUPPET | Page has been evaluated!");
                    const movieDataa = await page.evaluate(() => {
                        const movieData = Array.from(
                          document.querySelectorAll("btn")
                        ).map((btn) => btn.getAttribute("data-url"));
                        return movieData;
                      });
                        // End Puppeteer
                        await browser.close();
                        // return puppetStrings;
                        return [movieDataa, null];
                    } catch (error) {
                        console.error(error)
                        return [null, error]
                      }
            }
        })
    }
    
});


module.exports = router;