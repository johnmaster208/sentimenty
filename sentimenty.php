<?php

require_once('includes/class.sentimenty.inc');

$param = isset($_GET['request']) ? $_GET['request'] : '';

if($param == ''){
	echo 'No request found. Please read the docs and try again.';
} else {
	// echo "<h1>The request was: </h1>";
	// echo "<pre><h3>$param</h3></pre>";

	// Requests from the same server don't have a HTTP_ORIGIN header
	if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
	    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
	}

	try {
    	$s = new Sentimenty($_REQUEST['request'],$_SERVER['HTTP_ORIGIN']);
    	echo $s->processAPI();
	} catch (Exception $e) {
	    echo json_encode(Array('error' => $e->getMessage()));
	}
}


// /**
// $s = new Sentiment($_REQUEST['request'],$_SERVER['HTTP_ORIGIN']);

// 	echo '<pre>';
// 	echo '<h4>Var dump for the request is: </h4>';
// 	var_dump($s);
// 	echo '</pre>';
// **/
?>
