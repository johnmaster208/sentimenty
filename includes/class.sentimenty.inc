<?php

require_once('class.service.inc');
require_once('class.textpool.inc');

class Sentimenty extends Service {

	    public function __construct($request,$origin){
	    // public function __construct($request){
	    	parent::__construct($request);
	    }

     	protected function gnight() {
	     	if($this->method == 'GET') {
	     		return "This message was built by John's sentiment web service! Gnight!";
	     	} else {
	     		return "Only accepts GET requests";
	     	}
     	}

     	protected function demos() {
     		if($this->method == 'GET') {
     			include('demos.php');
     		}
     	}

	     protected function textpool() {
	     	if($this->method == 'POST') {
	     		if (isset($_POST['textpool']) && $_POST['textpool'] != '') {
	     			$t = $_POST['textpool'];
	     			$textPool = new TextPool($t);
	     			return $textPool->output;
	     		} else {
	     			return 'No text was sent. Please try again.';
	     		}
	     	} else {
	     		return "This endpoint only accepts POST data.";
	     	}
	     }

	     protected function textprobe() {

	     }

	     protected function textpluck() {

	     }

	     protected function textplot() {

	     }

	     protected function textprod() {
	     	
	     }

}

?>