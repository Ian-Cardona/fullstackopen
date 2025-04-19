const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = _.countBy(blogs, "author");
  console.log(authorCounts);
  const mostBlogsAuthor = _.maxBy(
    Object.entries(authorCounts),
    ([, count]) => count
  );

  return {
    author: mostBlogsAuthor[0],
    blogs: mostBlogsAuthor[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorLikes = _.reduce(
    blogs,
    (acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
      return acc;
    },
    {}
  );
  const mostLikesAuthor = _.maxBy(
    Object.entries(authorLikes),
    ([, likes]) => likes
  );
  return {
    author: mostLikesAuthor[0],
    likes: mostLikesAuthor[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
