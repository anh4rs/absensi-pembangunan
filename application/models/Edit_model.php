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

	private function _get_datatables_query()
	{
		$this->db->from($this->table);
		$this->db->join('user','user.id=kehadiran.id_user');
      	$this->db->join('biodata','biodata.id_user=kehadiran.id_user');
      	$this->db->where("biodata.kelas ='XI-SIJA-A' AND kehadiran.tgl='2020-04-20' AND (user.role = 'siswa' OR user.role='petugas')");
		$i = 0;
	
		foreach ($this->column_search as $item) // loop column 
		{
			if($_POST['search']['value']) // if datatable send POST for search
			{
				
				if($i===0) // first loop
				{
					$this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
					$this->db->like($item, $_POST['search']['value']);
				}
				else
				{
					$this->db->or_like($item, $_POST['search']['value']);
				}

				if(count($this->column_search) - 1 == $i) //last loop
					$this->db->group_end(); //close bracket
			}
			$i++;
		}
		
		if(isset($_POST['order'])) // here order processing
		{
			$this->db->order_by($this->column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
		} 
		else if(isset($this->order))
		{
			$order = $this->order;
			$this->db->order_by(key($order), $order[key($order)]);
		}
	}

	function get_datatables()
	{
		$this->_get_datatables_query();
		if($_POST['length'] != -1)
		$this->db->limit($_POST['length'], $_POST['start']);
		$query = $this->db->get();
		return $query->result();
	}

	function count_filtered()
	{
		$this->_get_datatables_query();
		$query = $this->db->get();
		return $query->num_rows();
	}

	public function count_all()
	{
		$this->db->from($this->table);
		$this->db->join('user','user.id=kehadiran.id_user');
      	$this->db->join('biodata','biodata.id_user=kehadiran.id_user');
      	$this->db->where("biodata.kelas ='XI-SIJA-A' AND kehadiran.tgl='2020-04-20' AND (user.role = 'siswa' OR user.role='petugas')");
		return $this->db->count_all_results();
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
