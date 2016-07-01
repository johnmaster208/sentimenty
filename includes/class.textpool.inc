<?php

require_once('class.nlp.inc');

class TextPool extends NLP {

	/**
	*Based on Robert Plutchik's Wheels of emotions.
	*
	*This says that the eight basic emotions (feelings) are:
	*
	*Fear → feeling afraid. Other words are terror (strong fear), shock, phobia
	*Anger → feeling angry. A stronger word is rage.
	*Sadness → feeling sad. Other words are sorrow, grief (a stronger feeling, for example when someone has died) or depression
	*Joy → feeling happy. Other words are happiness, gladness.
	*Disgust → feeling something is wrong or dirty
	*Trust → a positive emotion; admiration is stronger; acceptance is weaker
	*Anticipation → in the sense of looking forward positively to something which is going to happen. Expectation is more neutral.
	*Surprise → how one feels when something unexpected happens​
	**/

	private function _gatherFear(){
		
	}

	private function _gatherAnger(){

	}

	private function _gatherSadness(){

	}

	private function _gatherJoy(){

	}

	private function _gatherDisgust(){

	}

	private function _gatherTrust(){

	}

	private function _gatherAnticipation(){

	}

	private function _gatherSurprise(){

	}

	private function _poolSentiment($textObj) {
		foreach($textObj as $obj){

		}
	}
	public function __construct($text){
		//build the object from the inherited NLP class
		$obj = parent::__construct($text);
		//echo '<pre>'.print_r($obj,true).'</pre>';
		//$textpool = $obj->getSegmentData();
		//echo '<pre>'.print_r($data,true).'</pre>';
		return $obj;
	}
}


?>