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

    public function update(Request $request)
    {
        // Encuentra la configuración existente por ID
        $setting = AdminSetting::findOrFail(1);

        // Valida los datos de la solicitud
        $validatedData = $request->validate([
            'nroMaxPeriodAuditorio' => 'sometimes|integer',
            'nroMaxPeriodAula' => 'sometimes|integer',
            'nroMaxPeriodLaboratorio' => 'sometimes|integer',
            'FechaIniSolicitudes' => 'sometimes|date',
            'FechaFinSolicitudes' => 'sometimes|date',
            'NroMaxAmbientContiguos' => 'sometimes|integer',
        ]);

        // Actualiza la configuración existente con los datos validados
        $setting->update($validatedData);

        // Retornar una respuesta JSON
        return response()->json([
            'message' => 'Configuración actualizada exitosamente.',
            'setting' => $setting
        ], 200);
    }

    public function show()
    {
        // Obtener la configuración de la base de datos
        $setting = AdminSetting::first();

        // Retornar una respuesta JSON
        return response()->json(['setting' => $setting], 200);
    }
}
