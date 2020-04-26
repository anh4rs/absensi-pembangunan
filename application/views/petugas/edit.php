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
              <div class="float-right">
								<label class="control-label">Tanggal : </label>
            		<select name="tgl_absen" class="form-control-sm">

            			<?php
            			if ($this->uri->segment(3)) $tgl_dipilih = $this->uri->segment(3);
            			else $tgl_dipilih = date("Y-m-d");  
            			foreach ($tgl_absen as $tgl) { ?>
            				<option  <?= $pilih = $tgl_dipilih== $tgl['tgl'] ? "selected" : ""?> value="<?= $tgl['tgl'] ?>"><?= longdate_indo($tgl['tgl']) ?></option>
            			<?php } ?>
            		</select>
            	</div>
            </div>
            <!-- Light table -->

        <div id="reload">
            <div class="table-responsive table-hover">
              <table class="table align-items-center table-flush " id="tabel-absen">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="pr-1" rowspan="2" >No</th>
                    <th scope="col" rowspan="2" >NIS / NISN</th>
                    <th scope="col" class="p-0 text-center" rowspan="2">Nama</th>
                    <th scope="col" rowspan="2">L/P</th>
                    <th scope="col" class="text-center" colspan="14">Jam ke</th>
                    <th scope="col" class="p-0 text-center" rowspan="2">Status</th>
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
                   foreach ($absen as $siswa ) : ?>
                    <tr>
                      <td scope="row" class="pr-1" > <?= $no ?> </td>
                      <td> <?=$siswa['nis']." / ".$siswa['nisn']?></td>
                      <td> <?= $siswa['nama'] ?></td>
                      <td> <?php echo  $siswa['jk']?></td>
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
                      <td  class="p-1 m-0 text-center"><a class="btn btn-sm btn-primary" href="javascript:void(0)" title="Riwayat edit" onclick="lihat_riwayat(<?= $siswa['id_kehadiran']?>)"><i class="glyphicon glyphicon-pencil"></i> Riwayat edit</a></td>
                      <td  class="p-1 m-0 text-center"><a class="btn btn-sm btn-primary" href="javascript:void(0)" title="Edit" onclick="edit_petugas(<?= $siswa['id_kehadiran']?>)"><i class="glyphicon glyphicon-pencil"></i> Edit</a></td>
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
    
function convertDateDBtoIndo(string) {
  bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'];
 
    tanggal = string.split("-")[2];
    bulan = string.split("-")[1];
    tahun = string.split("-")[0];
 
    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}



    function edit_petugas(id)
{
    save_method = 'update';
    $('#form')[0].reset(); // reset form on modals

    //Ajax Load data from ajax
    $.ajax({
        url : "<?php echo site_url('edit/ajax_edit/')?>/" + id,
        type: "GET",
        dataType: "JSON",
        success: function(data)
        {
            $('[name="id_kehadiran"]').val(data.id_kehadiran);
            $('[name="nama"]').val(data.nama);
            $('[name="tgl"]').val(data.tgl);
            $('[name="tgl_tampil"]').val(convertDateDBtoIndo(data.tgl));
            $('[name="jam_1"]').val(data.jam_1);
            $('[name="jam_2"]').val(data.jam_2);
            $('[name="jam_3"]').val(data.jam_3);
            $('[name="jam_4"]').val(data.jam_4);
            $('[name="jam_5"]').val(data.jam_5);
            $('[name="jam_6"]').val(data.jam_6);
            $('[name="jam_7"]').val(data.jam_7);
            $('[name="jam_8"]').val(data.jam_8);
            $('[name="jam_9"]').val(data.jam_9);
            $('[name="jam_10"]').val(data.jam_10);
            $('[name="jam_11"]').val(data.jam_11);
            $('[name="jam_12"]').val(data.jam_12);
            $('[name="jam_13"]').val(data.jam_13);
            $('[name="jam_14"]').val(data.jam_14);
            $('#modal_form').modal('show'); // show bootstrap modal when complete loaded

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert('Error get data from ajax');
        }
    });
} 

		function lihat_riwayat(id)
		{
		    $.ajax({
		        url : "<?php echo site_url('edit/ajax_riwayat/')?>/" + id,
		        type: "GET",
		        dataType: "JSON",
		        success: function(data)
		        {
								$( ".isi-isi" ).remove();								 
								$( "#kosong" ).remove();								 

		            if(data!=""){
		        		console.log(data);
		            $('#nama').text(data[0].nama);

		      			$.each(data, function( index, value ) {
		      				if(value.waktu!=null){
		      					if(value.status==1) var status = "Disetujui";
		      					else if (value.status==2) var status ="Tidak Disetujui";
		      					else var status = "Belum Disetujui";
		      				var html = 	"<tr class='isi-isi p-0 m-0 text-center'>" +
          										"<td >"+ value.waktu +"</td>" +
          										"<td>"+ value.jam_1.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_2.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_3.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_4.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_5.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_6.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_7.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_8.toUpperCase() +"</td>" +
  	        									"<td>"+ value.jam_9.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_10.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_11.toUpperCase() +"</td>" +
          										"<td>"+ value.jam_12.toUpperCase() +"</td>" +
 	         										"<td>"+ value.jam_13.toUpperCase() +"</td>" +
 	         										"<td>"+ value.jam_14.toUpperCase() +"</td>" +
          										"<td>"+ status +"</td></tr>" ;
									$( "#isi-riwayat" ).append(html);
									}
									else $( "#bawah" ).append("<div class='alert alert-secondary' id='kosong'> Data riwayat kosong </div>"); 								 
								});

		            	}
		            	$('#modal_status').modal('show'); // show bootstrap modal when complete loaded

		            			
		            	//var tabel = $('#tabel-riwayat').DataTable();
		        },
		        error: function (jqXHR, textStatus, errorThrown)
		        {
		            alert('Error get data from ajax');
		        }
		    });
		}


function save()
{
    $('#btnSave').text('Memproses...'); //change button text
    $('#btnSave').attr('disabled',true); //set button disable 
    var url;
    url = "<?php echo site_url('edit/ajax_update')?>";
    
    // ajax adding data to database
    $.ajax({
        url : url,
        type: "POST",
        data: $('#form').serialize(),
        dataType: "JSON",
        success: function(data)
        {
            //$('#modal_form').modal('hide');
            console.log(data);
            alert('Edit sukses. Menunggu konfirmasi Wali Kelas');
            $('#btnSave').text('Edit'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable 


        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert('Error adding / update data');
            $('#btnSave').text('Edit'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable 

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
    			url = "<?= site_url('edit/index')?>/" + tgl;
					window.location=url;
				}

    $(document).ready( function () {  

    	$( "select[name='tgl_absen']" ).change(function() {
				var tgl=$( "select[name='tgl_absen']" ).val();
				ChangeUrl(tgl);
 			});

      
        var table = $('#tabel-absen').DataTable(
          {
                  "ordering":false ,
                  dom: 'Bfrtip',
                  buttons: [{
                        extend:'colvis',text:'Visibilitas Kolom'
                      }]
          });


        table.column(1).visible(false);








			});
			
</script>

<script type="text/javascript">










</body>

</html>
