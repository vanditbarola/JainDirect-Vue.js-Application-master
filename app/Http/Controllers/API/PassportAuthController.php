<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class PassportAuthController extends BaseController
{
    public function sansthalist(){
        $title = 'Sansthas';
        return view('sansthalist',compact('title'));
    }

    public function sansthaactivty(){
        $title = 'Activity';
        return view('sansthaactivty',compact('title'));
    }

    public function homelogin(){
        $title = 'Login';
        return view('homelogin',compact('title'));
    }

    public function loginotp(){
        $title = 'Login';
        return view('loginotp',compact('title'));
    }

    public function selectTopicType(){
        $title = 'Topic Type';
        return view('selectTopicType',compact('title'));
    }

    public function selectSansthaCategory(){
        $title = 'Sanstha Category';
        return view('selectSansthaCategory',compact('title'));
    }

    public function afterloginhome(){
        $title = 'Dashboard';
        return view('afterloginhome',compact('title'));
    }

    public function afterloginactivity(){
        $title = 'Activity';
        return view('afterloginactivity',compact('title'));
    }

    public function afterloginSanstha(){
        $title = 'Sansthas';
        return view('afterloginSanstha',compact('title'));
    }

    public function afterloginManageSanstha(){
        $title = 'Sansthas';
        return view('afterloginManageSanstha',compact('title'));
    }
    
    public function afterloginManageMember(){
        $title = 'Members';
        return view('afterloginManageMember',compact('title'));
    }

    public function postdetailpage(){
        $title = 'Sanstha Detail';
        return view('postdetailpage',compact('title'));
    }

    public function profile(){
        $title = 'Profile';
        return view('profile',compact('title'));
    }

    public function joinVolunter(){
        $title = 'Volunter';
        return view('joinVolunter',compact('title'));
    }

    public function feedback(){
        $title = 'Feedback';
        return view('feedback',compact('title'));
    }

    public function about(){
        $title = 'About';
        return view('about',compact('title'));
    }

    public function currentmoreevent(){
        $title = 'Current Event';
        return view('currentmoreevent',compact('title'));
    }

    public function upcommingmoreevent(){
        $title = 'Upcoming Event';
        return view('upcommingmoreevent',compact('title'));
    }

    public function sharvakmunch(){
        $title = 'Sharvak Munch';
        return view('sharvakmunch',compact('title'));
    }

    public function profileEdit(){
        $title = 'Profile Edit';
        return view('profileEdit',compact('title'));
    }

    public function helpguide(){
        $title = 'Help & Guide';
        return view('helpguide',compact('title'));
    }

    public function termscondition(){
        $title = 'Terms Condition';
        return view('termscondition',compact('title'));
    }

    public function followers(){
        $title = 'Follower List';
        return view('followers',compact('title'));
    }

    public function following(){
        $title = 'Following List';
        return view('following',compact('title'));
    }

    public function sansthaDashboard(){
        $title = 'Sanstha Dashboard';
        return view('sansthaDashboard',compact('title'));
    }

    public function customcontent(){
        $title = 'Custom Page';
        return view('customcontent',compact('title'));
    }

    public function followerslist(){
        $title = 'Followers List';
        return view('followerslist',compact('title'));
    }

    public function managesanstha(){
        $title = 'Sansthas';
        return view('managesanstha',compact('title'));
    }

    public function sharepostcard (){
        $title = 'Share Post';
        return view('sharepostcard',compact('title'));
    }

    public function logout(Request $request)
    {
        if($request->user()){
            $this->guard()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return response()->json(['status' => 'success'], 200);
        }
        return response()->json(['status' => 'failed']);
    }
}
