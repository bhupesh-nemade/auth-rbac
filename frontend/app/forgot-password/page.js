"use client";

import { useState } from "react";
import { forgotPassword } from "../../services/authService";


export default function ForgotPassword(){

  const [email,setEmail] = useState("");
 const [loading,setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await forgotPassword(email);
      alert(res.message);
    }
    catch(err){
      alert("Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-[380px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email to receive password reset link.
        </p>

        <input
          placeholder="Enter email"
          className="w-full border p-2 rounded mb-6"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
           {loading ? "Sending Reset Link ..." : "Send Reset Link"}
        </button>

      </div>

    </div>
  );
}