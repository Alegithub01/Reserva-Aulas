<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolInterface extends Model
{
    use HasFactory;
    public function rol()
    {
        return $this->belongsTo(Rol::class);
    }

    public function interface()
    {
        return $this->belongsTo(InterfaceModel::class);
    }
}
