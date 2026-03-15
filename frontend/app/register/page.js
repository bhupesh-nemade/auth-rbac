"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register(){

const router = useRouter();
const [loading,setLoading] = useState(false);
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const [showPassword,setShowPassword] = useState(false);
const [showConfirmPassword,setShowConfirmPassword] = useState(false);

const handleRegister = async () => {

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

try{
  setLoading(true);
const res = await api.post("/register",{
name,
email,
password
});

alert(res.data.message);

router.push("/login");

setName("");
setEmail("");
setPassword("");
setConfirmPassword("");

}catch(err){

console.log(err.response?.data);

alert(err.response?.data?.message || "Registration failed");

} finally {
  setLoading(false);
}

};

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow-lg w-[380px]">

<h2 className="text-2xl font-bold text-center mb-8">
Create Account
</h2>

<div className="mb-4">
<label className="block mb-1 text-sm font-medium">Name</label>
<input
className="w-full border p-2 rounded"
placeholder="Enter name"
onChange={(e)=>setName(e.target.value)}
/>
</div>

<div className="mb-4">
<label className="block mb-1 text-sm font-medium">Email</label>
<input
type="email"
className="w-full border p-2 rounded"
placeholder="Enter email"
onChange={(e)=>setEmail(e.target.value)}
/>
</div>

<div className="mb-4 relative">
<label className="block mb-1 text-sm font-medium">
Password
</label>

<input
type={showPassword ? "text" : "password"}
className="w-full border p-2 rounded pr-10"
placeholder="Enter password"
onChange={(e)=>setPassword(e.target.value)}
/>

<span
className="absolute right-3 top-9 cursor-pointer"
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash/> : <FaEye/>}
</span>

</div>

<div className="mb-6 relative">
<label className="block mb-1 text-sm font-medium">
Confirm Password
</label>

<input
type={showConfirmPassword ? "text" : "password"}
className="w-full border p-2 rounded pr-10"
placeholder="Confirm password"
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<span
className="absolute right-3 top-9 cursor-pointer"
onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
>
{showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
</span>

</div>

<button
        onClick={handleRegister}
        disabled={loading}
className="w-full bg-blue-600 text-white py-2 rounded"
>
  {loading ? "Registering..." : "Register"}
</button>

<div className="text-center mt-4 text-sm">
Already have an account?{" "}
<Link href="/login" className="text-blue-600 font-medium">
Login
</Link>
</div>

</div>
</div>

);

}