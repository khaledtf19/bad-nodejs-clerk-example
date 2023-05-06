const express = require("express");
const router = express.Router();
const Clerk = require('@clerk/clerk-sdk-node/cjs/instance').default;
require("dotenv").config();

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const posts = [
  {
    id: 1,
    userId: "user_2PQbfbdBOFOXCvNqNVpSnckWIsS",
    content: "contnet 1"
  },
  {
    id: 2,
    userId: "user_2PNk2GxKI9MI9a5UfAaLuqcnCT8",
    content: "contnet 2"
  }
]

router.get("/", clerk.expressRequireAuth(), async (req, res) => {
  // console.log(await req.auth);
  // console.log(await clerk.users.getUser(req.auth.userId));
  // console.log(await clerk.users.getUserList());

  let newposts = await Promise.all(posts.map(async post => {
    let user = await clerk.users.getUser(post.userId)
    post.user = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl
    };
    return post
  }))



  return res.status(200).json({ posts: newposts });
})

module.exports = router;
