import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSignup = async () => {
    if (!username || !email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email address.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          user_email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Signup failed.");
        return;
      }

      const data = await response.json();
      toast.success("Account created successfully! Please sign in.");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        rightButton={
          <Link
            to="/signin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-sm"
          >
            <i className="fas fa-sign-in-alt" />
            Sign In
          </Link>
        }
      />
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm border p-6 rounded shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Create an account</h2>

          <input
            className="w-full border p-2 rounded mb-3 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded mb-3 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border p-2 rounded mb-3 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="my-4 w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-sm"
          >
            <i className="fas fa-user-plus" />
            Create Account
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
