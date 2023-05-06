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
  console.log(await clerk.users.getUser(req.auth.userId));
  console.log(await clerk.users.getOrganizationMembershipList({
    userId: "user_2PNk2GxKI9MI9a5UfAaLuqcnCT8",
  }));

  const users = (await clerk.users.getUserList({
    userId: posts.map(post => post.userId)
  }))
    .map(user => ({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl
    }));

  let newPosts = posts.map(post => ({
    post,
    user: users.find(user => user.id === post.userId)
  }))



  return res.status(200).json({ data: newPosts });
})

module.exports = router;
