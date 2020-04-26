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
  <?php $this->load->view('_partials/head') ?>
	<!-- DataTables -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/vendor/datatables/DataTables-1.10.20/css/dataTables.bootstrap4.css')?>"/>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/vendor/datatables/DataTables-1.10.20/css/jquery.dataTables.css')?>"/>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/vendor/datatables.baru/datatables.css')?>"/>

</head>

<body>

	<?php //$this->load->view('_partials/sidenav') ?>
  <!-- Main content -->
  <div class="main-content" id="panel">
    <?php $this->load->view('_partials/topnavPetugas') ?>

    <!-- Header -->
    <div class="header bg-gradient-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <?php $this->load->view('_partials/breadcrumb')?>
            <div class="col-lg-2 text-right">
            	<div class="alert alert-info text-center" role="alert">
    					<strong><?php echo longdate_indo(date('Y-m-d')); ?></strong> 
					</div>
            </div>
          </div>
          <!-- Card stats -->
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Jumlah Siswa Hadir</h5>
                      <span class="h2 font-weight-bold mb-0">33 Siswa</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                        <i class="ni ni-check-bold"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2">100%</span>
                    <span class="text-nowrap">Masuk dari 33 Siswa</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Jumlah Siswa Sakit</h5>
                      <span class="h2 font-weight-bold mb-0">0 Siswa</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                        <i class="ni ni-ambulance"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2">0%</span>
                    <span class="text-nowrap">Siswa Sakit dari 33 siswa</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Jumlah Siswa Izin</h5>
                      <span class="h2 font-weight-bold mb-0">0 Siswa</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                        <i class="ni ni-briefcase-24"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2">0%</span>
                    <span class="text-nowrap">Siswa izin Dari 33 Siswa</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Jumlah Siswa Alfa</h5>
                      <span class="h2 font-weight-bold mb-0">0 Siswa</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                        <i class="fas fa-times"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2">0%</span>
                    <span class="text-nowrap">Siswa Alfa dari 33 Siswa</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--6">
    	 <div class="row">
        <div class="col">
          <div class="card">
            <!-- Card header -->
            <div class="card-header border-0">
              <h3 class="mb-0">Daftar Absen</h3>
             
            </div>
            <!-- Light table -->
            <div class="table-responsive table-hover">
              <table class="table align-items-center table-flush " id="tabel-absen">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="pr-1" rowspan="2" >No</th>
                    <th scope="col" rowspan="2" >NIS / NISN</th>
                    <th scope="col" rowspan="2">Nama</th>
                    <th scope="col" rowspan="2">L/P</th>
                    <th scope="col" class="text-center" colspan="14">Jam ke</th>
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
                <tbody class="list">
                  <tr>
                    <td scope="row" class="pr-1" >
								1               
                    </td>
                    <td class="">
                      	181113892 / 0024426272
                    </td>
                    <td>
                      	Abdul Rozaqi Wildan
                    </td>
                    <td>
                      	L
                    </td>
                    <form>
                      <td class="p-0 m-0 text-center">
                        &#10004;  
                      </td>
                      <td class="p-0 m-0 text-center">
                      	&#10004; 
                      </td>
                      <td class="p-0 m-0 text-center">
                     	  &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                     	  &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                     	  &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                      <td class="p-0 m-0 text-center">
                        &#10004;   
                      </td>
                    </form>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Card footer -->
            <div class="card-footer py-4">
              <nav aria-label="...">
					<i><table>               
               <tr>
	               <td>Ket :</td> 
               
   	            <td><strong>S </strong>= Sakit</td>
               </tr>
   	         <tr>
   	         	<td></td>
   	         	<td><strong>I </strong>= Izin</td>
   	         </tr>	 
               <tr>
               	<td></td>
               	<td><strong>A </strong>= Alfa</td>
               </tr>
               <tr>
               	<td></td>
               	<td><strong>T </strong>= Terlambat</td>
               </tr>
               <tr>
	               <td></td>
	               <td><strong>K </strong>= Kabur</td>
               </tr>
					</table>
					</i>
              </nav>
            </div>
          </div>
        </div>
      </div>
    
      
      <?php $this->load->view('_partials/footer')?>

    </div>
  </div>
  
  <?php
    $this->load->view('_partials/modal');
    $this->load->view('_partials/js');

   ?>
		<!-- DataTables -->
		<script type="text/javascript" charset="utf8" src="<?php echo base_url('assets/vendor/datatables/DataTables-1.10.20/js/jquery.dataTables.js')?>"></script>
		<script type="text/javascript" charset="utf8" src="<?php echo base_url('assets/vendor/datatables/DataTables-1.10.20/js/dataTables.bootstrap4.js')?>"></script>
		<script type="text/javascript" charset="utf8" src="<?php echo base_url('assets/vendor/datatables.baru/datatables.js')?>"></script>

		<script type="text/javascript" >
			$(document).ready( function () {
				
				
				
				$.fn.dataTable.ext.buttons.simpan = {
    			text: 'Simpan',
    			action: function ( e, dt, node, config ) {
						$.ajax({
							type: 'POST',
							url: "aksi.php",
							});


    			}
				};
				
								
		    var table = $('#tabel-absen').DataTable({
					"ordering":false ,
					dom: 'Bfrtip',
        	buttons: [{
            extend:'colvis',text:'Visibilitas Kolom'
          },'simpan']
				});

				
        table.column(1).visible(false);

			});
			
</script>

</body>

</html>
