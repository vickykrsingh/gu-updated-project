import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const forgetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgetpassword", {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };
  return (
    <Layout title="ECommerce - Forget Password">
      <div className="bg-purple-900 w-screen h-screen flex flex-col items-center justify-center px-3">
        <form
          onSubmit={(e) => forgetPassword(e)}
          className="w-full max-w-2xl h-1/2 bg-purple-700 px-5 py-5 rounded-md flex flex-col gap-5"
        >
          <div className="w-full flex justify-center items-center">
            <h2 className="text-3xl font-semibold text-white">
              FORGET PASSWORD
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor className="text-white font-semibold tracking-wider">
              Enter Your Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="abc@gmail.com"
              className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor className="text-white font-semibold tracking-wider">
              Enter Your Answer
            </label>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              placeholder="answer"
              className="rounded-lg px-4 py-1 w-full h-10 focus:outline-none focus:shadow-2xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor className="text-white font-semibold tracking-wider">
              Enter Your New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="********"
              className="rounded-lg px-4 py-1 w-full h-10 tracking-widest focus:outline-none focus:shadow-2xl"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white text-purple-900 font-semibold tracking-wider rounded-full w-full h-10 border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition duration-150 focus:outline-none"
            >
              FORGET PASSWORD
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
