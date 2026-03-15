"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/services/userService";
import { useRouter } from "next/navigation";
import { requireAuth } from "../../../../lib/authGuard";

export default function Users(){

const [users,setUsers] = useState([]);
const [role,setRole] = useState(null);
const router = useRouter();

const fetchUsers = async () => {
const data = await getUsers();
setUsers(data);
};

useEffect(()=>{
  requireAuth(router);
fetchUsers();

const r = localStorage.getItem("role");
setRole(r);

},[]);

const handleDelete = async(id)=>{
if(!confirm("Delete user?")) return;

await deleteUser(id);
fetchUsers();
};

return(

<div>

<h1 className="text-2xl font-bold mb-6">Users</h1>



<table className="w-full border">

<thead className="bg-gray-100">

<tr>
<th className="p-3 text-left">ID</th>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">Role</th>
<th className="p-3 text-left">Actions</th>
</tr>

</thead>

<tbody>

{users.map((u)=>(
<tr key={u.id}>

<td className="p-3">{u.id}</td>
<td className="p-3">{u.name}</td>
<td className="p-3">{u.email}</td>
<td className="p-3">{u.roles?.[0]?.name}</td>

<td className="p-3">

{role === "Admin" && (
<button
onClick={() => router.push(`/dashboard/users/edit/${u.id}`)}
className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
>
Edit
</button>
)}

{role === "Admin" && (
<button
onClick={() => handleDelete(u.id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Delete
</button>
)}

</td>

</tr>
))}

</tbody>

</table>

</div>

);

}