<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PassportAuthController;
use App\Http\Controllers\API\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $title = "Home";
    return view('welcome',compact('title'));
});

Route::mediaLibrary();

Route::get('sanstha-dashboard/{id}', [PassportAuthController::class, 'sansthaDashboard']);
Route::get('following', [PassportAuthController::class, 'following']);
Route::get('followers', [PassportAuthController::class, 'followers']);
Route::get('terms-condition', [PassportAuthController::class, 'termscondition']);
Route::get('help-guide', [PassportAuthController::class, 'helpguide']);
Route::get('customcontent', [PassportAuthController::class, 'customcontent']);
Route::get('followerslist', [PassportAuthController::class, 'followerslist']);
Route::get('managesanstha', [PassportAuthController::class, 'managesanstha']);
Route::get('sharepostcard', [PassportAuthController::class, 'sharepostcard']);
Route::get('sanstha-detail/{id}', [PassportAuthController::class, 'postdetailpage']);
Route::get('manage-member', [PassportAuthController::class, 'afterloginManageMember']);
Route::get('manage-sanstha', [PassportAuthController::class, 'afterloginManageSanstha']);
Route::get('sharvak-munch', [PassportAuthController::class, 'sharvakmunch']);
Route::get('upcomming-more-event', [PassportAuthController::class, 'upcommingmoreevent']);
Route::get('current-more-event', [PassportAuthController::class, 'currentmoreevent']);
Route::get('profile-edit', [PassportAuthController::class, 'profileEdit']);
Route::get('profile', [PassportAuthController::class, 'profile']);
Route::get('sanstha', [PassportAuthController::class, 'afterloginSanstha']);
Route::get('activity', [PassportAuthController::class, 'afterloginactivity']);
Route::get('sharvak-dashboard', [PassportAuthController::class, 'afterloginhome']);
Route::get('select-sanstha-category', [PassportAuthController::class, 'selectSansthaCategory']);
Route::get('select-topic-type', [PassportAuthController::class, 'selectTopicType']);
Route::get('login-otp', [PassportAuthController::class, 'loginotp']);
Route::get('home-login', [PassportAuthController::class, 'homelogin']);
Route::get('sanstha-list', [PassportAuthController::class, 'sansthalist']);
Route::get('join-volunter', [PassportAuthController::class, 'joinVolunter']);
Route::get('feedback', [PassportAuthController::class, 'feedback']);
Route::get('sanstha-activty', [PassportAuthController::class, 'sansthaactivty']);
Route::get('about', [PassportAuthController::class, 'about']);
Route::post('logout', [PassportAuthController::class,'logout']);


// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
