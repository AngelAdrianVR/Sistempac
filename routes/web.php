<?php

use App\Http\Controllers\LandingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ruta principal que muestra la página de inicio ---------------------------------------------
// --------------------------------------------------------------------------------------------
Route::get('/', [LandingController::class, 'index'])->name('landing.index');
Route::get('/productos', [LandingController::class, 'products'])->name('landing.products');
Route::get('/quienes-somos', [LandingController::class, 'whoWeAre'])->name('landing.whoWeAre');
Route::get('/contacto', [LandingController::class, 'contact'])->name('landing.contact');


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
