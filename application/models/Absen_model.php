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

    function hitung($tgl)
    {
      $absen = $this->absensiDanKehadiran($tgl);

      $h = 0;
      $s = 0;
      $i = 0;
      $a = 0;
      $b = 0;
      foreach ($absen as $siswa) 
      {
        if ($siswa['jam_1']=='h' || $siswa['jam_2']=='h' ||$siswa['jam_3']=='h' || $siswa['jam_4']=='h' ||$siswa['jam_5']=='h'||$siswa['jam_6']=='h'||$siswa['jam_7']=='h'||$siswa['jam_8']=='h'||$siswa['jam_9']=='h'||$siswa['jam_10']=='h'||$siswa['jam_11']=='h'||$siswa['jam_12']=='h' || $siswa['jam_13']=='h' ||$siswa['jam_14']=='h') $h++;

        if ($siswa['jam_1']=='s' || $siswa['jam_2']=='s' ||$siswa['jam_3']=='s' || $siswa['jam_4']=='s' ||$siswa['jam_5']=='s'||$siswa['jam_6']=='s'||$siswa['jam_7']=='s'||$siswa['jam_8']=='s'||$siswa['jam_9']=='s'||$siswa['jam_10']=='s'||$siswa['jam_11']=='s'||$siswa['jam_12']=='s' || $siswa['jam_13']=='s' ||$siswa['jam_14']=='s') $s++;
        
        if ($siswa['jam_1']=='i' || $siswa['jam_2']=='i' ||$siswa['jam_3']=='i' || $siswa['jam_4']=='i' ||$siswa['jam_5']=='i'||$siswa['jam_6']=='i'||$siswa['jam_7']=='i'||$siswa['jam_8']=='i'||$siswa['jam_9']=='i'||$siswa['jam_10']=='i'||$siswa['jam_11']=='i'||$siswa['jam_12']=='i' || $siswa['jam_13']=='i' ||$siswa['jam_14']=='i') $i++;

        if ($siswa['jam_1']=='a' || $siswa['jam_2']=='a' ||$siswa['jam_3']=='a' || $siswa['jam_4']=='a' ||$siswa['jam_5']=='a'||$siswa['jam_6']=='a'||$siswa['jam_7']=='a'||$siswa['jam_8']=='a'||$siswa['jam_9']=='a'||$siswa['jam_10']=='a'||$siswa['jam_11']=='a'||$siswa['jam_12']=='a' || $siswa['jam_13']=='a' ||$siswa['jam_14']=='a') $a++;

        if ($siswa['jam_1']=='' || $siswa['jam_2']=='' ||$siswa['jam_3']=='' || $siswa['jam_4']=='' ||$siswa['jam_5']==''||$siswa['jam_6']==''||$siswa['jam_7']==''||$siswa['jam_8']==''||$siswa['jam_9']==''||$siswa['jam_10']==''||$siswa['jam_11']==''||$siswa['jam_12']=='' || $siswa['jam_13']=='' ||$siswa['jam_14']=='') $b++;
               
      }
      $hasil[0] = $h;
      $hasil[1] = $s;
      $hasil[2] = $i;
      $hasil[3] = $a;
      $hasil[4] = $b;

      return $hasil;
    }

    function nama_kehadiran($ket,$tgl)
    {
      $this->db->select('b.nama');
      $this->db->from('biodata AS b');
      $this->db->join('kehadiran AS k','b.id_user=k.id_user');
      $this->db->where("k.tgl='$tgl' AND (k.jam_1='$ket' OR k.jam_2='$ket' OR k.jam_3='$ket' OR  k.jam_4='$ket' OR k.jam_5='$ket' OR k.jam_6='$ket' OR  k.jam_7='$ket' OR k.jam_8='$ket' OR k.jam_9='$ket' OR k.jam_10='$ket' OR k.jam_11='$ket' OR k.jam_12='$ket' OR k.jam_13='$ket' OR k.jam_14='$ket' )");
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


    function pengajuan()
    {
      $this->db->select('kehadiran.*, biodata.nama, pengeditan.*');
      $this->db->from('pengeditan');
      $this->db->join('kehadiran', 'pengeditan.id_kehadiran=kehadiran.id_kehadiran');
      $this->db->join('biodata', 'kehadiran.id_user=biodata.id_user');
      $this->db->where('pengeditan.status','0');
      $query = $this->db->get();
      return $query->result_array();
    }

    function pengajuanById($id)
    {
      $this->db->select('kehadiran.*, biodata.nama, pengeditan.*');
      $this->db->from('pengeditan');
      $this->db->join('kehadiran', 'pengeditan.id_kehadiran=kehadiran.id_kehadiran');
      $this->db->join('biodata', 'kehadiran.id_user=biodata.id_user');
      $this->db->where('pengeditan.id', $id);
      $query = $this->db->get();
      return $query->result_array();
    }
    
    function absensiPerOrang($id)
    {
      $this->db->select('kehadiran.*');
      $this->db->from('kehadiran');
      $this->db->join('user','user.id=kehadiran.id_user');
      $this->db->join('biodata','biodata.id_user=kehadiran.id_user');
      $this->db->where("biodata.id_user='$id' AND (user.role = 'siswa' OR user.role='petugas')");
      $this->db->order_by('kehadiran.tgl','desc');

      $query = $this->db->get();
      return $query->result_array();
    
    }

}