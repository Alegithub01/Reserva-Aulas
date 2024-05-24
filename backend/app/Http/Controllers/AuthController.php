<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'dummyGet', 'registerMany', 'me','getRoleName']]);
    }

    public function dummyGet()
    {
        return response()->json(['message' => 'Dummy GET method']);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'role' => 2
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombres' => 'required',
            'apellidos' => 'required',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
            // 'rol_id' no es obligatorio, se establece por defecto en 2
            'rol_id' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // Si no se proporciona el rol_id, se establece el valor predeterminado como 2
        $userData = array_merge(
            $validator->validate(),
            ['password' => bcrypt($request->password)]
        );
        if (!isset($userData['rol_id'])) {
            $userData['rol_id'] = 2;
        }
        $user = User::create($userData);

        return response()->json([
            'message' => '¡Usuario registrado exitosamente!',
            'user' => $user
        ], 201);
    }


    public function registerMany(Request $request)
    {
        $users = $request->all();
        $response = [];
        foreach ($users as $user) {
            $validator = Validator::make($user, [
                'nombres' => 'required',
                'apellidos' => 'required',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:6',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::create(array_merge(
                $validator->validate(),
                ['password' => bcrypt($user['password'])]
            ));

            $response[] = $user;
        }

        return response()->json([
            'message' => '¡Usuarios registrados exitosamente!',
            'users' => $response
        ], 201);
    }

    
    public function getRoleName(Request $request)
    {
        // Validar la entrada
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // Obtener el usuario por email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Cargar la relación del rol
        $user->load('rol');

        // Obtener el nombre del rol
        $roleName = $user->rol ? $user->rol->nombre : 'Role not found';

        return response()->json([
            'role_name' => $roleName
        ]);
    }
}
