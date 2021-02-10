<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Edit extends CI_Controller {

	public function __construct()
		{
		parent::__construct();
		$this->absen_model->input_otomatis();
		$this->load->model('edit_model','edit');

	}

	public function index($tgl=NULL)
	{

		if ($tgl==NULL) $tgl = date("Y-m-d");

		if($this->login_model->tidak_login()) redirect(site_url('login')); 

		//jika login
		else 
		{

					//$data["absen"] = $this->absen_model->absensiDanKehadiran();
			 $data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
			 $data["absen"] = $this->absen_model->absensiDanKehadiran($tgl);
			 $data['tgl_absen'] = $this->absen_model->tanggalAbsensi();
			
			$data['jumlah'] = $this->absen_model->hitung($tgl);

			$data["jumlah_siswa"] = $this->absen_model->jumlah_absen($this->session->userdata('kelas'));
	        
	        $data["hadir"] = $this->absen_model->nama_kehadiran('h', $tgl);
	        $data["sakit"] = $this->absen_model->nama_kehadiran('s', $tgl);
	        $data["izin"] = $this->absen_model->nama_kehadiran('i', $tgl);
	        $data["alfa"] = $this->absen_model->nama_kehadiran('a', $tgl);

			if($this->session->userdata('role') == "petugas") $this->load->view('petugas/edit', $data);
			elseif($this->session->userdata('role') == "wali") $this->load->view('wali/edit', $data);
			elseif($this->session->userdata('role') == "siswa") redirectSebelumnya();
			elseif($this->session->userdata('role') == "admin") $this->load->view('petugas/beranda', $data);

		}
	}	

	public function tanggal($tgl=NULL)
	{

		if ($tgl==NULL) $tgl = date("Y-m-d");

		if($this->login_model->tidak_login()) redirect(site_url('login')); 

		//jika login
		else 
		{

					//$data["absen"] = $this->absen_model->absensiDanKehadiran();
			 $data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
			 $data["absen"] = $this->absen_model->absensiDanKehadiran($tgl);
			 $data['tgl_absen'] = $this->absen_model->tanggalAbsensi();
			
			$data['jumlah'] = $this->absen_model->hitung($tgl);

			$data["jumlah_siswa"] = $this->absen_model->jumlah_absen($this->session->userdata('kelas'));
	        
	        $data["hadir"] = $this->absen_model->nama_kehadiran('h', $tgl);
	        $data["sakit"] = $this->absen_model->nama_kehadiran('s', $tgl);
	        $data["izin"] = $this->absen_model->nama_kehadiran('i', $tgl);
	        $data["alfa"] = $this->absen_model->nama_kehadiran('a', $tgl);

			if($this->session->userdata('role') == "petugas") $this->load->view('petugas/edit', $data);
			elseif($this->session->userdata('role') == "wali") $this->load->view('wali/edit', $data);
			elseif($this->session->userdata('role') == "siswa") redirectSebelumnya();
			elseif($this->session->userdata('role') == "admin") $this->load->view('petugas/beranda', $data);

		}
	}


		 function json(){

			$kelas = $this->session->userdata('kelas');
				$tgl = date("Y-m-d");

				$this->load->library('datatables');
				$this->datatables->select('biodata.*,kehadiran.*');
				$this->datatables->from('kehadiran');
				$this->datatables->join('user','user.id=kehadiran.id_user');
				$this->datatables->join('biodata','biodata.id_user=kehadiran.id_user');
				$this->datatables->where("biodata.kelas ='$kelas' AND kehadiran.tgl='$tgl' AND (user.role = 'siswa' OR user.role='petugas')");
				//$this->datatables->order_by('nama','asc');
				return print_r($this->datatables->generate());
		}

		function nyoba()
		{
			$this->load->library('datatables');
				$this->datatables->select('*');
				$this->datatables->from('biodata');
				return print_r($this->datatables->generate());
		}


 

	public function ajax_edit($id)
	{
		$data = $this->edit->get_by_id($id);
		echo json_encode($data);
	}

	public function ajax_riwayat($id)
	{
		$data = $this->edit->get_riwayat_by_id($id);
		// echo "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>";
		// echo "<script type='text/javascript'>var data =".json_encode($data)."; </script>";
		echo json_encode($data);
	}  

	public function ajax_update()
	{
		//$this->_validate();
		$data = array(
				'id_kehadiran' => $this->input->post('id_kehadiran'),
				'waktu' => date("Y-m-d H:i:s"),
				'jam_1' => $this->input->post('jam_1'),
				'jam_2' => $this->input->post('jam_2'),
				'jam_3' => $this->input->post('jam_3'),
				'jam_4' => $this->input->post('jam_4'),
				'jam_5' => $this->input->post('jam_5'),
				'jam_6' => $this->input->post('jam_6'),
				'jam_7' => $this->input->post('jam_7'),
				'jam_8' => $this->input->post('jam_8'),
				'jam_9' => $this->input->post('jam_9'),
				'jam_10' => $this->input->post('jam_10'),
				'jam_11' => $this->input->post('jam_11'),
				'jam_12' => $this->input->post('jam_12'),
				'jam_13' => $this->input->post('jam_13'),
				'jam_14' => $this->input->post('jam_14'),
				'status' => "0"
			);

		$this->db->insert('pengeditan',$data);
		echo json_encode($data);
	}


	public function ajax_update_wali()
	{
		//$this->_validate();
		$data = array(
				'jam_1' => $this->input->post('jam_1'),
				'jam_2' => $this->input->post('jam_2'),
				'jam_3' => $this->input->post('jam_3'),
				'jam_4' => $this->input->post('jam_4'),
				'jam_5' => $this->input->post('jam_5'),
				'jam_6' => $this->input->post('jam_6'),
				'jam_7' => $this->input->post('jam_7'),
				'jam_8' => $this->input->post('jam_8'),
				'jam_9' => $this->input->post('jam_9'),
				'jam_10' => $this->input->post('jam_10'),
				'jam_11' => $this->input->post('jam_11'),
				'jam_12' => $this->input->post('jam_12'),
				'jam_13' => $this->input->post('jam_13'),
				'jam_14' => $this->input->post('jam_14')
			);

		// $this->db->where('id_kehadiran', $this->input->post('id_kehadiran'));
		// $this->db->update('kehadiran', $data);
		$this->db->update('kehadiran', $data, array('id_kehadiran' => $this->input->post('id_kehadiran')));
		echo json_encode($data);

	}


 

	function test()
	{
		print_r($this->edit->get_datatables());
	}
}