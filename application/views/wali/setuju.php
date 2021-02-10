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
    <?php $this->load->view('_partials/topnavWali') ?>

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
              <div class="float-left">
                <h1 class="mb-0">Penyetujuan</h1>
              </div>
            </div>
            <!-- Light table -->

        <div id="reload">
            <div class="table-responsive table-hover">
              <table class="table align-items-center table-flush " id="tabel-absen">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="pr-1" rowspan="2" >No</th>
                    <th scope="col" class="p-0 text-center" rowspan="2">Nama</th>
                    <th scope="col" class="p-0 text-center" rowspan="2">Tanggal Absen</th>
                    <th scope="col" class="text-center" colspan="14">Jam ke</th>
                    <th scope="col" class="p-0 text-center" rowspan="2">Aksi</th>
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
                <tbody class="list" id="show_data">
                  <?php $no=1;
                   foreach ($pengajuan as $siswa ) : ?>
                    <tr id="<?= $siswa['id']?>">
                      <td scope="row" class="pr-1" > <?= $no ?> </td>
                      <td class=" text-center"> <?= $siswa['nama'] ?></td>
                      <td class="p-1 m-1 text-center"><?= $siswa['tgl']?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_1'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_2'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_3'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_4'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_5'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_6'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_7'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_8'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_9'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_10'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_11'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_12'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_13'])?></td>
                      <td class="p-1 m-1 text-center"><?= ucfirst($siswa['jam_14'])?></td>
                      <td  class="p-1 m-0 text-center">
                        <a class="btn btn-sm btn-danger" href="javascript:void(0)" title="Edit" onclick="tidak_setuju(<?= $siswa['id']?>)"><i class="glyphicon glyphicon-pencil"></i> Tidak Setuju</a>
                        <a class="btn btn-sm btn-success" href="javascript:void(0)" title="Edit" onclick="setuju(<?= $siswa['id']?>)"><i class="glyphicon glyphicon-pencil"></i> Setujui</a>
                      </td>
                    </tr>
                  <?php 
                    $no++;
                    endforeach ; ?>
                </tbody>
              </table>
            </div>
          </div>
            <!-- Card footer -->
            <div class="card-footer py-4">
              <nav aria-label="...">
					<i>
						<table>               
			               	<tr>
			               		<td>Ket :</td> 
			   	            	<td><strong>H </strong>= Hadir</td>
			               	</tr>
                      		<tr>
			   	         		  <td></td>
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
    
        function convertDateDBtoIndo(string) 
        {
          bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'];
         
            tanggal = string.split("-")[2];
            bulan = string.split("-")[1];
            tahun = string.split("-")[0];
         
            return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
        }

        function setuju(id)
        {
        	$.ajax({
        				url : "<?= site_url('setuju/setuju')?>/" + id,
				        type: "POST",
				        data: id,
				        dataType: "JSON",
				        success: function(data)
				        {
				            //$('#modal_form').modal('hide');
				            console.log(data);
				            alert('Setujui sukses.');
				            location.reload();

				        },
				        error: function (response)
				        {
				            console.log(response);
				            alert('Error adding / update data');
				        }
        	});
        }

        function tidak_setuju(id)
        {
        	$.ajax({
        				url : "<?= site_url('setuju/tidak_setuju')?>/" + id,
				        type: "POST",
				        data: id,
				        dataType: "JSON",
				        success: function(data)
				        {
				            //$('#modal_form').modal('hide');
				            console.log(data);
				            alert('Tidak Setujui sukses.');
				            location.reload();

				        },
				        error: function (response)
				        {
				            console.log(response);
				            alert('Error adding / update data');
				        }
        	});
        }

		




 				function processAjaxData(response, urlPath)
 				{
     			document.getElementById("content").innerHTML = response.html;
     			document.title = response.pageTitle;
     			window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
 				}			

 				function ChangeUrl(tgl) 	
 				{
    			url = "<?= site_url('edit/tanggal')?>/" + tgl;
					window.location=url;
				}

    $(document).ready( function () {

      
        var table = $('#tabel-absen').DataTable(
          {
                  "ordering":false ,
                  "bInfo": false
          });


			});
			
</script>

<script type="text/javascript">










</body>

</html>
