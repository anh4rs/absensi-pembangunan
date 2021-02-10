<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Beranda extends CI_Controller {

	public function __construct()
    {
		parent::__construct();
   		$this->absen_model->input_otomatis();

	}

	public function index()
	{	
		

		//jika tidak login redirect ke halaman login
		if($this->login_model->tidak_login()) redirect(site_url('login')); 

		//jika login
		else 
		{

	        $data["absen"] = $this->absen_model->tampilkan_absen($this->session->userdata('kelas'));
	        $data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
	        $data["tampil_absen"] = $this->absen_model->tampil_kehadiran($this->session->userdata('kelas'));
	        $data["jumlah_siswa"] = $this->absen_model->jumlah_absen($this->session->userdata('kelas'));
	        
			$data['jumlah'] = $this->absen_model->hitung(date("Y-m-d"));
	        $data["hadir"] = $this->absen_model->nama_kehadiran('h', date("Y-m-d"));
	        $data["sakit"] = $this->absen_model->nama_kehadiran('s', date("Y-m-d"));
	        $data["izin"] = $this->absen_model->nama_kehadiran('i', date("Y-m-d"));
	        $data["alfa"] = $this->absen_model->nama_kehadiran('a', date("Y-m-d"));

			if($this->session->userdata('role') == "petugas") $this->load->view('petugas/beranda', $data);
			elseif($this->session->userdata('role') == "wali") $this->load->view('wali/beranda', $data);
			elseif($this->session->userdata('role') == "siswa")
			{
				$data["absen"] = $this->absen_model->absensiPerOrang($this->session->userdata('id'));

			 	$this->load->view('siswa/beranda', $data);
			}
			elseif($this->session->userdata('role') == "admin") $this->load->view('admin/beranda', $data);

		}
		
	}

	public function simpan()
	{
	    //membawa id di kelas
	    $ids = $this->absen_model->getIdByClass($this->session->userdata('kelas'));
        
        //membawa data dengan method post 
        foreach ($ids as $id) 
        {
        	$kehadiran[$id->id]["id_user"] = $id->id;
        	$kehadiran[$id->id]["tgl"] = date("Y-m-d");
        	for($jam=1 ; $jam<=14;$jam++ )
        	{	
        		$key = "{$id->id}_{$jam}";
        		$kehadiran[$id->id]["{$jam}"] = $this->input->post($key);	
        		
        	}
        	
        	// $this->absen_model->simpan($id,$kehadiran);	
        }
        //melakukan proses simpan
        // $simpan = $this->absen_model->simpan();
        // $data = $this->input->post(array('1_1','1_2'));
        $simpan = $this->absen_model->simpan($kehadiran);
        if($simpan)
        {
            echo 'success';

        } 
        else
        {   
            echo 'error';

        }


	}

	function test()
	{
			// $data["absen"] = $this->absen_model->tampilkan_absen();
	  //       $data["user"] = $this->login_model->get_data_by_id($this->session->userdata('id'));
	  //       $data["tampil_absen"] = $this->absen_model->tampil_kehadiran();

	        //echo json_encode($absen);
		$jumlah = $this->absen_model->hitung(date("Y-m-d"));
		echo '<pre>';
       //$this->load->view('petugas/test', $data);
		echo "hadir : ".$jumlah[0]."\n";
		echo "sakit : ".$jumlah[1]."\n";
		echo "izin : ".$jumlah[2]."\n";
		echo "alfa : ".$jumlah[3]."\n";
		echo "belum : ".$jumlah[4]."\n";
		echo "</pre>";

		//$absen = $this->absen_model->hitung() 
	}
}
