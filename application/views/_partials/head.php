<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="Absensi Siswa">
<meta name="author" content="Robi Setia Permadi" >
<title>
    <?php 
    echo SITE_NAME;
    echo $this->uri->segment(1)!=NULL ? ' - ' : ' - Login'; 
    echo ucfirst($this->uri->segment(1)); 
    
    ?>
</title>
    <!-- Bootstrap -->
<link rel="stylesheet" href="<?php echo base_url('assets/vendor/bootstrap/dist/css/bootstrap.min.css')?>">
  <!-- Favicon -->
<link rel="icon" href="<?php echo base_url('assets/img/brand/smkn1.png')?>" type="image/png">
  <!-- Fonts -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
  <!-- Icons -->
<link rel="stylesheet" href="<?php echo base_url('assets/vendor/nucleo/css/nucleo.css')?>" type="text/css">
<link rel="stylesheet" href="<?php echo base_url('assets/vendor/@fortawesome/fontawesome-free/css/all.min.css')?>" type="text/css">
  <!-- Argon CSS -->
<link rel="stylesheet" href="<?php echo base_url('assets/css/argon.css?v=1.2.0')?>" type="text/css">
  
  <!-- DataTables -->
<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/vendor/datatables/DataTables-1.10.20/css/dataTables.bootstrap4.css')?>"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/vendor/datatables/DataTables-1.10.20/css/jquery.dataTables.css')?>"/>
