<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Solicitud;
use Carbon\Carbon;

class RejectOffers extends Command
{
    protected $signature = 'solicitudes:reject-offers';
    protected $description = 'Rechaza solicitudes con estado Oferta después de dos días';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $twoDaysAgo = Carbon::now();
        // quiero imrpimir todas las solicitudes , todas
        $solicitudes = Solicitud::where('estado', 'oferta')->get();
        foreach ($solicitudes as $solicitud) {
            if ($solicitud->created_at->diffInDays($twoDaysAgo) >= -1) {
                $solicitud->estado = 'rechazada';
                $solicitud->save();
            }
        }
        $this->info('Solicitudes con estado Oferta han sido rechazadas.');
    }
}
