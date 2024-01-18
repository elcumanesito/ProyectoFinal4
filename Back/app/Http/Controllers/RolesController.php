<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use Illuminate\Http\Request;
use App\Models\Roles;

class RolesController extends Controller
{
    // Obtener la lista de roles
    public function index()
    {
        $roles = Roles::all();
        return response()->json($roles);
    }

    // Agregar un nuevo rol
    public function store(Request $request)
    {
        $request->validate([
            'rol' => 'required|string',
        ]);

        $role = new Roles([
            'rol' => $request->input('rol'),
            'estado' => 'activo',
        ]);

        $role->save();

        // //  usuario autenticado
        // $user_id = auth()->id();

        // // Registrar en la bitácora
        // $accion = 'Se creó un nuevo rol';
        // Bitacora::crearBitacora($user_id, $accion);

        return response()->json($role, 201);
    }

    // Cambiar el estado de un rol
    public function toggleStatus($id)
    {
        $role = Roles::findOrFail($id);
        $role->estado = ($role->estado == 'activo') ? 'inactivo' : 'activo';
        $role->save();

        return response()->json($role);
    }
}
