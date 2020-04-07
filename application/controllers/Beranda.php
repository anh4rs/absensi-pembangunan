<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Beranda extends CI_Controller {

	public function __construct()
    {
		parent::__construct();
	}
	public function index()
	{	
		$this->load->model("login_model");

		//jika tidak  redirect ke halaman login
		if($this->login_model->tidak_login()) redirect(site_url('login')); 

		//jika login
		else 
		{
			if($this->session->userdata('role') == "petugas") $this->load->view('petugas/beranda');
			elseif($this->session->userdata('role') == "wali") $this->load->view('petugas/beranda');
			elseif($this->session->userdata('role') == "siswa") $this->load->view('petugas/beranda');
			elseif($this->session->userdata('role') == "admin") $this->load->view('petugas/beranda');

		}
		
	}

	//sementara
	
}
