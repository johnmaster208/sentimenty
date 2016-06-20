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
			<h2>Textpool Demo</h2>
			<div class="well well-lg">
				<form role="form" action="" class="form-horizontal">
					<div class="form-group pull-right">
					<small class="text-muted"><em>Don't have any text?</em></small>
					<button class="btn btn-success btn-sm">Generate It!</button>
					</div>
					<div class="form-group">
					<label for="textpool-narrative">Paste your text here:</label>
					<textarea name="textpool-narrative" class="form-control" rows="5" placeholder="Enter text. 5000 character maximum."></textarea>
					</div>
					<div class="form-group">
					<button id="textpool-submit" type="submit" class="btn btn-primary btn-lg">Submit</button>
					</div>
					
				</form>
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
	</body>
</html>