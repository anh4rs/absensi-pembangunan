<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Setuju extends CI_Controller {

	public function __construct()
		{
		parent::__construct();
		$this->absen_model->input_otomatis();
		if($this->login_model->tidak_login()) redirect(site_url('login')); 
		if($this->session->userdata('role') == "petugas") redirectSebelumnya();
		if($this->session->userdata('role') == "siswa") redirectSebelumnya();
		if($this->session->userdata('role') == "admin") redirectSebelumnya();
		}

	public function index()
	{

		//jika login
		$data["pengajuan"] = $this->absen_model->pengajuan();
		$data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
	 if($this->session->userdata('role') == "wali") $this->load->view('wali/setuju', $data);

	}	


	function setuju($id_pengeditan)
	{
		$siswa = $this->absen_model->pengajuanById($id_pengeditan);
		unset($siswa[0]['id_user']);
		unset($siswa[0]['tgl']);
		unset($siswa[0]['nama']);
		unset($siswa[0]['id']);
		unset($siswa[0]['waktu']);
		unset($siswa[0]['status']);

		$this->db->update('kehadiran', $siswa[0], array('id_kehadiran' => $siswa[0]['id_kehadiran']));
		
		$this->db->update('pengeditan', array('status' => '1'), array('id' => $id_pengeditan));

		echo json_encode(['status' => 'sukses']);
	}

	function tidak_setuju($id_pengeditan)
	{
		
		$this->db->update('pengeditan', array('status' => '2'), array('id' => $id_pengeditan));

		echo json_encode(['status' => 'sukses']);
	}

	function test($id)
	{ 
		$siswa = $this->absen_model->pengajuanById($id);
		unset($siswa[0]['id_user']);
		unset($siswa[0]['tgl']);
		unset($siswa[0]['nama']);
		unset($siswa[0]['id']);
		unset($siswa[0]['waktu']);
		unset($siswa[0]['status']);
		echo "<pre>";
		print_r($siswa);
		echo "</pre>";
	}


}