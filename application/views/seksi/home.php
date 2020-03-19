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
</head>

<body>
  <?php //$this->load->view('_partials/sidenav') ?>
  <!-- Main content -->
  <div class="main-content" id="panel">
    <?php $this->load->view('_partials/topnav') ?>

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
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_1">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_2">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_3">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_4">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_5">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_6">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_7">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_8">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_9">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_10">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_11">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_12">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_13">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    <td class="m-0 p-1">
                     	<select class=" form-control-sm" name="1_14">
                     		<option >..</option>
                     		<option value="s">S</option>
                     		<option value="i">I</option>
                     		<option value="a">A</option>
                     		<option value="t">T</option>
                     		<option value="k">K</option>
                     	</select> 
                    </td>
                    
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
      <div class="row">
        <div class="col-xl-8">
          <div class="card bg-default">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 class="h3 text-white mb-0">Sales value</h5>
                </div>
                <div class="col">
                  <ul class="nav nav-pills justify-content-end">
                    <li class="nav-item mr-2 mr-md-0" data-toggle="chart" data-target="#chart-sales-dark" data-update='{"data":{"datasets":[{"data":[0, 20, 10, 30, 15, 40, 20, 60, 60]}]}}' data-prefix="$" data-suffix="k">
                      <a href="#" class="nav-link py-2 px-3 active" data-toggle="tab">
                        <span class="d-none d-md-block">Month</span>
                        <span class="d-md-none">M</span>
                      </a>
                    </li>
                    <li class="nav-item" data-toggle="chart" data-target="#chart-sales-dark" data-update='{"data":{"datasets":[{"data":[0, 20, 5, 25, 10, 30, 15, 40, 40]}]}}' data-prefix="$" data-suffix="k">
                      <a href="#" class="nav-link py-2 px-3" data-toggle="tab">
                        <span class="d-none d-md-block">Week</span>
                        <span class="d-md-none">W</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Chart -->
              <div class="chart">
                <!-- Chart wrapper -->
                <canvas id="chart-sales-dark" class="chart-canvas"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="card">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                  <h5 class="h3 mb-0">Total orders</h5>
                </div>
              </div>
            </div>
            <div class="card-body">
              <!-- Chart -->
              <div class="chart">
                <canvas id="chart-bars" class="chart-canvas"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Page visits</h3>
                </div>
                <div class="col text-right">
                  <a href="#!" class="btn btn-sm btn-primary">See all</a>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      /argon/
                    </th>
                    <td>
                      4,569
                    </td>
                    <td>
                      340
                    </td>
                    <td>
                      <i class="fas fa-arrow-up text-success mr-3"></i> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      /argon/index.html
                    </th>
                    <td>
                      3,985
                    </td>
                    <td>
                      319
                    </td>
                    <td>
                      <i class="fas fa-arrow-down text-warning mr-3"></i> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      /argon/charts.html
                    </th>
                    <td>
                      3,513
                    </td>
                    <td>
                      294
                    </td>
                    <td>
                      <i class="fas fa-arrow-down text-warning mr-3"></i> 36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      /argon/tables.html
                    </th>
                    <td>
                      2,050
                    </td>
                    <td>
                      147
                    </td>
                    <td>
                      <i class="fas fa-arrow-up text-success mr-3"></i> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      /argon/profile.html
                    </th>
                    <td>
                      1,795
                    </td>
                    <td>
                      190
                    </td>
                    <td>
                      <i class="fas fa-arrow-down text-danger mr-3"></i> 46,53%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="card">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Social traffic</h3>
                </div>
                <div class="col text-right">
                  <a href="#!" class="btn btn-sm btn-primary">See all</a>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Facebook
                    </th>
                    <td>
                      1,480
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="mr-2">60%</span>
                        <div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Facebook
                    </th>
                    <td>
                      5,480
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="mr-2">70%</span>
                        <div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width: 70%;"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Google
                    </th>
                    <td>
                      4,807
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="mr-2">80%</span>
                        <div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-primary" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Instagram
                    </th>
                    <td>
                      3,678
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="mr-2">75%</span>
                        <div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%;"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      twitter
                    </th>
                    <td>
                      2,645
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="mr-2">30%</span>
                        <div>
                          <div class="progress">
                            <div class="progress-bar bg-gradient-warning" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%;"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
</body>

</html>