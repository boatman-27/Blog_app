import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const Profile = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:7001/auth", {
        withCredentials: true,
      });

      if (res.status === 200) {
        setUser(res.data.user);
      } else {
        console.log("Authentication failed:", res.data.message);
      }
    } catch (err) {
      setUser(false);
      console.error("Error during authentication:", err);
    }
  };
  console.log(user);

  useEffect(() => {
    checkAuth();
  }, []);

  const handleChange = (event) => {};

  const allowChange = () => {
    const formInputs = document.querySelectorAll("form input, form button");
    console.log(formInputs);

    formInputs.forEach((element) => {
      element.toggleAttribute("disabled");
    });
  };

  const deleteAccount = async () => {
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      // Append user.id as a query parameter
      console.log(user.id);
      const deleteUrl = `http://localhost:7001/delete?id=${user.id}`;
      navigate("/register");
      await axios.delete(deleteUrl, axiosConfig);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  return (
    <section>
      <div className="w-screen h-screen grid grid-rows-2 text-white md:grid-cols-6 min-h-screen">
        <Navbar user={user} />
        <div className="sides h-full bg-blue-900 md:h-screen md:col-span-4 items-center flex flex-col p-8 overflow-y-auto overflow-x-hidden min-h-screen">
          <div
            className="flex flex-col justify-center items-center"
            style={{ marginTop: "100px" }}
          >
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
              <div
                className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
                style={{ width: "700px" }}
              >
                <div className="flex items-center justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Current Account Data
                  </h3>
                </div>
                <form onSubmit={() => {}}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        value={user.first_name}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        value={user.last_name}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="username"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        value={user.email}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" w-full bg-teal-500 hover:bg-teal-700 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled
                  >
                    Confirm Updates
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
              <div
                className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
                style={{ width: "700px" }}
              >
                <div className="flex items-center justify-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Change Password
                  </h3>
                </div>
                <form onSubmit={() => {}}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        value={user.first_name}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        value={user.last_name}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" w-full bg-teal-500 hover:bg-teal-700 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled
                  >
                    Confirm Updates
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="sides bg-black md:h-screen md:col-span-2 flex flex-col p-8 overflow-y-scroll overflow-x-hidden min-h-screen justify-center items-center">
          <div className="flex flex-col items-center gap-7">
            <button
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              style={{ height: "5rem", width: "10rem" }}
              onClick={deleteAccount}
            >
              Delete Account
            </button>
            <button
              type="button"
              className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              style={{ height: "5rem", width: "10rem" }}
              onClick={allowChange}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
