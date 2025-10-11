<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('Landing/Index');
    }

    /**
     * Muestra la página de productos y pasa el término de búsqueda inicial.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function products(Request $request)
    {
        return Inertia::render('Landing/Products', [
            // Pasamos el parámetro 'search' de la URL como una prop al componente de Vue.
            // Si no existe, se envía un string vacío.
            'initialSearch' => $request->query('search', ''),
        ]);
    }

    public function whoWeAre()
    {
        return Inertia::render('Landing/WhoWeAre');
    }

    public function contact()
    {
        return Inertia::render('Landing/Contact');
    }
    
}

