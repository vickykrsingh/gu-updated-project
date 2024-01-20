import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <>
      <Layout title={"ECommerce - Login"}>
        <div className="bg-purple-900 w-screen h-screen flex flex-col items-center justify-center px-3">
          <form
            className="w-full max-w-2xl h-1/2 bg-purple-700 px-5 py-5 rounded-md flex flex-col gap-5"
            onSubmit={(e) => login(e)}
          >
            <div className="w-full flex justify-center items-center">
              <h2 className="text-3xl font-semibold text-white">LOGIN</h2>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor
                className="text-white font-semibold tracking-wider"
              >
                Enter Your Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor
                className="text-white font-semibold tracking-wider"
              >
                Enter Your Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="rounded-lg px-4 py-1 w-full h-10 tracking-widest focus:outline-none focus:shadow-2xl"
              />
              <div className="w-full flex justify-end">
                <Link
                  to="/forgetpassword"
                  className="text-white font-light tracking-wider underline"
                >
                  Forget Password
                </Link>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-white text-purple-900 font-semibold tracking-wider rounded-full w-full h-10 border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition duration-150 focus:outline-none"
              >
                LOGIN
              </button>
            </div>
            <div className="flex justify-center ">
              <h3 className="text-white tracking-wider">
                Not a member?{" "}
                <Link
                  to="/register"
                  className="font-semibold uppercase underline text-purple-200 hover:text-purple-300 cursor-pointer"
                >
                  Signup
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
