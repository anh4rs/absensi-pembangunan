<!--
=========================================================
* Argon Dashboard - v1.2.0
=========================================================
* Product Page: https://www.creative-tim.com/product/argon-dashboard

* Copyright  Creative Tim (http://www.creative-tim.com)
* Coded by www.creative-tim.com
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<!DOCTYPE html>
<html>

<head>
	<?php $this->load->view("_partials/head") ?>
</head>

<body class="bg-gradient-primary d-flex flex-column h-100">
  <!-- Navbar -->
  <nav id="navbar-main" class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand" href="<?php echo site_url('login')  ?>">
        <img src="<?php echo base_url('assets/img/brand/smkn1-brand.png')?>">
      </a>
    </div>
  </nav>
  <!-- Main content -->
  <div role="main" class="main-content flex-shrink-0">
    <!-- Header -->
    <div class="header  pt-7 pt-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center ">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">

              <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
 
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <h1 class="text-white">Selamat Datang!</h1>
                    <p class="text-lead text-white" >Di Aplikasi Absensi Pembangunan.</p>
                  </div>
                  <div class="carousel-item">
                    <h1 class="text-white">Wilujeung Sumping!</h1>
                    <p class="text-lead text-white" >Di Aplikasi Absensi Pembangunan.</p>
                  </div>
                  <div class="carousel-item">
                    <h1 class="text-white">Welcome!</h1>
                    <p class="text-lead text-white" >to the Pembangunan attendance application</p>
                  </div>
                </div>  
              </div>
                <button type="button" class="btn btn-lg btn-block btn-default mt-5" data-toggle="modal" data-target="#modal-form"><i class="fas fa-sign-in-alt"></i>
                  Masuk</button>
            </div>

          </div>

        </div>
      </div>
    </div>


    
    <!-- Modal Login -->
   
      <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
        <div class="modal-dialog modal- modal-dialog-centered modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="card bg-secondary border-0 mb-0">
                <div class="card-body px-lg-5 py-lg-5">
                  <div class="text-center text-muted mb-4">
                    <small>Login Pengguna</small>
                  </div>
                  <form role="form">
                    <div class="form-group mb-3">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                        </div>
                        <input class="form-control" placeholder="Nama Pengguna" type="text">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input class="form-control" placeholder="Kata Sandi" type="password">
                      </div>
                    </div>
                    <div class="custom-control custom-control-alternative custom-checkbox">
                      <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                      <label class="custom-control-label" for=" customCheckLogin">
                        <span class="text-muted">Ingat saya</span>
                      </label>
                    </div>
                    <div class="text-center">
                      <button type="button" class="btn btn-primary my-4"><i class="fas fa-sign-in-alt"></i> Masuk</button>
                    </div>
                  </form>
                  <div class="col-6">
                    <a href="#" class="text-light"><small>Forgot password?</small></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

 <?php $this->load->view('_partials/footer')?>


  <!-- Argon Scripts -->
  <!-- Core -->
  <script src="<?php echo base_url('assets/vendor/jquery/dist/jquery.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/js/popper/popper.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/vendor/bootstrap/dist/js/bootstrap.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js')?>"></script>
  <script src="<?php echo base_url('assets/vendor/js-cookie/js.cookie.js') ?>"></script>
  <script src="<?php echo base_url('assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js') ?>"></script>
  <!-- Argon JS -->
  <script src="<?php echo base_url('assets/js/argon.js?v=1.2.0') ?>"></script>
</body>

</html>