<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        try {
            return response()->json(auth()->user());
        } catch (Exception $e) {
            // Log the exception for debugging purposes
            Log::info("Error fetching user info: " . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
{
    try {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        // return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(),400);
        }

        $user = User::create(array_merge(
            $validator->validate(),
            ['password' =>bcrypt($request->password)]

        ));

        return response()->json([
            'message' => '¡Usuario registrado exitosamente!',
            'user' => $user
        ], 201);
    }

    public function update(Request $request)
    {
        $user = User::find(auth()->id());

        if ($user instanceof User) {
            $user->update($request->only(['name', 'lastname', 'email', 'password']));
            return response()->json($user);
        } else {
            // Manejar el caso en el que $user no es una instancia válida de User
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    }

    public function toggleStatus($userId)
    {
        try {
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            $user->estado = $user->estado === 'activo' ? 'inactivo' : 'activo';
            $user->save();

            return response()->json(['message' => 'Estado de usuario cambiado exitosamente', 'user' => $user]);
        } catch (\Exception $e) {
            Log::error("Error toggling usuario status: " . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }
}
