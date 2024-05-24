<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HelloController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\CorreoController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\MateriaDocenteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SolicitudGrupalController;
use App\Http\Controllers\MateriaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group ([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/registerMany', [AuthController::class, 'registerMany']);

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('get-role-name',[AuthController::class,'getRoleName']);
    Route::get('dummyy', [AuthController::class, 'dummyGet']);
});



Route::get('users/{nombre}/id', [UserController::class, 'obtenerIdPorNombre']);

//Rutas de los ambientes
Route::get('/ambientes', [AmbienteController::class, 'index'])->name('ambientes.index');
Route::post('/ambientes', [AmbienteController::class, 'store'])->name('ambientes.store');
Route::get('/ambientes/{ambiente}', [AmbienteController::class, 'show'])->name('ambientes.show');
Route::put('/ambientes/{ambiente}', [AmbienteController::class, 'update'])->name('ambientes.update');
Route::delete('/ambientes/{ambiente}', [AmbienteController::class, 'destroy'])->name('ambientes.destroy');
Route::post('/importar-ambientes', [AmbienteController::class, 'importar']);
Route::get('/enviar-correo', [CorreoController::class, 'index']);
Route::get('/enviar-correo-notificacion', [CorreoController::class, 'notificarCambioReglas']);
Route::post('/agregar-regla', [AmbienteController::class, 'addRule']);
Route::get('/reglas', [AmbienteController::class, 'getRules']);
Route::post('/ambientes-filtrar', [AmbienteController::class, 'filtrar']);


Route::post('/ambientes/obtener-id-por-nombre', [AmbienteController::class, 'obtenerIdPorNombre'])->name('ambientes.obtenerIdPorNombre');


//Rutas de las solicitudes

Route::get('/solicitudes', [SolicitudController::class, 'index'])->name('solicitudes.index');
Route::post('/solicitudes', [SolicitudController::class, 'store'])->name('solicitudes.store');
Route::get('/solicitudes/{id}', [SolicitudController::class, 'show'])->name('solicitudes.show');
Route::put('/solicitudes/{id}', [SolicitudController::class, 'update'])->name('solicitudes.update');
Route::delete('/solicitudes/{id}', [SolicitudController::class, 'destroy'])->name('solicitudes.destroy');

Route::get('/aceptadas', [SolicitudController::class, 'solicitudesAceptadas'])->name('solicitudes.aceptadas');


Route::get('/docentes/{idDocente}/materias', [MateriaDocenteController::class, 'obtenerMateriasPorIdDocente']);


Route::get('/docentes/{idDocente}/materias/{nombreMateria}/grupos-inscritos', [MateriaDocenteController::class, 'obtenerGruposEInscritosPorIdDocenteYNombreMateria']);

Route::get('/solicitudes-grupales', [SolicitudGrupalController::class, 'index'])->name('solicitudesGrupales.index');
Route::post('/solicitudes-grupales', [SolicitudGrupalController::class, 'store'])->name('solicitudesGrupales.store');
Route::get('/solicitudes-grupales/{id}', [SolicitudGrupalController::class, 'show'])->name('solicitudesGrupales.show');
Route::put('/solicitudes-grupales/{id}', [SolicitudGrupalController::class, 'update'])->name('solicitudesGrupales.update');
Route::delete('/solicitudes-grupales/{id}', [SolicitudGrupalController::class, 'destroy'])->name('solicitudesGrupales.destroy');


Route::get('/materias/nombres', [MateriaController::class, 'getNombres']);

Route::get('/materia-docente/grupos/{nombreMateria}', [MateriaDocenteController::class, 'gruposPorMateria']);

Route::get('/materia-docente/info/{nombreMateria}', [MateriaDocenteController::class, 'obtenerInfoPorMateria']);