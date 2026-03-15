

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function DashboardLayout({ children }) {

const [role,setRole] = useState(null);
const [user,setUser] = useState(null);

useEffect(()=>{

const r = localStorage.getItem("role");
setRole(r);

fetchUser();

},[]);


const fetchUser = async () => {

try{

const res = await API.get("/me");

setUser(res.data.user);

}catch(err){

console.log(err);

}

};


return (

<div className="flex min-h-screen bg-gray-100">

{/* Sidebar */}

<aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">

<div>

<h2 className="text-xl font-bold mb-8">
Sidebar Panel
</h2>

<nav className="flex flex-col gap-4">

<Link href="/dashboard" className="hover:text-blue-600">
Dashboard
</Link>

{role !== "Employee" && (

<Link href="/dashboard/users/create" className="hover:text-blue-600">
Users
</Link>

)}

</nav>

</div>


{/* USER INFO + LOGOUT */}

<div>

<div className="border-t pt-4 mb-4">

<p className="font-semibold">
            {user ? user.name : "Loading..."||"Unknown User"}
</p>

<p className="text-sm text-gray-500">
{role}
</p>

</div>

<button
className="text-red-500"
onClick={()=>{
localStorage.removeItem("token");
window.location.href="/login";
}}
>

Logout

</button>

</div>

</aside>


{/* Content */}

<main className="flex-1 p-10">

{children}

</main>

</div>

);

}