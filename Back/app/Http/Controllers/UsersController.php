<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    // Obtener la lista de usuarios
    public function index()
    {
        $usuarios = User::all();
        return response()->json($usuarios);
    }

    // Agregar un nuevo usuario
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',

        ]);

        $usuario = new User([
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'estado' => 'activo',
            'id_rol' => $request->input('id_rol', 1), // Valor predeterminado: 1
        ]);

        $usuario->save();

        return response()->json($usuario, 201);
    }

    // Cambiar el estado de un usuario
    public function toggleStatus($id)
    {
        try {
            $usuario = User::find($id);

            if (!$usuario) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            $usuario->estado = $usuario->estado === 'activo' ? 'inactivo' : 'activo';
            $usuario->save();

            return response()->json(['message' => 'Estado de usuario cambiado exitosamente', 'usuario' => $usuario]);
        } catch (\Exception $e) {
            Log::error("Error toggling usuario status: " . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }
}
