<?php

namespace App\Http\Controllers;

use App\Models\AdminSetting;
use Illuminate\Http\Request;

class AdminSettingsController extends Controller
{
    // Almacena la nueva configuración en la base de datos
    public function store(Request $request)
    {
        //primero limpia toda la tabla
        AdminSetting::truncate();
        $validatedData = $request->validate([
            'nroMaxPeriodAuditorio' => 'required|integer',
            'nroMaxPeriodAula' => 'required|integer',
            'nroMaxPeriodLaboratorio' => 'required|integer',
            'FechaIniSolicitudes' => 'required|date',
            'FechaFinSolicitudes' => 'required|date',
            'NroMaxAmbientContiguos' => 'required|integer',
        ]);

        // Crear la nueva configuración en la base de datos
        $setting = AdminSetting::create($validatedData);

        // Retornar una respuesta JSON
        return response()->json([
            'message' => 'Configuración creada exitosamente.',
            'setting' => $setting
        ], 201);
    }
}
