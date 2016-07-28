<?php

require_once('class.service.inc');
require_once('class.textpool.inc');

final class Sentimenty extends Service {

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

     	protected function paramtest(){
     		if($this->method == 'GET') {
     			echo '<pre>'.print_r($this,true)."</pre>";
	     	} elseif ($this->method == 'POST') {
	     		echo "<h1>Oh boy, a POST request!!! *SQUEE*</h1>";
	     		echo "Looks like here's the parameters you sent us:";
	     		foreach($_POST as $key => $value) {
	     			echo "<p>key: ".$key." => value: ".$value." </p>";
	     		}
	     		echo "<h2>This information was derived from the request object</h2>";
	     		echo '<pre>'.print_r($this,true)."</pre>";
	     	}
     	}

     	protected function demos() {
     		if($this->method == 'GET') {
     			include('demos.php');
     		}
     	}

	     protected function textpool() {
	     	if($this->method == 'POST') {
	     		$text = isset($this->request['text']) ? $this->request['text'] : null;
	     		$format = isset($this->request['format']) ? $this->request['format'] : 'json';
	     		if($text){
	     			$tp = new TextPool($text);
	     			//echo '<pre>'.print_r($this,true).'</pre>';
	     			$data = $tp->dumpPool();
	     			//exit();
	     			//"sleep" so it looks like we're thinking :)
	     			sleep(rand(2,4));
	     			//print $textPool;
	     			//echo '<pre>'.print_r($data,true).'</pre>';
	     			return $data;
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