<?php 
	$demo = isset($_GET['d']) ? $_GET['d'] : '';
?>
<html>
	<head>
		<title>Demo: <?php echo strtoupper($demo)?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css">
		<link rel="stylesheet" href="/css/fontawesome.min.css" type="text/css">
	</head>
  	<body>
	    <div class="container-fluid">
		    <div id="cta" class="jumbotron col-xs-12 col-sm-12 ">
			    <h1 class="text-primary">Demo: <?php echo strtoupper($demo) ?> </h1>
		    </div>
			<?php if($demo == 'textpool') { ?>
				<div class="panel panel-default col-xs-12 col-sm-9 col-md-9 col-lg-9 center-block">
					<div id="textpool-panel" class="">
						<div class="panel-body">
							<form id="textpool-form-submit" role="form" class="form-horizontal">
								<div class="form-group">
									<div class="col-xs-12 col-sm-9 col-md-8">
										<label for="textpool-narrative" class="">
										<span class="lead text-muted">Instructions: Paste some text in the textarea and click the submit button.</span>
										</label>
									</div>
									<div class="col-xs-12 col-sm-3 col-md-4">
										<h3 class="text-info">OR <button id="textpool-generate" class="btn btn-success btn-sm text-uppercase">Generate Text</button></h3>
									</div>
								</div>
								<div class="form-group">
									<textarea id="textpool-narrative" name="text" class="form-control" rows="5" placeholder="Enter text. 5000 character maximum."></textarea>
								</div>
								<div class="form-group form-inline">
									<p class="lead">Pick your response format:</p>
									<div class="well well-lg lead">
										<label for="textpool-format-json">
											<input id="textpool-format-json" class="radio form-control" name="format" type="radio" value="json" checked> JSON
										</label>
										<label for="textpool-format-xml">
											<input id="textpool-format-xml" class="radio form-control" name="format" type="radio" value="xml"> XML
										</label>
									</div>
								</div>
								<div class="form-group">
								<button id="textpool-submit" type="submit" class="btn btn-danger btn-lg">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			<?php } elseif ($demo == '') { ?>
				<p class="lead">No demo specified.</p>
			<?php } else { ?>
				<div class="panel panel-success">
					<div class="panel-heading">
						<h4 class="panel-title">
							No demos at this time. Please check back later for demos!
						</h4>
						<div class="panel-body">
						</div>
					</div>
				</div>
			<?php } ?>
			<div class="navigation col-xs-12 col-sm-12 col-md-9 col-lg-12">
				<a href="/">
				    <button class="btn btn-default btn-lg">
					    <i class="glyphicon glyphicon-menu-left"></i>
					    Back to home
				    </button>
			    </a>
			</div>
		    
		</div>
		<script type="text/javascript" src="/js/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
	    <script type="text/javascript" src="/js/highcharts.min.js"></script>
	    <script type="text/javascript" src="/js/demos.js"></script>
	</body>
</html>