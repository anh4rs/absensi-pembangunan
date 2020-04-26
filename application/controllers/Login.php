<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->library('form_validation');
    }


	public function index()
	{	
		
		if( !$this->login_model->tidak_login()) redirect(site_url('beranda')); 

        
		$this->load->view('login');
	}

	public function cek_login()
    {
        //load model M_user
        $this->load->model('login_model');

        $username = $this->input->post('username');
        $password = $this->input->post('password');
        //cek login via model
        $cek = $this->login_model->cek_login($username, $password);

        if(!empty($cek)){

            foreach($cek as $user) {

                //looping data user
                $session_data = array(
                    'id'   		=> $user->id,
                    'username'  => $user->username,
                    'role'		=> $user->role,
                    'kelas'		=> $user->kelas
                );
                //buat session berdasarkan user yang login
                $this->session->set_userdata($session_data);

            }

            echo "success";

        } else {
            
            echo "error";

        }

    }

	public function logout()
    {
        // hancurkan semua sesi
        $this->session->sess_destroy();
        redirect(site_url('login'));
    }
}
