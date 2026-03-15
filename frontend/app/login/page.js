"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "../../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function Login() {
 const params = useSearchParams();
const verified = params.get("verified");

  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
const handleLogin = async () => {

  try {
    setLoading(true);
    const res = await loginUser({
      email,
      password
    });

    localStorage.setItem("token",res.token);
    localStorage.setItem("role",res.roles[0]);

    router.push("/dashboard");

  } catch(err) {

    const message = err?.response?.data?.message || "Invalid credentials";

    alert(message);

  } finally {
    setLoading(false);
  }

};

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-[380px]">
         {verified && (
  <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-sm">
    Email verified successfully. Please login.
  </div>
)}

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Login to your account
        </h2>

        <div className="mb-5">

          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        <div className="mb-3 relative">

          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg p-3 pr-10 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-11 cursor-pointer text-gray-500"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        <div className="text-right mb-5 text-sm">
          <Link href="/forgot-password" className="text-blue-600">
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
           {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </div>

      </div>

    </div>

  );

}