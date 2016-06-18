<?php

require_once('class.service.inc');

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

	     protected function  analyze() {
	     	if($this->method == 'POST'){
	     		echo "<h2>The endpoint is " . $this->endpoint . "</h2>";
	     		echo "<h3>The verb is " . $this->verb . "</h3>";
	     		echo "<h4>The args are " . print_r($this->args,true).'</h4>';  
	     	} else {
	     		return "No POST request sent.";
	     	}
	     }


}

?>