<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Laporan extends CI_Controller {

	public function __construct()
	{
		parent::__construct();   		
		$this->absen_model->input_otomatis();


	}
	public function index($tgl=NULL)
	{	
		if ($tgl==NULL) $tgl = date("Y-m-d");

		if($this->login_model->tidak_login()) redirect(site_url('login')); 
		//if session = petugas absen    		
		//$data["absen"] = $this->absen_model->tampilkan_absen($this->session->userdata('kelas'));
		$data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
		$data["tampil_absen"] = $this->absen_model->tampil_kehadiran($this->session->userdata('kelas'));
		$data["absen"] = $this->absen_model->absensiDanKehadiran($tgl);
		$data['tgl_absen'] = $this->absen_model->tanggalAbsensi();

		$data['jumlah'] = $this->absen_model->hitung($tgl);

			$data["jumlah_siswa"] = $this->absen_model->jumlah_absen($this->session->userdata('kelas'));
	        
	        $data["hadir"] = $this->absen_model->nama_kehadiran('h', $tgl);
	        $data["sakit"] = $this->absen_model->nama_kehadiran('s', $tgl);
	        $data["izin"] = $this->absen_model->nama_kehadiran('i', $tgl);
	        $data["alfa"] = $this->absen_model->nama_kehadiran('a', $tgl);

			if($this->session->userdata('role') == "petugas") $this->load->view('petugas/laporan', $data);
			elseif($this->session->userdata('role') == "wali") $this->load->view('wali/laporan', $data);
			elseif($this->session->userdata('role') == "siswa") redirectSebelumnya();
			elseif($this->session->userdata('role') == "admin") $this->load->view('admin/laporan', $data);		
		//if session = walikelas
		//ngeload walikelas/beranda

		//if session = siswa
		//ngeload siswa/beranda
	}


	public function tanggal($tgl=NULL)
	{	
		if ($tgl==NULL) $tgl = date("Y-m-d");

		if($this->login_model->tidak_login()) redirect(site_url('login')); 
		//if session = petugas absen    		
		//$data["absen"] = $this->absen_model->tampilkan_absen($this->session->userdata('kelas'));
		$data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
		$data["tampil_absen"] = $this->absen_model->tampil_kehadiran($this->session->userdata('kelas'));
		$data["absen"] = $this->absen_model->absensiDanKehadiran($tgl);
		$data['tgl_absen'] = $this->absen_model->tanggalAbsensi();

		$data['jumlah'] = $this->absen_model->hitung($tgl);

			$data["jumlah_siswa"] = $this->absen_model->jumlah_absen($this->session->userdata('kelas'));
	        
	        $data["hadir"] = $this->absen_model->nama_kehadiran('h', $tgl);
	        $data["sakit"] = $this->absen_model->nama_kehadiran('s', $tgl);
	        $data["izin"] = $this->absen_model->nama_kehadiran('i', $tgl);
	        $data["alfa"] = $this->absen_model->nama_kehadiran('a', $tgl);

		$this->load->view('wali/laporan',$data);
		
		//if session = walikelas
		//ngeload walikelas/beranda

		//if session = siswa
		//ngeload siswa/beranda
	}

	function saya()
	{

		if($this->login_model->tidak_login()) redirect(site_url('login')); 
		//if session = petugas absen    		
		//$data["absen"] = $this->absen_model->tampilkan_absen($this->session->userdata('kelas'));
		$data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
		$data["absen"] = $this->absen_model->absensiPerOrang($this->session->userdata('id'));


	

			if($this->session->userdata('role') == "petugas") $this->load->view('petugas/laporan_saya', $data);
			elseif($this->session->userdata('role') == "wali") redirectSebelumnya();
			elseif($this->session->userdata('role') == "siswa") $this->load->view('siswa/laporan', $data);
			elseif($this->session->userdata('role') == "admin") $this->load->view('admin/laporan', $data);
	}

	//sementara
	
}
