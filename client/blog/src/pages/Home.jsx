// Layout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const Home = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <section>
      <div className="w-screen h-screen grid grid-rows-2 text-white md:grid-cols-6">
        <div className="h-full bg-blue-900 md:h-screen md:col-span-4 centered flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome To My Blog
          </h1>
        </div>
        <div className="h-full bg-black md:h-screen md:col-span-2 centered flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-white-800 "> Get Started </h1>
          <div className="flex flex-row justify-center items-center gap-5">
            <Button
              variant="primary"
              onClick={goToRegister}
              style={{ width: "200px" }}
            >
              Register
            </Button>
            <Button
              variant="primary"
              onClick={goToLogin}
              style={{ width: "200px" }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
