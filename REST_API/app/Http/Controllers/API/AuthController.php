<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'id_card_number' => 'required',
            'password' => 'required',
        ]);
        $user = Society::where('id_card_number', $request->id_card_number)->where('password', $request->password)->first();
        if ($user) {
            Auth::login($user);
            $data = $user;
            $data['token'] = $user->createToken('Vaccinify')->plainTextToken;
            $data['regional'] = $user->regional->makeVisible('id');


            return response()->json($data, 200);
        } else {
            return response()->json([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logout success'
        ]);
    }
}
