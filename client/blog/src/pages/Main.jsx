import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import BlogPost from "../Blogs";

const Main = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    username: "",
    tags: [],
  });
  const [tag, setTag] = useState("");

  const [tagInputs, setTagInputs] = useState([""]);
  const filteredBlogs = blogs.filter((blog) =>
    blog.tags.some((BlogTags) =>
      BlogTags.toLowerCase().includes(tag.toLowerCase())
    )
  );

  useEffect(() => {
    const axiosConfig = {
      withCredentials: true,
    };
    axios
      .get("http://localhost:7001/main", axiosConfig)
      .then((response) => {
        setBlogs(response.data.blogs);
        setUser(response.data.user);
        console.log(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      author: user.first_name + " " + user.last_name,
      username: user.username,
    }));
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setTag(value);
  };

  const handleTagInputChange = (index, value) => {
    const newTagInputs = [...tagInputs];
    newTagInputs[index] = value;
    setTagInputs(newTagInputs);
  };

  const addTagInput = () => {
    if (tagInputs.length < 6) {
      setTagInputs((prevInputs) => [...prevInputs, ""]);
    }
  };

  const removeTagInput = (index) => {
    setTagInputs((prevInputs) => {
      const newTagInputs = [...prevInputs];
      newTagInputs.splice(index, 1);
      return newTagInputs;
    });
  };

  console.log("user: ", tag);

  const handleSubmit = async (event) => {
    const nonEmptyTags = tagInputs.filter((tag) => tag.trim() !== "");
    formData.tags = nonEmptyTags;
    console.log("submit: ", formData);

    const serializedBody = JSON.stringify(formData);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const response = await axios.post(
        "http://localhost:7001/addblog",
        serializedBody,
        axiosConfig
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const tagInputsGrid = [];
  for (let i = 0; i < tagInputs.length; i += 3) {
    const row = tagInputs.slice(i, i + 3);
    tagInputsGrid.push(row);
  }

  return (
    <section>
      <div className="w-screen h-screen grid grid-rows-2 text-white md:grid-cols-6 min-h-screen">
        <Navbar user={user} />
        <div className="sides h-full bg-blue-900 md:h-screen md:col-span-4 items-center flex flex-col p-8 overflow-y-auto overflow-x-hidden min-h-screen">
          <label
            htmlFor="tag"
            className="block mb-2 text-sm font-medium text-white dark:text-white text-center"
            style={{ marginTop: "4rem" }}
          >
            Search By tag
          </label>
          <div className="flex gap-1" style={{ width: "80%" }}>
            <form
              className="flex flex-grow space-x-4"
              style={{ width: "100%" }}
              onSubmit={() => {}}
            >
              <input
                className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="tag"
                id="tag"
                placeholder="Tag"
                value={tag}
                onChange={handleSearchChange}
              />
              <button className="bg-teal-500 hover:bg-teal-700 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Search
              </button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-4" style={{ marginTop: "2rem" }}>
            {tag
              ? filteredBlogs.map((blog) => (
                  <BlogPost
                    key={blog.id}
                    title={blog.blog_title}
                    content={blog.blog_content}
                    author={blog.author_name}
                    username={blog.author_username}
                    tags={blog.tags}
                  />
                ))
              : blogs.map((blog) => (
                  <BlogPost
                    key={blog.id}
                    title={blog.blog_title}
                    content={blog.blog_content}
                    author={blog.author_name}
                    username={blog.author_username}
                    tags={blog.tags}
                  />
                ))}
          </div>
        </div>
        <div className="sides bg-black md:h-screen md:col-span-2 flex flex-col items-center p-8 overflow-y-scroll overflow-x-hidden min-h-screen">
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="relative p-4 w-full max-w-3xl md:h-auto flex-shrink-0 overflow-y-auto">
              <div
                className="relative p-4 bg-transparent rounded-lg shadow dark:bg-gray-800 sm:p-5"
                style={{ width: "500px" }}
              >
                <div className="flex items-center justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h2
                    className="text-lg font-semibold text-white dark:text-white"
                    style={{ marginTop: "4rem" }}
                  >
                    Post your own blog
                  </h2>
                </div>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={user.username}
                      disabled
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Blog Title
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Blog Title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="content"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Content
                    </label>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="content"
                      id="content"
                      placeholder="Content"
                      value={formData.content}
                      onChange={handleChange}
                      rows={15}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tags"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Tags
                    </label>
                    <div className="flex flex-col">
                      {tagInputsGrid.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-row">
                          {row.map((tag, index) => (
                            <div key={index} className="mr-2">
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Tag"
                                value={tag}
                                onChange={(e) =>
                                  handleTagInputChange(
                                    index + rowIndex * 3,
                                    e.target.value
                                  )
                                }
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeTagInput(index + rowIndex * 3)
                                }
                                className="bg-red-500 hover:bg-red-700 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                style={{ margin: "10px" }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addTagInput}
                        className="bg-teal-500 hover:bg-teal-700 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="submit"
                    style={{ alignItems: "center" }}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
