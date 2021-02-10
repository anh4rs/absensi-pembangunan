<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Edit_model extends CI_Model {

	var $table = 'kehadiran';
	var $column_order = array('nama'); //set column field database for datatable orderable
	var $column_search = array('firstname','lastname','address'); //set column field database for datatable searchable just firstname , lastname , address are searchable
	var $order = array('nama' => 'asc'); // default order 

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}



	public function get_by_id($id)
	{
		$this->db->from('kehadiran');
		$this->db->join('user','user.id=kehadiran.id_user');
      	$this->db->join('biodata','biodata.id_user=kehadiran.id_user');
      	$this->db->where("kehadiran.id_kehadiran='$id'");
		$query = $this->db->get();

		return $query->row();
	}

	public function get_riwayat_by_id($id)
	{
		$this->db->select('pengeditan.*,biodata.nama');
		$this->db->from('pengeditan');
		$this->db->join('kehadiran','pengeditan.id_kehadiran=kehadiran.id_kehadiran','right outer');
      	$this->db->join('biodata','biodata.id_user=kehadiran.id_user','right outer');
      	$this->db->where("kehadiran.id_kehadiran='$id'");
		$query = $this->db->get();

		return $query->result_array();
	}
	
	public function save($data)
	{
		$this->db->insert($this->table, $data);
		return $this->db->insert_id();
	}

	public function update($where, $data)
	{
		$this->db->update('kehadiran', $data, $where);
		return $this->db->affected_rows();
	}

	public function delete_by_id($id)
	{
		$this->db->where('id', $id);
		$this->db->delete($this->table);
	}


}
