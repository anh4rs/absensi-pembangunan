<?php

class Absen_model extends CI_Model
{

    function tampilkan_absen($kelas)
    {
      $this->db->select('nama,nis,nisn,jk,id');
      $this->db->from('biodata');
      $this->db->join('user','user.id=biodata.id_user');
      $this->db->where("kelas ='$kelas' AND (user.role = 'siswa' OR user.role='petugas')");
      $this->db->order_by('nama','asc');

      $query = $this->db->get();
      return $query->result_array();

    }

    function getIdByClass($kelas)
    {
      $this->db->select('id');
      $this->db->from('biodata');
      $this->db->join('user','user.id=biodata.id_user');
      $this->db->where("kelas ='$kelas' AND (user.role = 'siswa' OR user.role='petugas')");
      $this->db->order_by('nama','asc');

      $query = $this->db->get();
      return $query->result();
    }

    function getAllStudentsId()
    {
      $this->db->select('biodata.id_user');
      $this->db->from('biodata');
      $this->db->join('user','user.id=biodata.id_user');
      $this->db->where("user.role = 'siswa' OR user.role='petugas'");
      $this->db->order_by('nama','asc');

      $query = $this->db->get();
      return $query->result();
    }

    function jumlah_absen($kelas)
    {
      $this->db->select('nama,nis,nisn,jk');
      $this->db->from('biodata');
      $this->db->join('user','user.id=biodata.id_user');
      $this->db->where("kelas ='$kelas' AND (user.role = 'siswa' OR user.role='petugas')");
      $this->db->order_by('nama','asc');


      return  $this->db->count_all_results();

    }

    function simpan($kehadiran)
    {
        foreach ($kehadiran as $k) {
          $data = array(
                "`jam_1`" => $k['1'],
                "`jam_2`" => $k['2'],
                "`jam_3`" => $k['3'],
                "`jam_4`" => $k['4'],
                "`jam_5`" => $k['5'],
                "`jam_6`" => $k['6'],
                "`jam_7`" => $k['7'],
                "`jam_8`" => $k['8'],
                "`jam_9`" => $k['9'],
                "`jam_10`" => $k['10'],
                "`jam_11`" => $k['11'],
                "`jam_12`" => $k['12'],
                "`jam_13`" => $k['13'],
                "`jam_14`" => $k['14']
                );

        $this->db->where('id_user', $k['id_user']);
        $this->db->where('tgl', $k['tgl']);
        $this->db->update('kehadiran', $data);

        }

        if ($this->db->error()) return TRUE;
        
   	     
        else return FALSE;
    }

    function tampil_kehadiran($kelas)
    {
      $tgl = date("Y-m-d");
      $this->db->select('kehadiran.*');
      $this->db->from('kehadiran');
      $this->db->join('user','user.id=kehadiran.id_user');
      $this->db->join('biodata','biodata.id_user=kehadiran.id_user');
      $this->db->where("biodata.kelas ='$kelas' AND kehadiran.tgl='$tgl'  AND (user.role = 'siswa' OR user.role='petugas')");
      $this->db->order_by('nama','asc');

      $query = $this->db->get();
      return $query->result_array();
    }

    function semuaAbsensi()
    {
      $kelas = $this->session->userdata('kelas');
      $this->db->select('biodata.*,kehadiran.*');
      $this->db->from('kehadiran');
      $this->db->join('user','user.id=kehadiran.id_user');
      $this->db->join('biodata','biodata.id_user=kehadiran.id_user');
      $this->db->where("biodata.kelas ='$kelas' AND (user.role = 'siswa' OR user.role='petugas')");
      $this->db->order_by('nama','asc');

      $query = $this->db->get();
      return $query->result_array();
    }

   function tanggalAbsensi()
    {
      $kelas = $this->session->userdata('kelas');
      $this->db->select('tgl');
      $this->db->from('kehadiran');
      $this->db->group_by('tgl');
      $query = $this->db->get();
      return $query->result_array();
    }

    function absensiDanKehadiran($tgl)
    {
      $kelas = $this->session->userdata('kelas');
      $this->db->select('biodata.*,kehadiran.*');
      $this->db->from('kehadiran');
      $this->db->join('user','user.id=kehadiran.id_user');
      $this->db->join('biodata','biodata.id_user=kehadiran.id_user');
      $this->db->where("biodata.kelas ='$kelas' AND kehadiran.tgl='$tgl' AND (user.role = 'siswa' OR user.role='petugas')");
      $this->db->order_by('nama','asc');

      $query = $this->db->get();
      return $query->result_array();
    }

    //fungsi otomatis insert kalau ganti hari
    function input_otomatis()
    {
      $this->db->select("tgl");
      $this->db->from("kehadiran");
      $this->db->where("tgl", date("Y-m-d"));
      $query = $this->db->get();
      $hasil = $query->row();

      $id_siswa = $this->getAllStudentsId();

      if (empty($hasil)) 
      {
        foreach ($id_siswa as $id) 
        {
          $kehadiran[$id->id_user] =  [  'id_user' => $id->id_user ,
                                        'tgl'     => date("Y-m-d")
                                      ];
        }
          $this->db->insert_batch('kehadiran',$kehadiran);
        return 1;
      }
      
      else 
      {
        return 0;
      }

    }



    


}