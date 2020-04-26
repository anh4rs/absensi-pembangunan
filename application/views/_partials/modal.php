<!-- Logout Delete Confirmation-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
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



    <div class="modal fade" id="modal_status"  role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="max-width: 995px;" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Riwayat Pengeditan</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
          	<div class="row">
          		<label class="control-label col-md-3">Nama</label>
				<div class="col-md-9" id="nama"></div>

          	</div>
          	<div class="row">
          		<table class="table align-items-center table-flush " id="tabel-riwayat">
          			<thead>
          				<tr>
          					<th scope="col" rowspan="2">Waktu</th>
                    		<th scope="col" class="text-center" colspan="14">Jam ke</th>
                    		<th scope="col" class="p-0 text-center" rowspan="2">Status</th>
						</tr>
						<tr>
							<th scope="col" class="p-0 m-0 text-center">1</th>
                    		<th scope="col" class="p-0 m-0 text-center">2</th>
		                    <th scope="col" class="p-0 m-0 text-center">3</th>
		                    <th scope="col" class="p-0 m-0 text-center">4</th>
		                    <th scope="col" class="p-0 m-0 text-center">5</th>
		                    <th scope="col" class="p-0 m-0 text-center">6</th>
		                    <th scope="col" class="p-0 m-0 text-center">7</th>
		                    <th scope="col" class="p-0 m-0 text-center">8</th>
		                    <th scope="col" class="p-0 m-0 text-center">9</th>
		                    <th scope="col" class="p-0 m-0 text-center">10</th>
		                    <th scope="col" class="p-0 m-0 text-center">11</th>
		                    <th scope="col" class="p-0 m-0 text-center">12</th>
		                    <th scope="col" class="p-0 m-0 text-center">13</th>
		                    <th scope="col" class="p-0 m-0 text-center">14</th>
						</tr>          			
          			</thead>
          			<tbody id="isi-riwayat">
          				
          			</tbody>
          		</table>
          			<div id="bawah" class="text-center m-auto"></div>
          	</div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bootstrap modal -->
<div class="modal fade" id="modal_form" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Absensi</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
        </button>
            </div>
            <div class="modal-body form">
                <form action="#" id="form" class="form-horizontal">
                    <input type="hidden" value="" name="id_kehadiran"/> 
                    <div class="form-body">
                        <div class="form-group">
                            <label class="control-label col-md-3">Nama</label>
                            <div class="col-md-12">
                                <input name="nama" disabled class="form-control" type="text">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Tanggal</label>
                            <div class="col-md-12">
                                <input name="tgl"  type="hidden">
                                <input name="tgl_tampil" placeholder="Tanggal" disabled class="form-control" type="text">
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6 text-center">
                        <div class="form-group ">
                            <label class="control-label col-md-6">Jam ke-1</label>
                            <div class=" col-md-6 m-auto ">
                              <select class=" form-control-sm"  name="jam_1">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>                                 
                            <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="control-label col-md-6">Jam ke-2</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_2">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-3</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_3">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-4</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_4">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-5</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_5">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-6</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_6">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-7</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_7">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6 text-center">
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-8</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_8">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-9</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_9">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-10</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_10">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>     
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-11</label>
                            <div class="col-md-6 m-auto">
                            <select class=" form-control-sm"  name="jam_11">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>    
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-12</label>
                            <div class="col-md-6 m-auto">
                               <select class=" form-control-sm"  name="jam_12">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>    
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-13</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_13">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>    
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-6">Jam ke-14</label>
                            <div class="col-md-6 m-auto">
                                <select class=" form-control-sm"  name="jam_14">      
                                  <option  value="">..</option>
                                <option  value="h">H</option>                             
                                <option  value="s">S</option>
                                <option  value="a">A</option>
                                <option  value="i">I</option>
                            </select>    
                                <span class="help-block"></span>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnSave" onclick="save()" class="btn btn-primary">Edit</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Batal</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- End Bootstrap modal -->

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
	
	
  