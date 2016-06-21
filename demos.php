<?php ?>
<html>
	<head>
		<title>Sentimenty: Demos</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
	</head>
  	<body>
	    <div class="container-fluid">
		    <div id="cta" class="jumbotron">
			    <h1 class="text-primary">Sentimenty: Demos</h1>
		    </div>
			<div id="demo-accordion" class="panel-group">
				<div class="panel panel-success">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a role="button" data-toggle="collapse" data-parent="#demo-accordion" href="#collapseTextPool" aria-expanded="true" aria-controls="collapseTextPool">Textpool</a>
						</h4>
						<div id="collapseTextPool" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="collapseTextPool">
							<div class="panel-body">
								<div class="well well-lg">
									<form id="textpool-form-submit" role="form" action="demos.php" class="form-horizontal">
										<div class="form-group row">
											<div class="col-md-10">
												<label for="textpool-narrative"><small class="text-muted">Instructions: Paste some text in the textarea and click the submit button.</small></label>
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
					</div>
				</div>
			</div>

		    <a href="/index.php">
			    <button class="btn btn-primary">
				    <i class="glyphicon glyphicon-menu-left"></i>
				    Back to home
			    </button>
		    </a>
		</div>
		<script type="text/javascript" src="js/jquery.min.js"></script>
	    <script type="text/javascript" src="js/bootstrap.min.js"></script>
	    <script type="text/javascript" src="js/demos.js"></script>
	</body>
</html>