import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";

const SigninPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSignin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email address.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Sign-in failed.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Signed in successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        rightButton={
          <Link
            to="/signup"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-sm"
          >
            <i className="fas fa-user-plus" />
            Sign Up
          </Link>
        }
      />
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm border p-6 rounded shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Sign in</h2>

          <input
            type="email"
            className="w-full border p-2 rounded mb-4 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-2 rounded mb-4 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignin}
            className="mt-2 w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-sm"
          >
            <i className="fas fa-user-check" />
            Sign In
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
