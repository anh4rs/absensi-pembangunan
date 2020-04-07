<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Laporan extends CI_Controller {

	public function __construct()
    {
		parent::__construct();
	}
	public function index()
	{	
		//if session = petugas absen 
		$this->load->view('petugas/laporan');
		
		//if session = walikelas
		//ngeload walikelas/beranda

		//if session = siswa
		//ngeload siswa/beranda
	}

	//sementara
	public function walikelas()
	{
		$this->view('wali/beranda');
	}

	public function siswa()
	{
		$this->view('siswa/beranda');
	}
}
