<!-- Logout Delete Confirmation-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
		<h5 class="modal-title" id="exampleModalLabel">Kamu Yakin Akan Keluar?</h5>
		<button class="close" type="button" data-dismiss="modal" aria-label="Close">
		  <span aria-hidden="true">×</span>
		</button>
	      </div>
	      <div class="modal-body"></div>
	      <div class="modal-footer">
		<button class="btn btn-secondary" type="button" data-dismiss="modal">Batal</button>
		<a class="btn btn-danger" href="<?php echo site_url('logout') ?>">Keluar</a>
	      </div>
	    </div>
	  </div>
	</div>
    

  <!-- modal universal -->
  <div class="modal fade" id="modal_tengah">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-gradient-secondary">
      
        <!-- Ini adalah Bagian Header Modal -->
        <div class="modal-header">
          <h4 class="modal-title">Tentang saya</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Ini adalah Bagian Body Modal -->
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-sm-4">
                <img class="img-fluid rounded-circle" src="<?php echo base_url('assets/img/aboutus/saya.jpg')?>">
              </div>
              <div class="col-sm-8">
                <p>
                  Nama saya Robi Setia Permadi. Anak Bungsu dari 4 bersaudara.
                  Hobi saya adalah main.
                  Saya sekolah jurusan Sistem Informatika Jaringan dan Aplikasi di SMK Negeri 1 Cimahi

                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Ini adalah Bagian Footer Modal -->
        <div class="modal-footer">
              <a class="nav-link nav-link-icon" href="https://www.instagram.com/robisetiap" target="_blank" data-toggle="tooltip" data-original-title="Follow us on Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="nav-link nav-link-icon" href="https://github.com/robisetiapermadi" target="_blank" data-toggle="tooltip" data-original-title="Star us on Github">
                <i class="fab fa-github"></i>
              </a>
            
        </div>
        
      </div>
    </div>
  </div>    
	
	
    

    