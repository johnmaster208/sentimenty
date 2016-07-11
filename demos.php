<?php 
	$demo = isset($_GET['d']) ? $_GET['d'] : '';
?>
<html>
	<head>
		<title>Demo: <?php echo strtoupper($demo)?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css">
		<link rel="stylesheet" href="/css/fontawesome.min.css" type="text/css">
		<link rel="stylesheet" href="/css/styles.css" type="text/css">
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
							<form id="textpool-form-submit" role="form" class="form">
								<div class="form-group col-xs-12">
									<div class="">
										<p class="lead">Instructions: Paste some text in the textarea and click the submit button.<p/>
									</div>
									<div class="">
										<p>OR</p>
									</div>
									<div class="">
										<button id="textpool-generate" class="btn btn-default btn-lg text-uppercase"><i class="fa fa-cog"></i> Generate it</button>
									</div>
								</div>
								<div class="form-group col-xs-12">
									<textarea id="textpool-narrative" name="text" class="form-control input-lg" rows="10" placeholder="Enter text. 5000 character maximum."></textarea>
								</div>
								<div class="form-group col-xs-12">
									<span class="lead">Response format:</span>
									<div class="btn-group" data-toggle="buttons">
									  <label class="btn btn-primary active">
									    <input type="radio" class="radio form-control" name="format" id="textpool-format-json" value="json" autocomplete="off" checked> JSON
									  </label>
									  <label class="btn btn-primary">
									    <input type="radio" class="radio form-control" name="format" id="textpool-format-xml" value="xml" autocomplete="off"> XML
									  </label>
									</div>
									<!-- <div class="">
										<h3 class="lead">Pick your response format:</h3>
										<h3>
											<label class="btn btn-primary" for="textpool-format-json">
												<input id="textpool-format-json" class="radio form-control input-lg" name="format" type="radio" value="json" checked> JSON
											</label>
										</h3>
										<h3>
											<label class="btn btn-primary" for="textpool-format-xml">
												<input id="textpool-format-xml" class="radio form-control input-lg" name="format" type="radio" value="xml"> XML
											</label>
										</h3>
									</div> -->
								</div>
								<div class="form-group col-xs-12">
									<button id="textpool-submit" type="submit" class="btn btn-default btn-lg text-uppercase">
										<i class="fa fa-paper-plane-o"></i> Submit
									</button>
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