<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {

        $users = [

            [
                'name' => 'Admin One',
                'email' => 'admin1@test.com',
                'role' => 'Admin',
                'verified' => true
            ],

            [
                'name' => 'Admin Two',
                'email' => 'admin2@test.com',
                'role' => 'Admin',
                'verified' => false
            ],

            [
                'name' => 'Manager One',
                'email' => 'manager1@test.com',
                'role' => 'Manager',
                'verified' => true
            ],

            [
                'name' => 'Manager Two',
                'email' => 'manager2@test.com',
                'role' => 'Manager',
                'verified' => false
            ],

            [
                'name' => 'Employee One',
                'email' => 'employee1@test.com',
                'role' => 'Employee',
                'verified' => true
            ],

            [
                'name' => 'Employee Two',
                'email' => 'employee2@test.com',
                'role' => 'Employee',
                'verified' => true
            ],

            [
                'name' => 'Employee Three',
                'email' => 'employee3@test.com',
                'role' => 'Employee',
                'verified' => false
            ],

            [
                'name' => 'Employee Four',
                'email' => 'employee4@test.com',
                'role' => 'Employee',
                'verified' => true
            ],

            [
                'name' => 'Employee Five',
                'email' => 'employee5@test.com',
                'role' => 'Employee',
                'verified' => false
            ],

            [
                'name' => 'Employee Six',
                'email' => 'employee6@test.com',
                'role' => 'Employee',
                'verified' => true
            ],

        ];


        foreach ($users as $data) {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password123'),
                'email_verified_at' => $data['verified'] ? now() : null
            ]);

            $user->assignRole($data['role']);
        }
    }
}