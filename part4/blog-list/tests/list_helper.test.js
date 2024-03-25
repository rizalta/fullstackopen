import { test, describe } from "node:test";
import assert from "node:assert";

import listHelper from "../utils/list_helper.js";

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
];

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("when blogs are empty, is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  
  test("when list only has one blog, equals to likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });


  test("when multiple blogs are passed is the sum of the blogs", () => {
    const result = listHelper.totalLikes(blogs);

    assert.strictEqual(result, 36);
  });
});

describe("favourite blog", () => {
  test("when blogs are empty, returns empty object", () => {
    assert.deepStrictEqual(listHelper.favouriteBlog([]), {});
  });

  
  test("when list only has one blog, returns the only object", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    const { title, author, likes } = listWithOneBlog[0];
    const favourite = { title, author, likes };
    assert.deepStrictEqual(result, favourite);
  });


  test("when multiple blogs are passed, returns blog with most number of likes", () => {
    const result = listHelper.favouriteBlog(blogs);
    const favourite = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    assert.deepStrictEqual(result, favourite);
  });
});

describe("most blogs", () => {
  test("when blogs empty, returns empty object", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {});
  });

  test("when multiple blogs are passed, returns author and count of most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    const most = {
      author: "Robert C. Martin",
      blogs: 3
    };
    assert.deepStrictEqual(result, most);
  });
});

describe("most likes", () => {
  test("when blogs empty, returns empty object", () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), {});
  });

  test("when multiple blogs are passed, returns author with most likes", () => {
    const result = listHelper.mostLikes(blogs);
    const most = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };
    assert.deepStrictEqual(result, most);
  });
});