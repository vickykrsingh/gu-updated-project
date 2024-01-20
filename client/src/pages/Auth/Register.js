import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  return (
    <>
      <Layout title="ECommerce - Register">
        <div className="bg-purple-900 w-screen h-screen flex justify-center items-center">
          <form
            onSubmit={(e) => register(e)}
            className="w-screen max-w-2xl h-auto bg-purple-700 h-20 px-5 py-3 rounded-lg gap-2 flex flex-col"
          >
            <div className="w-full flex justify-center items-center">
              <h2 className="text-3xl font-semibold text-white">REGISTER</h2>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor
                className="text-white font-semibold tracking-wider"
              >
                Enter Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
              />
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
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor
                className="text-white font-semibold tracking-wider"
              >
                Enter Your Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone"
                className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor
                className="text-white font-semibold tracking-wider"
              >
                Enter Your Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your Address"
                className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor
                className="text-white font-semibold tracking-wider"
              >
                Enter Your Favorite IPL Team
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="IPL Team"
                className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
              />
            </div>
            <div className="flex justify-between mt-5">
              <button
                type="submit"
                className="bg-white text-purple-900 font-semibold tracking-wider rounded-full w-full h-10 border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition duration-150 focus:outline-none text-purple-700"
              >
                REGISTER
              </button>
            </div>
            <div className="flex justify-center mt-5 mb-3">
              <h3 className="text-white tracking-wider">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold uppercase underline text-purple-200 hover:text-purple-300 cursor-pointer"
                >
                  Login
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
