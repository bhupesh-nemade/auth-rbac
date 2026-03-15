"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPassword } from "../../services/authService";

export default function ResetPassword(){

  const router = useRouter();
  const params = useSearchParams();
  
  const token = params.get("token");
  const email = params.get("email");
  const [loading,setLoading] = useState(false);
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirm,setShowConfirm] = useState(false);

  const handleReset = async () => {

    if(password !== confirm){
      alert("Passwords do not match");
      return;
    }

    try{
      setLoading(true);
      await resetPassword({
        token: token,
        email: email,
        password: password,
        password_confirmation: confirm
      });

      alert("Password reset successful");

      router.push("/login");

    }
    catch(err){
      alert("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-[380px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            className="w-full border p-2 rounded pr-10"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        <div className="relative mb-6">

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full border p-2 rounded pr-10"
            onChange={(e)=>setConfirm(e.target.value)}
          />

          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={()=>setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
           {loading ? "Changing Password..." : "Change Password"}
        </button>

      </div>

    </div>
  );
}