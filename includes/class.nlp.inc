<?php


abstract class NLP {

	//fragementData contains the raw string broken into array elements
	protected $fragmentData = array();
	//segmentData contains the sorted, organized data
	protected $segmentData = array();


	//protected wordCount: counts the number of occurrences for the word.
	protected function wordCount($key) {
			$count = array();
			foreach($this->fragmentData as $v) {
				if(!array_key_exists($v,$count)) {
					$count[$v] = 0;
				} 
				$count[$v]++;
			}
			return $count[$key];
	}

	//protected determineLanguageElement: finds out what part of the language the word is.
	protected function determineLangageElement($key) {
		$elems = array();
		//need something here that will go and look up the parts of speech
		$eng_articles = array('the','a','an');
		$eng_expletives = array('damn','hell');
		foreach($this->fragmentData as $v) {
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

	//protected generateNLPData: massages the segment and returns the array with language data.
	protected function generateNLPData($text) {
		$this->fragmentData = explode(' ',$text);
		$data = array();
		foreach($this->fragmentData as $key => $value) {
			$data[$key] = array(
				'word' => $value, 
				'count' => $this->wordCount($value), 
				'position' => $key,
				'type' => $this->determineLangageElement($value)
			);
		}
		return $data;
	}

	public function getSegmentData(){
		return $this->segmentData;
	}

	//public __construct: initiates the NLP processing and returns the array object
	public function __construct($text) {
		$this->segmentData = $this->generateNLPData($text);
		return $this;
	}
}




?>