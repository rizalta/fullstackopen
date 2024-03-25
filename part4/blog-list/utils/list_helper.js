import _ from "lodash";

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach(blog => {
    total += blog['likes'];
  });
  return total;
};

const favouriteBlog = (blogs) => {
  let favourite = null;
  let maxLikes = 0;
  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      favourite = blog;
      maxLikes = blog.likes;
    };
  });
  if (favourite) {
    return {
      title: favourite.title,
      author: favourite.author,
      likes: favourite.likes
    };
  } else {
    return {};
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  };
  const count = _.countBy(blogs, "author");
  const most = _.maxBy(_.keys(count), author => count[author]);
  return {
    author: most,
    blogs: count[most],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  };
  const groups = _.groupBy(blogs, "author");
  const likes = _.mapValues(groups, objs => _.sumBy(objs, "likes"));
  const most = _.maxBy(_.keys(likes), author => likes[author]);
  return {
    author: most,
    likes: likes[most],
  };
};

export default { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };