<?php 
	$demo = isset($_GET['d']) ? $_GET['d'] : '';
?>
<html>
	<head>
		<title>Demo: <?php echo strtoupper($demo)?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css">
	</head>
  	<body>
	    <div class="container-fluid">
		    <div id="cta" class="jumbotron">
			    <h1 class="text-primary">Demo: <?php echo strtoupper($demo) ?> </h1>
		    </div>

			<?php if($demo == 'textpool') { ?>
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="well well-lg">
							<form id="textpool-form-submit" role="form" class="form-horizontal">
								<div class="form-group row">
									<div class="col-md-10">
										<label for="textpool-narrative">
											<small class="text-muted">Instructions: Paste some text in the textarea and click the submit button.</small>
										</label>
									</div>
									<div class="col-md-2">
										<small class="text-muted"><em>Don't have any text?</em></small>
										<button id="textpool-generate" class="btn btn-success btn-sm">Generate It!</button>
									</div>
								</div>
								<div class="form-group">
									<textarea id="textpool-narrative" name="textpool" class="form-control" rows="5" placeholder="Enter text. 5000 character maximum."></textarea>
								</div>
								<div class="form-group">
								<button id="textpool-submit" type="submit" class="btn btn-primary btn-sm">Submit</button>
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
		    <a href="/">
			    <button class="btn btn-primary">
				    <i class="glyphicon glyphicon-menu-left"></i>
				    Back to home
			    </button>
		    </a>
		</div>
		<script type="text/javascript" src="/js/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
	    <script type="text/javascript" src="/js/demos.js"></script>
	</body>
</html>