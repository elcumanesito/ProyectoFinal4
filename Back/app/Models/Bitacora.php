<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    use HasFactory;

    protected $table = 'bitacoras';

    public static function crearBitacora($user_id, $accion)
    {
        $bitacora = new Bitacora ();
        $bitacora->user_id = $user_id;
        $bitacora->accion = $accion;
        $bitacora->save();
    }


}
