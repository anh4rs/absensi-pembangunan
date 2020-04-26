<?php

class Login_model extends CI_Model
{
    private $_table = "user";


    function cek_login($username, $password)
    {
      $this->db->select("*");
      $this->db->from("user");
      $this->db->join('biodata','biodata.id_user=user.id');
      $this->db->where("username", $username);
      $query = $this->db->get();
      $user = $query->row();

      /**
       * Check password
       */
       if (!empty($user)) {

          if ($password == $user->password) {

              return $query->result();

          } else {

              return FALSE;

          }

        } else {

           return FALSE;

        }
    }



    function get_data_by_id($id)
    {
      $this->db->select("*");
      $this->db->from("user");
      $this->db->join('biodata','biodata.id_user=user.id');
      $this->db->where("user.id", $id);
      $query = $this->db->get();

      return $query->row();

      }

    public function tidak_login(){
        return $this->session->userdata('id') === null;
    }


}