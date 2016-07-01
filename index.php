<?php ?>
<html>
	<head>
		<title>Sentimenty</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css">
		<link rel="stylesheet" href="/css/fontawesome.min.css" type="text/css">
	</head>
  	<body>
	    <div class="container-fluid">
		    <div id="cta" class="jumbotron col-xs-12 col-sm-12 col-md-12">
			    <h1 class="text-primary">Sentimenty</h1>
			    <h4 class="text-muted">learning the emotional web</h4>
		    </div>
		    <div class="intro col-xs-12 col-sm-12 col-md-12">
		      <h2>What is it?</h2>
		      <p>Sentimenty is a service that learns emotion (<em>or, sentiment</em>) out of text.</p>
		      <h2>How does it work?</h2>
		      <p>Through generic POST requests to the following endpoint(s):</p>
		    </div>
		    <div class="service col-xs-12 col-sm-9">
		      <section id="service-textpool" class="well well-sm row">
			        <div class="details col-xs-12 col-sm-12">
			           <h3>Textpool</h3>
	  			      <p class="text-muted"> - returns the emotional significance (or "e-sig" for short) of the text.</p>
	  			      <h4 class="lead"><code>/s/textpool/params</code></h4> 
			        </div>
		  	      	<div class="list-group col-xs-12 col-sm-12">
		              <a href="#" class="list-group-item active">
		                params
		              </a>
		              <a href="#" class="list-group-item">
		                <h4>text</h4>
		                <p class="small text-muted"> - <strong>Required.</strong> The submitted text or payload for processing any sentiments.</p>
		              </a>
		              <a href="#" class="list-group-item">
		                <h4>format</h4>
		                <p class="small text-muted"> - Optional. The submitted text or payload for processing any sentiments.</p>
		              </a>
		            </div>
		            <div class="cta col-xs-12 col-sm-12">
			            <a href="/demo/textpool">
			              <button class="btn btn-md btn-primary">Try it out!</button>
		              </a>
	        	  	</div>	</section>
        	</div>
	      	<div class="nauseam col-xs-12 col-sm-12">
	        	<h2>Why did you name it Sentimenty?</h2>
		      	<p>Mostly because the Sentiment.ly domain was taken already, but also because EmotionAPI sounded a little boring and too "Dashboard Confessionally"</p>
	      	</div>
	    </div>
	    <script type="text/javascript" src="/js/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
	    <script type="text/javascript" src="/js/demos.js"></script>
	</body>
</html>