<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Models\Student;

Route::get('/', [PageController::class,'home']);

Route::get('/about', [PageController::class,'about']);

Route::get('/contact', [PageController::class,'contact']);

Route::get('/students', function () {
	$students = Student::all();
	return view('home', compact('students'));
});
