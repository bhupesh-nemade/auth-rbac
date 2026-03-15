<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
{
    return User::with('roles')->get();
}

 public function store(Request $request)
{
    $request->validate([
        'name'=>'required',
        'email'=>'required|email|unique:users',
        'password'=>'required|min:6',
        'role'=>'required'
    ]);

    $user = User::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'password'=>Hash::make($request->password)
    ]);

    $user->assignRole($request->role);

    return response()->json($user);
}

   public function update(Request $request,$id)
{
$user = User::findOrFail($id);

$request->validate([
'name' => 'required',
'email' => 'required|email|unique:users,email,'.$id,
'role' => 'required'
]);

$currentRole = $user->roles->first()?->name;

if($currentRole === $request->role){
return response()->json([
'message' => 'User already has this role'
],422);
}

$user->update([
'name'=>$request->name,
'email'=>$request->email
]);

$user->syncRoles([$request->role]);

return response()->json([
'message'=>'User updated',
'user'=>$user
]);
}

    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->json(['message'=>'User deleted']);
    }
}