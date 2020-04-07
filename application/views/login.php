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
                  <form>
                    <div class="form-group mb-3">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                        </div>
                        <input class="form-control" id="username" name="username" placeholder="Nama Pengguna" type="text">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input class="form-control" name="password" id="password" placeholder="Kata Sandi" type="password">
                      </div>
                    </div>
                    <div class="custom-control custom-control-alternative custom-checkbox">
                      <input class="custom-control-input"  id=" customCheckLogin" type="checkbox">
                      <label class="custom-control-label" for=" customCheckLogin">
                        <span class="text-muted">Ingat saya</span>
                      </label>
                    </div>
                  </form>
                    <div class="text-center">
                      <button   class="btn btn-login btn-primary my-4"><i class="fas fa-sign-in-alt"></i> Masuk</button>
                    </div>
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.all.min.js"></script>

  <!-- Argon JS -->
  <script src="<?php echo base_url('assets/js/argon.js?v=1.2.0') ?>"></script>
  <script src="<?php echo base_url('assets/js/jquery.md5.js') ?>"></script>

	<script>
		$(document).ready(function(){
			$(".se-pre-con").fadeOut(2000);
		  

        $(".btn-login").click( function() {

          var username = $("#username").val();
          var password = $("#password").val();
          var enkripsi = $.md5(password);

          if(username.length == "") {
            Swal.fire({
              type: 'warning',
              title: 'Oops...',
              text: 'Nama Pengguna Wajib Diisi !'
            });

          } else if(password.length == "") {

            Swal.fire({
              type: 'warning',
              title: 'Oops...',
              text: 'Kata Sandi Wajib Diisi !'
            });

          } else {

            $.ajax({

              url: "<?php echo site_url('login/cek_login')?>",
              type: "POST",
              data: {
                  "username": username,
                  "password": enkripsi
              },

              success:function(response){

                if (response == "success") {

                  Swal.fire({
                    type: 'success',
                    title: 'Login Berhasil!',
                    text: 'Anda akan di arahkan dalam 3 Detik',
                    timer: 3000,
                    showCancelButton: false,
                    showConfirmButton: false
                  })
                  .then (function() {
                    window.location.href = "<?php echo site_url('/beranda')?>";
                  });

                } else {

                  Swal.fire({
                    type: 'error',
                    title: 'Login Gagal!',
                    text: 'Nama Pengguna atau Kata Sandi salah!'
                  });


                }

                console.log(response);

              },

              error:function(response){

                  Swal.fire({
                    type: 'error',
                    title: 'Opps!',
                    text: 'server error!'
                  });

                  console.log(response);

              }

            });

          }

        }); 


    });
</script>
</body>

</html>
