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

<style>
	.no-js #loader { display: none;  }
	.js #loader { display: block; position: absolute; left: 100px; top: 0; }
	.se-pre-con {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background: url(<?php echo base_url('assets/Preloader_2.gif')?>) center no-repeat #fff;
}

	@media screen and (min-width: 768px) {
        .modal-edit {
          width: 700px; /* New width for default modal */
        }
        .modal-kecil {
          width: 350px; /* New width for small modal */
        }
    }

    @media screen and (min-width: 992px) {
        .modal-gede {
          width: 950px; /* New width for large modal */
        }
    }

</style>  
<div class="se-pre-con"></div>  

