<?php

class TextPool {

	//raw holds the entire request string
	private $request = '';
	//segments contains the string broken into array elements
	private $segments = array();
	//output is the array with all the sentiment data attached to it
	public $output = array();

	private function wordCount($key) {
		$count = array();
		foreach($this->segments as $v) {
			if(!array_key_exists($v,$count)) {
				$count[$v] = 0;
			} 
			$count[$v]++;
		}
		return $count[$key];
	}

	private function determineLangageElement($key) {
		$elems = array();
		//need something here that will go and look up the parts of speech
		$eng_articles = array('the','a','an');
		$eng_expletives = array('fuck','bitch','damnit','ass','shit','piss','bastard');
		foreach($this->segments as $v) {
			if(!array_key_exists($v,$elems)) {
				if(in_array($v,$eng_articles)) {
					$elems[$v] = 'article';
				} elseif (in_array($v, $eng_expletives)) {
					$elems[$v] = 'expletive';
				}
				 else {
					$elems[$v] = 'Not determinable';
				}		
			}//end if

		}//end foreach segment
		if(isset($elems[$key])){
			return $elems[$key];
		}
		
	}

	protected function analyzeWordSequence($request) {
		// echo '<pre>Chopped:'.print_r($chopped[1],true).'</pre>';
		$toSegmentArray = explode(' ',$this->request);
		$this->segments = $toSegmentArray;
	}


	protected function fillPool() {
		$poolArray = array();
		foreach($this->segments as $key => $value) {
			$poolArray[$key] = array(
				'word' => $value, 
				'count' => $this->wordCount($value), 
				'postition' => $key, 
				'type' => $this->determineLangageElement($value)
			);
		}
		$this->output = $poolArray;
	}

	public function __construct($t){
		//echo '<pre>'.print_r($t,true).'</pre>';
		$this->request = $t;
		// $this->raw = $this->request;
		$this->analyzeWordSequence($this->request);
		//$this->fillPool();
		//echo '<pre>Segments:'.print_r($this->segments,true).'</pre>';
		$this->fillPool();
		//echo '<pre>Output:'.print_r($this->output,true).'</pre>';
		//echo $this->fetchOutput();
	}
}


?>