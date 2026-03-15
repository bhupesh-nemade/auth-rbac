// "use client";

// import { useEffect, useState } from "react";
// import API from "../../lib/api";

// export default function Dashboard() {

//   const [user, setUser] = useState(null);
//   const [usersCount,setUsersCount] = useState(0);

//   useEffect(() => {

//     const fetchData = async () => {

//       try {

//         const userRes = await API.get("/me");
//         setUser(userRes.data.user);

//         const usersRes = await API.get("/users");
//         setUsersCount(usersRes.data.length);

//       } catch (err) {

//         console.error("Failed to fetch data", err);

//       }

//     };

//     fetchData();

//   }, []);

//   return (

//     <div>

//       <h1 className="text-3xl font-bold mb-6">
//         Dashboard
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold">Total Users</h2>
//           <p className="text-2xl mt-2">{usersCount}</p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold">Total Roles</h2>
//           <p className="text-2xl mt-2">3</p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold">Logged User</h2>
//           <p className="text-2xl mt-2">
//             {user ? user.name : "Loading..."}
//           </p>
//         </div>

//       </div>

//     </div>

//   );

// }
"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
LineElement,
PointElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
ArcElement,
LineElement,
PointElement,
Title,
Tooltip,
Legend
);

export default function Dashboard(){

const [stats,setStats] = useState({});
const [role,setRole] = useState("");
const [usersCount,setUsersCount] = useState(0);

useEffect(()=>{

const fetchUsers = async ()=>{

try{
const res = await API.get("/users");
setUsersCount(res.data.length);
}catch(err){
console.log(err);
}

};

fetchUsers();

const r = localStorage.getItem("role");
setRole(r);

fetchStats();

},[]);

const fetchStats = async ()=>{

try{
const res = await API.get("/dashboard-stats");
setStats(res.data);
}catch(err){
console.log(err);
}

};

/* ADMIN BAR CHART */

const adminChart = {

labels:["Users","Roles","Managers","Employees"],

datasets:[{
label:"System Stats",
data:[
stats.users || 0,
stats.roles || 0,
3,
7
],
backgroundColor:[
"#4F46E5",
"#22C55E",
"#F59E0B",
"#EF4444"
]
}]

};


/* LINE CHART */

const lineChart = {

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{
label:"User Growth",
data:[5,7,4,8,6,9],
borderColor:"#3B82F6",
backgroundColor:"rgba(59,130,246,0.2)",
tension:0.4,
fill:true
}]

};


/* PIE CHART */

const pieChart = {

labels:["Profile","Tasks","Permissions"],

datasets:[{

data:[35,40,25],

backgroundColor:[
"#6366F1",
"#10B981",
"#F59E0B"
]

}]

};

const chartOptions = {

responsive:true,
maintainAspectRatio:false,

plugins:{
legend:{
position:"top"
}
}

};

return(

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">
Dashboard
</h1>


{/* CARDS */}

{(role === "Admin" || role === "Manager") && (

<div className="grid grid-cols-3 gap-6 mb-8">

<div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow">
<h2 className="text-sm opacity-80">
Total Users
</h2>
<p className="text-3xl font-bold">
{usersCount}
</p>
</div>

<div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow">
<h2 className="text-sm opacity-80">
Total Roles
</h2>
<p className="text-3xl font-bold">
3
</p>
</div>

<div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow">
<h2 className="text-sm opacity-80">
Active Users
</h2>
<p className="text-3xl font-bold">
12
</p>
</div>

</div>

)}



{/* ADMIN DASHBOARD */}

{role === "Admin" && (

<div className="grid grid-cols-2 gap-6">

<div className="bg-white p-6 rounded-lg shadow h-[350px] flex flex-col">
<h2 className="mb-4 font-semibold">
System Overview
</h2>

<div className="flex-1">
<Bar data={adminChart} options={chartOptions}/>
</div>

</div>



<div className="bg-white p-6 rounded-lg shadow h-[350px] flex flex-col">
<h2 className="mb-4 font-semibold">
Role Distribution
</h2>

<div className="flex-1">
<Pie data={pieChart} options={chartOptions}/>
</div>

</div>



<div className="bg-white p-6 rounded-lg shadow h-[350px] flex flex-col col-span-2">
<h2 className="mb-4 font-semibold">
User Growth
</h2>

<div className="flex-1">
<Line data={lineChart} options={chartOptions}/>
</div>

</div>

</div>

)}



{/* MANAGER DASHBOARD */}

{role === "Manager" && (

<div className="grid grid-cols-2 gap-6">

<div className="bg-white p-6 rounded-lg shadow h-[350px] flex flex-col">
<h2 className="mb-4 font-semibold">
User Activity Trend
</h2>

<div className="flex-1">
<Line data={lineChart} options={chartOptions}/>
</div>

</div>



<div className="bg-white p-6 rounded-lg shadow h-[350px] flex flex-col">
<h2 className="mb-4 font-semibold">
Team Distribution
</h2>

<div className="flex-1">
<Pie data={pieChart} options={chartOptions}/>
</div>

</div>

</div>

)}



{/* EMPLOYEE DASHBOARD */}

{role === "Employee" && (

<div className="grid grid-cols-2 gap-6">

<div className="bg-white p-6 rounded-lg shadow h-[350px] flex flex-col">
<h2 className="mb-4 font-semibold">
Employee Overview
</h2>

<div className="flex-1">
<Pie data={pieChart} options={chartOptions}/>
</div>

</div>



<div className="bg-white p-6 rounded-lg shadow h-[350px] flex flex-col">
<h2 className="mb-4 font-semibold">
Work Progress
</h2>

<div className="flex-1">
<Line data={lineChart} options={chartOptions}/>
</div>

</div>

</div>

)}

</div>

);

}