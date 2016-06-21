<?php

require_once('includes/class.sentimenty.inc');

$param = isset($_GET['q']) ? $_GET['q'] : '';

if($param == ''){
	echo 'No request found. Please read the docs and try again.';
} else {
	// Requests from the same server don't have a HTTP_ORIGIN header
	if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
	    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
	}
	try {
    	$s = new Sentimenty($param,$_SERVER['HTTP_ORIGIN']);
    	echo $s->processAPI();
	} catch (Exception $e) {
	    echo json_encode(Array('error' => $e->getMessage()));
	}
}

?>
