<?php

use App\Http\Controllers\RolController;
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
use App\Http\Controllers\AdminSettingsController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\DocenteController;
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

//rol
Route::get('/rol-obtener-id-por-nombre', [RolController::class, 'obtenerIdPorNombre']);

//usuario
Route::get('/listaUsers', [UserController::class, 'index']);
Route::get('users/{nombre}/id', [UserController::class, 'obtenerIdPorNombre']);
Route::get('/listaRoles', [RolController::class, 'index']);
Route::put('/updateUser/{id}', [UserController::class, 'updateUser']);
Route::put('/disableUser/{id}', [UserController::class, 'disableUser']);
Route::get('/users/{id}/nombre', [UserController::class, 'obtenerNombrePorId']);

//Rutas de los ambientes
Route::get('/ambientes', [AmbienteController::class, 'index'])->name('ambientes.index');
Route::post('/ambientes', [AmbienteController::class, 'store'])->name('ambientes.store');
Route::get('/ambientes/{ambiente}', [AmbienteController::class, 'show'])->name('ambientes.show');
Route::put('/ambientes/{ambiente}', [AmbienteController::class, 'update'])->name('ambientes.update');
Route::delete('/ambientes/{ambiente}', [AmbienteController::class, 'destroy'])->name('ambientes.destroy');
Route::post('/importar-ambientes', [AmbienteController::class, 'importar']);
Route::post('/agregar-regla', [AmbienteController::class, 'addRule']);
Route::get('/reglas', [AmbienteController::class, 'getRules']);
Route::post('/ambientes-filtrar', [AmbienteController::class, 'filtrar']);
// envio de correo
Route::get('/enviar-correo', [CorreoController::class, 'index']);//
Route::get('/enviar-correo-notificacion', [CorreoController::class, 'notificarCambioReglas']);
Route::post('/enviar-correo-solicitud', [CorreoController::class, 'notificarSolicitud']);// aceptar o rechazar solicitud


Route::post('/ambientes/obtener-id-por-nombre', [AmbienteController::class, 'obtenerIdPorNombre'])->name('ambientes.obtenerIdPorNombre');


//Rutas de las solicitudes
Route::get('/aceptadasInforme', [SolicitudController::class, 'solicitudesAceptadasInforme'])->name('solicitudes.aceptadasInforme');
Route::get('/solicitudes', [SolicitudController::class, 'index'])->name('solicitudes.index');
Route::post('/solicitudes', [SolicitudController::class, 'store'])->name('solicitudes.store');
Route::get('/solicitudes/{id}', [SolicitudController::class, 'show'])->name('solicitudes.show');
Route::put('/solicitudes/{id}', [SolicitudController::class, 'update'])->name('solicitudes.update');
Route::delete('/solicitudes/{id}', [SolicitudController::class, 'destroy'])->name('solicitudes.destroy');
Route::post('/aceptar/{id}', [SolicitudController::class, 'aceptar'])->name('solicitudes.aceptar');
Route::get('/aceptadas', [SolicitudController::class, 'solicitudesAceptadas'])->name('solicitudes.aceptadas');
Route::get('/solicitudes-formato/{userId}', [SolicitudController::class, 'getSolicitudesFormatted'])->name('solicitudes.getSolicitudesFormatted');
Route::get('/atender-solicitudes', [SolicitudController::class, 'solicitudesAatender'])->name('solicitudes.solicitudesAatender');

Route::get('/docentes/{idDocente}/materias', [MateriaDocenteController::class, 'obtenerMateriasPorIdDocente']);


Route::get('/docentes/{idDocente}/materias/{nombreMateria}/grupos-inscritos', [MateriaDocenteController::class, 'obtenerGruposEInscritosPorIdDocenteYNombreMateria']);

Route::get('/aceptadasGrupalesInforme', [SolicitudGrupalController::class, 'solicitudesAceptadasGrupalInforme']);
Route::get('/solicitudes-grupales', [SolicitudGrupalController::class, 'index'])->name('solicitudesGrupales.index');
Route::post('/solicitudes-grupales', [SolicitudGrupalController::class, 'store'])->name('solicitudesGrupales.store');
Route::get('/solicitudes-grupales/{id}', [SolicitudGrupalController::class, 'show'])->name('solicitudesGrupales.show');
Route::put('/solicitudes-grupales/{id}', [SolicitudGrupalController::class, 'update'])->name('solicitudesGrupales.update');
Route::delete('/solicitudes-grupales/{id}', [SolicitudGrupalController::class, 'destroy'])->name('solicitudesGrupales.destroy');
Route::post('/aceptarGrupal/{id}', [SolicitudGrupalController::class, 'aceptarGrupal'])->name('solicitudesGrupales.aceptarGrupal');
Route::get('/aceptadasGrupales', [SolicitudGrupalController::class, 'solicitudesAceptadasGrupal']);
Route::get('/materias/nombres', [MateriaController::class, 'getNombres']);
Route::get('/solicitudes-grupales/formatted/{userId}', [SolicitudGrupalController::class, 'getSolicitudesGrupalesFormatted']);
Route::get('/materia-docente/grupos/{nombreMateria}', [MateriaDocenteController::class, 'gruposPorMateria']);
Route::get('/atender-solicitudes-grupal', [SolicitudGrupalController::class, 'solicitudesAatenderGrupal']);
Route::get('/materia-docente/info/{nombreMateria}', [MateriaDocenteController::class, 'obtenerInfoPorMateria']);

// settings
Route::post('admin/settings', [AdminSettingsController::class, 'store']);
Route::get('admin/settings', [AdminSettingsController::class, 'show']);
Route::patch('admin/settings1', [AdminSettingsController::class, 'update']);

//Rutas Reserva asignar aulas
Route::post('/asignarIndividual', [ReservaController::class, 'asignarIndividual']);
Route::post('/asignarGrupal', [ReservaController::class, 'asignarGrupal']);

//Rechazar solicitud por administrador

Route::post('/rechazarIndividual/{id}', [SolicitudController::class, 'rechazar']);
Route::post('/rechazarGrupal/{id}', [SolicitudGrupalController::class, 'rechazarGrupal']);

//No aceptar la asignacion por parte del docente

Route::post('/noAceptar/{id}', [SolicitudController::class, 'noAceptarAsignacion']);
Route::post('/noAceptarGrupal/{id}', [SolicitudGrupalController::class, 'noAceptarAsignacionGrupal']);

//Id del docente dado el Id usuario
Route::get('/docente-id/{user_id}', [DocenteController::class, 'getDocenteIdByUserId']);

Route::get('/materias/departamento/{departamento}', [MateriaController::class, 'obtenerMateriasPorDepartamento']);
Route::post('/asignar-materias', [MateriaDocenteController::class, 'asignarMaterias']);