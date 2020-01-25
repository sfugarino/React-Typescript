let axios = require("axios");

const apiKey =
  "Uin-53ooSGp4zG_t-xAf2mHIdpquT-T02ZVa4tn5XYTLtgjhD07jn-rmvkJJbK4pmWXRkutZdBYeQrvjEYvLQGRzPyufp2mnofMuJH8ghTowVrfounlqJo4GCmcsXnYx";

const client = axios.create({
  baseURL: "https://api.yelp.com/v3",
  headers: {
    Authorization: "Bearer " + apiKey
  }
});

module.exports = client;
