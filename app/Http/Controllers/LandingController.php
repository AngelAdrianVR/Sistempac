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
    
    /**
     * Procesa el formulario de contacto y redirige a WhatsApp.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function sendContactMessage(Request $request)
    {
        // 1. Validamos los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:1000',
        ]);

        // 2. Define tu número de teléfono de WhatsApp aquí
        // IMPORTANTE: Usa el código de país sin el "+" o "00". Ejemplo para México: 52133...
        // $yourWhatsAppNumber = '5213312345678'; // correcto
        $yourWhatsAppNumber = '5213312155731'; // de prueba 

        // 3. Construimos el mensaje que se pre-llenará en WhatsApp
        $name = $request->input('name');
        $phone = $request->input('phone');
        $email = $request->input('email');
        $messageText = $request->input('message');

        $fullMessage = "¡Hola! 👋 Vengo de tu sitio web.\n\n";
        $fullMessage .= "*Nombre:* $name\n";
        $fullMessage .= "*Email:* $email\n";
        if ($phone) {
            $fullMessage .= "*Teléfono:* $phone\n\n";
        }
        $fullMessage .= "*Mensaje:*\n$messageText";

        // 4. Codificamos el mensaje para que sea seguro en una URL
        $encodedMessage = urlencode($fullMessage);

        // 5. Creamos la URL de WhatsApp
        $whatsappUrl = "https://wa.me/{$yourWhatsAppNumber}?text={$encodedMessage}";

        // 6. Usamos Inertia::location para forzar una redirección del lado del cliente a una URL externa.
        // Esto abrirá la aplicación de WhatsApp o WhatsApp Web.
        return Inertia::location($whatsappUrl);
    }
}

