<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home()
    {
        return "Welcome to the Home Page!";
    }

    public function about()
    {
        return "This is the About Us page.";
    }

    public function contact()
    {
        return "Contact us at: support@example.com";
    }
}

