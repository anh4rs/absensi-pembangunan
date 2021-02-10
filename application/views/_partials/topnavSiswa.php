<nav class="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-gradient-primary">
    <div class="container">
        <a class="navbar-brand" href="#">                            
          <img src="<?php echo base_url('assets/img/brand/smkn1-brand.png') ?>">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-default">
            <div class="navbar-collapse-header">
                <div class="row">
                    <div class="col-6 collapse-brand">
                        <a href="javascript:void(0)">
                            <img src="<?php echo base_url('assets/img/brand/smkn1-brand-blue.png') ?>">
                        </a>
                    </div>
                    <div class="col-6 collapse-close">
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            
            <ul class="navbar-nav ml-lg-auto">    
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="<?php echo site_url('beranda') ?>">
                        <i class="fas fa-home"></i>
                        <span class="nav-link-inner--text d-lg-none">Dashboard</span>
                    </a>
                </li>
              
                <li class="nav-item dropdown">
                    <a class="nav-link nav-link-icon" href="#" id="navbar-default_dropdown_2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="ni ni-single-02"></i>
                  <span class="nav-link-inner--text d-lg-none">Saya</span>
                </a>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-default_dropdown_2">
                        <a class="dropdown-item" href="<?php echo site_url('profil') ?>">Profil Saya</a>
                    </div>
                </li>
            </ul>



           


          <ul class="navbar-nav  ml-auto ml-md-0 ">
            
              


            <li class="nav-item dropdown">
              <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="media align-items-center">
                  
                  <div class="media-body  mr-2">
                    <span class="mb-0 text-sm  font-weight-bold"><?php echo $user->nama; ?></span>
                  </div>
                </div>
              </a>
              <div class="dropdown-menu  dropdown-menu-right ">
              
                <a  data-toggle="modal" data-target="#logoutModal" href="#!" class="dropdown-item">
                  <i class="ni ni-user-run"></i>
                  <span>Keluar</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
    </div>
</nav>
