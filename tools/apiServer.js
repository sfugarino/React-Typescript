const express = require("express");
const app = express();
const yelpApi = require("./yelpApi");
const cors = require("cors");
app.use(cors());

app.get("/parlors", async (req, res, next) => {
  try {
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
          console.log("success");
          return res.send(parlors);
        } catch (err) {
          console.log("fail");
          return next(err);
        }
      }
    }
    return next("Response code was" + response.status);
  } catch (err) {
    return next(err);
  }
});

app.get("/parlors/:id", async (req, res, next) => {
  let id = req.params.id;
  try {
    let response = await yelpApi.get("/businesses/" + id);
    if (response.status === 200) {
      let parlor = await response.data;

      try {
        let reviews = await getParlorReviews(id);
        parlor.reviews = reviews;
        console.log("success");
        return res.send(parlor);
      } catch (err) {
        console.log("fail");
        return next(err);
      }
    }
    return next("Response code was " + response.status);
  } catch (err) {
    return next(err);
  }
});

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const getParlorReviews = async id => {
  let response = await yelpApi.get("/businesses/" + id + "/reviews");

  if (response.status === 200) {
    let json = await response.data.reviews;
    return json;
  }

  throw new Error(response.status);
};

const errorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(err.status || 500).send({
      message: err.message,
      error: err
    });
  } else {
    return next(err);
  }
};

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  return next(err);
};

app.use(errorHandler);
app.use(logErrors);

let port = 3001;
app.listen(port);
console.log("Listening on port " + port);
