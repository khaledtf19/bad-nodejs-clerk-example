const express = require("express");
const postsRoute = require("../routes/posts");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/posts", postsRoute);
};
