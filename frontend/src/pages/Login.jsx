import { useState } from "react";
import API from "../services/api";
import {
  useNavigate,
  Link
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex">

      <div className="hidden md:flex md:w-1/2 bg-indigo-600 text-white items-center justify-center">

        <div className="text-center px-10">

          <h1 className="text-6xl font-bold mb-6">
            🚀 TaskFlow AI
          </h1>

          <p className="text-xl">
            Organize, Track and Complete
            your tasks smarter with AI.
          </p>

        </div>

      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-100">

        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-indigo-600">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-indigo-600 font-semibold ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;

