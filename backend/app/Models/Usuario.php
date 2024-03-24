<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Hashing\HashManager;

class Usuario extends Model
{
    use HasFactory;
    protected $fillable = [

    ];
    public function rol(){
        return $this->belongsTo(Rol::class);
    }
}
