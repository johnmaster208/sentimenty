<?php
?>
<html>
<head>
	<title>Sentimenty</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
</head>
  	<body>
	    <div class="container-fluid">
		    <div id="cta" class="jumbotron">
			    <h1 class="text-primary">Sentimenty</h1>
			    <h4 class="text-muted">learning the emotional web</h4>
		    </div>
		    
		    <h2>What is it?</h2>
		    <div class="well well-lg">
		      <p>
		        Sentimenty is a service that learns emotion (<em>or, sentiment</em>) out of text.
		      </p>
		    </div>
		    
		    <h2>How does it work?</h2>
		     <p>Through generic POST requests to the following endpoint(s):</p>
		    <div class="well well-lg">
		      <h4>Textpool</h4>
		      <p class="text-muted">textpool returns the emotional significance (or "e-sig" for short) of the text, broken into a distribution and ranked by an index.</p>
		      <h5>Usage</h5>
		      <code class="lead">/s/textpool/[text]</code>
		    </div>
		    <div class="well well-lg">
		      <h4>Textprobe</h4>
		      <h5>COMING SOON!</h5>
		    </div>
		    <div class="well well-lg">
		      <h4>Textpluck</h4>
		      <h5>COMING SOON!</h5>
		    </div>

		    <div class="well well-lg">
		      <h4>Textplot</h4>
		      <h5>COMING SOON!</h5>
		    </div>
	  
	      	<h2>Why did you name it Sentimenty?</h2>
		    <div class="well">
		      <p>
		        Mostly because the Sentiment.ly domain was taken already, but also because EmotionAPI sounded a little boring and too "Dashboard Confessionally"
		      </p>
		    </div>
		    <h2>Ok, enough!</h2>
		    <div class="well">
		      <p>
		        Demo time? 
		        <div class="cta">
		        <a href="/demos.php"><button class="btn btn-lg btn-primary">Try it out!</button></a>
		        </div>
		      </p>
		    </div>
	    </div>
	    <script type="text/javascript" src="js/jquery.min.js"></script>
	    <script type="text/javascript" src="js/bootstrap.min.js"></script>
	</body>
</html>
