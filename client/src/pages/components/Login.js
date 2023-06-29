import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  async function submit(e) {
    e.preventDefault();
    const loginUser = {
      email,
      password,
    };
    try {
      const res = await axios.post("http://localhost:5000/auth/login", loginUser);
      console.log(res.data);
      if (res.data.error === "User does not exist") {
        alert("User does not exist");
      } else if (res.data.error === "Invalid password") {
        alert("Invalid password");
      } else if (res.data.message === "Login successful") {
        dispatch(login(res.data.email));
        history.push("/", { from: "Login" } );
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
