<?php

class Login_model extends CI_Model
{
    private $_table = "user";


    function cek_login($username, $password)
    {
      $this->db->select("*");
      $this->db->from("user");
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

    public function tidak_login(){
        return $this->session->userdata('id_user') === null;
    }


}