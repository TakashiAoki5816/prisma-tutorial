const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());

app.get("/", async (req, res) => {
  const posts = await prisma.posts.findMany();
  return res.json(posts);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  const post = await prisma.posts.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.json(post);
});

app.post("/", async (req, res) => {
  const { title, body } = req.body;
  const posts = await prisma.posts.create({
    data: {
      title: title,
      body: body,
    }
  });

  return res.json(posts);
});

app.listen(PORT, () => {
  console.log("サーバーが起動中...")
});