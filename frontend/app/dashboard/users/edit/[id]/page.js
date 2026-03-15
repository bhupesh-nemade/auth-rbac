"use client";

import { useState, useEffect, use } from "react";
import { updateUser } from "@/services/userService";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EditUser({ params }) {

const router = useRouter();
const { id } = use(params);
const [loading,setLoading] = useState(false);
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [role,setRole] = useState("");

useEffect(()=>{

const fetchUser = async ()=>{

const res = await API.get("/users");
const user = res.data.find(u => u.id == id);

if(user){
setName(user.name);
setEmail(user.email);
setRole(user.roles?.[0]?.name || "");
}

};

fetchUser();

},[id]);

const handleSubmit = async(e)=>{
e.preventDefault();

try{
  setLoading(true);
await updateUser(id,{
name,
email,
role
});

router.push("/dashboard/users/create");

}catch(err){

alert(err.response?.data?.message || "Update failed");

} finally {
  setLoading(false);
}

};

return(

<div>

<h1 className="text-2xl font-bold mb-6">Edit User</h1>

<form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">

<input
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2"
placeholder="Name"
/>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-2"
placeholder="Email"
/>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="border p-2"
>

<option value="Employee">Employee</option>
<option value="Manager">Manager</option>
<option value="Admin">Admin</option>

</select>

<button className="bg-blue-600 text-white p-2 rounded">
 {loading ? "Updating..." : "Update"}
</button>

</form>

</div>

);

}