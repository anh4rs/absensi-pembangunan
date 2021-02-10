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
    <?php $this->load->view('_partials/topnavSiswa') ?>

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
              <h1 class="mb-0">Daftar Absen</h1>
              </div>
              <div class="float-right">
              </div>
            </div>
            <!-- Light table -->
            <div class="table-responsive table-hover">
              <table class="table align-items-center table-flush " id="tabel-absen">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="p-0 text-center" rowspan="2" >No</th>
                    <th scope="col" class="p-0 text-center" rowspan="2" >Tanggal</th>
                    <th scope="col" class="p-0 text-center" colspan="14">Jam ke</th>
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
                   <?php $no=1;
                   foreach ($absen as $siswa ) : ?>
                    <tr>
                      <td class="p-1 m-0 text-center" > <?= $no ?> </td>
                      <td class="p-0 m-1 "> <?= longdate_indo($siswa['tgl']) ?></td>
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
                    </tr>
                  <?php 
                    $no++;
                    endforeach ; ?>
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
      function ChangeUrl(tgl)   
        {
          url = "<?= site_url('laporan/tanggal')?>/" + tgl;
          window.location=url;
        }

      $(document).ready( function () {
        $('#tabel-hadir').dataTable();
        $('#tabel-sakit').dataTable();
        $('#tabel-izin').dataTable();
        $('#tabel-alfa').dataTable();
        $( "input[name='tgl_absen']" ).change(function() {
          var tgl=$( "input[name='tgl_absen']" ).val();
          ChangeUrl(tgl);
        });
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
          buttons: [
          {
            extend:'colvis',text:'Visibilitas Kolom'
          }
          
            ]
        });

        

      });
      
</script>

</body>

</html>
