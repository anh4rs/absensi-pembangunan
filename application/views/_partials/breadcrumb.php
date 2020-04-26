<div class="col-lg-10 col-10">
	<h6 class="h2 text-white d-inline-block mb-0">Default</h6>
    <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
    	<ol class="breadcrumb breadcrumb-links breadcrumb-dark">
    		<?php foreach ($this->uri->segments as $segment): ?>
			<?php 
				$url = substr($this->uri->uri_string, 0, strpos($this->uri->uri_string, $segment)) . $segment;
				$is_active =  $url == $this->uri->uri_string;
			?>
    		<li class="breadcrumb-item <?php echo $is_active ? 'active': '' ?>">
				<?php if($is_active): ?>
				<?php echo ucfirst($segment) ?>
				<?php else: ?>
				<a href="<?php echo site_url($url) ?>"><?php echo ucfirst($segment) ?></a>
				<?php endif; ?>
			</li>
			<?php endforeach; ?>
   		</ol>
    </nav>
</div>