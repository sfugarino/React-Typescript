const express = require("express");
const app = express();
const yelpApi = require("./yelpApi");
const cors = require("cors");
app.use(cors());

app.get("/parlors", async (req, res, next) => {
  let response = await yelpApi.get("/businesses/search", {
    params: {
      limit: 5,
      term: "food",
      location: "Alpharetta, GA",
      categories: "icecream,All",
      sort_by: "rating"
    }
  });

  if (response.status === 200) {
    let parlors = await response.data.businesses;
    if (typeof parlors !== "undefined") {
      try {
        await asyncForEach(parlors, async parlor => {
          let reviews = await getParlorReviews(parlor.id);
          if (typeof reviews !== "undefined" && reviews.length > 0) {
            parlor.reviews = [];
            parlor.reviews.push(reviews[0]);
          }
        });
        res.send(parlors);
      } catch (err) {
        next(err);
      }
    }
  }

  next(response.status);
});

app.get("/parlors/:id", async (req, res, next) => {
  let id = req.params.id;
  let response = await yelpApi.get("/businesses/" + id);

  if (response.status === 200) {
    let parlor = await response.data;

    try {
      let reviews = await getParlorReviews(id);
      parlor.reviews = reviews;
      res.send(parlor);
    } catch (err) {
      next(err);
    }
  }

  next(response.status);
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function getParlorReviews(id) {
  let response = await yelpApi.get("/businesses/" + id + "/reviews");

  if (response.status === 200) {
    let json = await response.data.reviews;
    return json;
  }

  throw new Error(response.status);
}
let port = 3001;
app.listen(port);
console.log("Listening on port " + port);
