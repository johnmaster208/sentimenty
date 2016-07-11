<?php ?>
<html>
	<head>
		<title>Sentimenty</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css">
		<link rel="stylesheet" href="/css/fontawesome.min.css" type="text/css">
		<link rel="stylesheet" href="/css/styles.css" type="text/css">
	</head>
  	<body>
	    <div class="container-fluid">
		    <div id="cta" class="jumbotron col-xs-12 col-sm-12 col-md-12">
			    <h1 class="text-primary">Sentimenty</h1>
			    <h4 class="text-muted">learning the emotional web</h4>
		    </div>
		    <div class="intro col-xs-12 col-sm-12 col-md-12">
		      	<h2>What is it?</h2>
		      	<p>Sentimenty is free service that discovers emotion (<em>sentiment</em>) from text. Through the usage of natural language processing (NLP), it gathers sentimental value from keywords and returns their emotional density and distribution in friendly formats, like JSON and XML.</p>
	      	</div>
	      	<div class="nauseam col-xs-12 col-sm-12 col-md-12">
	        	<h2>Why did you name it Sentimenty?</h2>
		      	<p>Why not? Half of the internet is basically full of harebrained domains/subdomains ending in 'y', 'ly', 'ley', 'ic' and 'er'. I figured since sentiment.ly was already taken, I could make ends meet. Also, EmotionAPI sounded kind of lame, and a little too Dashboard Confessional(.ly)</p>
	      	</div>
	      	<div class="desc col-xs-12 col-sm-12 col-md-12">
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
			              <button class="btn btn-default btn-lg">Try it out! <i class="fa fa-play-circle"></i></button>
		              </a>
	        	  	</div>	</section>
        	</div>
	      	
	    </div>
	    <script type="text/javascript" src="/js/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
	    <script type="text/javascript" src="/js/demos.js"></script>
	</body>
</html>