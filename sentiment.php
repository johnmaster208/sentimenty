<?php

require_once('inc/class.sentiment.inc');

$param = isset($_GET['request']) ? $_GET['request'] : '';

#echo '$_GET["request"] param was ' . $param;
$s = new Sentiment($_REQUEST['request'],$_SERVER['HTTP_ORIGIN']);

	echo '<h4>Var dump for the request is: </h4>';
	var_dump($s);

?>