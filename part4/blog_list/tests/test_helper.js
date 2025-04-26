const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async () => {
  await User.deleteMany({}); // Clean up users before creating a new one

  const passwordHash = await bcrypt.hash("sahur123", 10);
  const user = new User({
    username: "tungtung",
    passwordHash,
  });

  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const initialBlogs = [
  {
    title: "Tungtungtung Vlog",
    author: "Tungtung Sahur",
    url: "http://www.tungtungtung.com",
    likes: 3,
    user: "680caadd4303f1893326c471",
    _id: "680caba04303f1893326c486",
    __v: 0,
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const nonExistingIdBlog = async () => {
  const blog = new Blog({
    title: "Tungtungtung Vlog",
    author: "Tungtung Sahur",
    url: "http://www.tungtungtung.com",
    likes: 3,
    user: "680caadd4303f1893326c471",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const initialUsers = [
  {
    username: "tungtung",
    name: "sahur",
    blogs: [
      {
        _id: "680cab884303f1893326c47e",
        title: "Unique Blog 1",
        author: "Tungtung Sahur",
        url: "http://www.tungtungtung.com/1",
        likes: 3,
      },
      {
        _id: "680cab8f4303f1893326c482",
        title: "Unique Blog 2",
        author: "Tungtung Sahur",
        url: "http://www.tungtungtung.com/2",
        likes: 5,
      },
      {
        _id: "680caba04303f1893326c486",
        title: "Unique Blog 3",
        author: "Tungtung Sahur",
        url: "http://www.tungtungtung.com/3",
        likes: 7,
      },
    ],
    id: "680caadd4303f1893326c471",
  },
];

const nonExistingIdUser = async () => {
  const user = new User({
    username: "FakeUser",
    name: "Fake User",
    blogs: [],
  });
  await user.save();
  await user.deleteOne();

  return user._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  loginUser,
  initialBlogs,
  initialUsers,
  nonExistingIdBlog,
  blogsInDb,
  nonExistingIdUser,
  usersInDb,
};
