import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/main.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const serializedBody = JSON.stringify(formData);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .post("http://localhost:7001/login", serializedBody, axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          console.log("logged in");
          onLogin();
          navigate("/main");
        }
        return response;
      })
      .then((response) => {
        console.log("message: ", response.data.message);
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage("Invalid username or password");
        console.log("Error: ", error);
      });
  };

  return (
    <div className="w-screen h-screen grid grid-rows-2 text-white md:grid-cols-6">
      <div className="h-full bg-blue-900 md:h-screen md:col-span-4 centered flex flex-col justify-center items-center p-8">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
            <div
              className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
              style={{ width: "500px" }}
            >
              <div className="flex items-center justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sign into your account
                </h3>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="email"
                    name="username"
                    id="email"
                    placeholder="name@company.com"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-xl font-bold leading-tight tracking-tight text-red-500 md:text-2xl dark:text-white">
                    {message}
                  </p>
                </div>
                <button
                  type="submit"
                  className=" w-full bg-teal-500 hover:bg-teal-700 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <a
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full bg-black md:h-screen md:col-span-2 flex flex-col items-center p-8"></div>
    </div>
  );
};
export default Login;
