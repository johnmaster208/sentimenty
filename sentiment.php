<?php

require_once('includes/class.sentiment.inc');

$param = isset($_GET['request']) ? $_GET['request'] : '';

if($param == ''){
	echo 'No request found. Please read the docs and try again.';
} else {
	echo "<h1>The request was: </h1>";
	echo "<pre><h3>$param</h3></pre>";
}





// /**
// $s = new Sentiment($_REQUEST['request'],$_SERVER['HTTP_ORIGIN']);

// 	echo '<pre>';
// 	echo '<h4>Var dump for the request is: </h4>';
// 	var_dump($s);
// 	echo '</pre>';
// **/
?>
