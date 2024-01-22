<?php

namespace App\Http\Controllers;

use App\Models\Bitacora;
use Illuminate\Http\Request;
use App\Models\Paginas;

class PaginasController extends Controller
{
    // Obtener la lista de páginas
    public function index()
    {
        $paginas = Paginas::all();
        return response()->json($paginas);
    }

    // Agregar una nueva página
    public function store(Request $request)
    {
        $request->validate([
            'url' => 'required|string',
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
        ]);

        $pagina = new Paginas([
            'url' => $request->input('url'),
            'nombre' => $request->input('nombre'),
            'descripcion' => $request->input('descripcion'),
        ]);

        $pagina->save();

         //  usuario autenticado
         $user_id = auth()->id();

         // Registrar en la bitácora
         $accion = 'Se creó un nuevo enlace';
         Bitacora::crearBitacora($user_id, $accion);

        return response()->json($pagina, 201);
    }

}
