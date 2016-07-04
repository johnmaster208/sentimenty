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

	//Properties
	// the $segment is the array item we're testing
	private $segment;
	// textpool: the working array which gets populated with sentiment info
	protected $textpool = array();


	// Utility functions
	//setSegment: sets the current segment to the class segment
	private function _setSegment($segment) {
		$this->segment = $segment;
	}
	//getSegment: returns the active class segment
	private function _getSegment() {
		return $this->segment;
	}

	//word stems; ive, ing, y, ful, er, est, ed, able

	private function _gatherFear(){
		$fear = array('afraid','acrophobic','afeard','aghast','appalled','dismayed','shocked','agoraphobic','alarmed','algophobic','apprehensive','browbeaten','bullied','cowed','hangdog','intimidated','claustrophobic','fearful','frightened','scared','horrified','horror-struck','horror-stricken','hunted','hydrophobic','aquaphobic','mysophobic','pankcky','panic-stricken','panic-struck','terrified','frightened','petrified','numb','shitless','terror-struck','terror-stricken','triskaidekaphobic','unnerved','white-lipped','xenophobic','cowardly','fearful','timid');
		$s = $this->_getSegment();
		if(in_array($s['word'], $fear)) {
			$data = array(
				'word' => $s['word'],
				'count' => $s['count'],
				'position' => $s['position'],
				'part' => $s['type'],
				'sentiment' => 'fear'
			);
			array_push($this->textpool,$data);
		}
	}
	private function _gatherAnger(){
		$anger = array('angry','aggravated','provoked','angered','enraged','furious','infuriated','maddened','choleric','irascible','hot under the colloar','huffy','mad','sore','indignant','incensed','outraged','umbrageous','irate','ireful','livid','smoldering','smouldering','wrath','wrathful','wroth','wrothful','mean','nasty','awful','hate','hatred','rage','raging','fury','vexation','exasperation','displeasure','crossness','displeased','irritate','irritated','irritability','indignation','pique','annoyed','annoyance','aggravate','aggravated','aggravation','umbrage','chafe','chafed','apoplectic','acrimonious','caustic','acerbic','scathing','acid','harsh','sharp','cutting','virulent','spiteful','vicious','hostile','venemous','pernicious','bitchy','nasty','catty');
		$s = $this->_getSegment();
		if(in_array($s['word'], $anger)) {
			$data = array(
				'word' => $s['word'],
				'count' => $s['count'],
				'position' => $s['position'],
				'part' => $s['type'],
				'sentiment' => 'anger'
			);
			array_push($this->textpool,$data);
		}
	}
	private function _gatherJoy(){
		$joy = array('joy','cheerful','sunny','joyous','joyful','ecstatic','rapture','rapturous','rapt','rhapsody','rhapsodic','elated','glee','gleeful','jubilant','jubilee','gay','festal','festive','merry','jocund','jolly','jovial','mirthful','happy','bubbly','genial','upbeat','euphoric','blissful','pleasing','good','welcome','heartwarming','peppy','chirpy','chipper','ebullient','smiley','bouncy','vivacious','sanguine','positive','optimistic','animated','radiant','exuberant','buoyant','breezy','jaunty','affable','perky','blithe','friendly');
		$s = $this->_getSegment();
		if(in_array($s['word'], $joy)) {
			$data = array(
				'word' => $s['word'],
				'count' => $s['count'],
				'position' => $s['position'],
				'part' => $s['type'],
				'sentiment' => 'joy'
			);
			array_push($this->textpool,$data);
		}
	}
	private function _gatherDisgust(){
		$disgust = array('disgusting','offensive','abhorrent','detestable','obscene','repugnant','replusive','charnel','ghastly','sepulchral','creepy','disgustful','distasteful','foul','loathly','loathsome','repellant','repelling','revolting','shanky','wicked','yucky','ghoulish','morbid','hideous','horrific','outrageous','objectionable','obnoxious','rank','scrimy','verminous','evil','hateful','unpalatable','unpleasant');
		$s = $this->_getSegment();
		if(in_array($s['word'], $disgust)) {
			$data = array(
				'word' => $s['word'],
				'count' => $s['count'],
				'position' => $s['position'],
				'part' => $s['type'],
				'sentiment' => 'disgust'
			);
			array_push($this->textpool,$data);
		}
	}
	private function _gatherTrust(){
		$trust = array('trust','trustful','trusting','trustworthy','confide','confiding','confided','unsuspect','unsuspected','unsuspecting','credulous','trusty','authentic','authenticate','authenticated','reliable','reliability','credit','creditworthy','creditable','responsible','responsibility','dependable','honest','truthful','truth','true','honesty','fiducal','sure','more sure','surest','trusted','faithful','faith','honorable','pride','proud','prominent','celebrated','famous','illustrious','renowned','famed','leading','eminent','distinguished','notable','noted','noteworthy','influential','affluential','affluent','important','know','known','knowing','reputable','respected','established','respect','establish','prestigious');
		$s = $this->_getSegment();
		if(in_array($s['word'], $trust)) {
			$data = array(
				'word' => $s['word'],
				'count' => $s['count'],
				'position' => $s['position'],
				'part' => $s['type'],
				'sentiment' => 'trust'
			);
			array_push($this->textpool,$data);
		}	
	}
	private function _gatherAnticipation(){
		$anticipation = array('assume','assuming','assumed','await','wait','waiting','awaiting','forecast','forecasted','forsee','prepare','preparing','prepared','divine','expect','expected','expecting','expectancy','predict','predicting','predicted','prevision','figure','figured','prognosticate','prophesy','visualize','visualizing','apprehend','apprehension','apprehensive','hope','prospect');
		$s = $this->_getSegment();
		if(in_array($s['word'], $anticipation)) {
			$data = array(
				'word' => $s['word'],
				'count' => $s['count'],
				'position' => $s['position'],
				'part' => $s['type'],
				'sentiment' => 'anticipation'
			);
			array_push($this->textpool,$data);
		}
	}
	private function _gatherSurprise(){
		$surprise = array('surprise','surprised','surprising','amaze','amazed','amazing','astonied','astonish','astonishment','astounding','astounded','awing','impressive','stun','stunned','stunning','dumbfounded','dumbfound','flabbergast','flabbergasted','stagger','staggered','staggering','stupify','stupified','thunderstruck','dumbstruck','dumbstricken','gobsmacked','openmouthed','popeyed','jiggered','startle','startled','unbelievable','astounding','fabulous','improbable','marvelous','marvel','marveling','marvellous','tall','undreamed','undreamt','unimagined','unimaginable','implausible','incredulous','unconvincing','unthinkable');
		$s = $this->_getSegment();
		if(in_array($s['word'], $surprise)) {
			$data = array(
				'word' => $s['word'],
				'count' => $s['count'],
				'position' => $s['position'],
				'part' => $s['type'],
				'sentiment' => 'surprise'
			);
			array_push($this->textpool,$data);
		}
	}

	private function _mergeDuplicateWordsOnPosition(){
		$uniques = array();
		$duplicates = array();
		foreach($this->textpool as $key => $value){
			//if a word hasn't been identified, push to uniques
			if(!in_array($value['word'], $uniques)){
				array_push($uniques,$value['word']);
			} else {
				//else, push the word positions for the duplicates to another array
				array_push($duplicates,$value['position']);
			}
		}
		foreach($this->textpool as $key => $value){
			//update the unique textpool entry with the duplicate position values.
			foreach($uniques as $u){
				if($value['word'] == $u && $value['count'] > 1){
					$newPosition = $value['position'] . "," . implode(',',$duplicates);
					unset($this->textpool[$key]['position']);
					$this->textpool[$key]['position'] = $newPosition;
				}
			}
			//unset the array items where the position is in the dups array
			foreach($duplicates as $d){
				if($value['position'] == $d){
					unset($this->textpool[$key]);
				}
			}
		}

		$this->textpool = array_values($this->textpool);
		
	}

	//handles the merging of the sentimentData array
	private function _poolSentimentData() {
		foreach($this->segmentData as $segment){
			$this->_setSegment($segment);
			$this->_gatherFear();
			$this->_gatherAnger();
			$this->_gatherJoy();
			$this->_gatherDisgust();
			$this->_gatherTrust();
			$this->_gatherAnticipation();
			$this->_gatherSurprise();
		}
		
	}

	private function _calculateSentimentDistribution(){
		$wordCount = count($this->segmentData);
		$segmentDistribution = array();
		//echo 'Total words: '. $wordCount;
		foreach($this->textpool as $key => $value) {
			if(array_key_exists($value['sentiment'], $segmentDistribution)) {
				$segmentDistribution[$value['sentiment']] = $segmentDistribution[$value['sentiment']] + 1;
			} else {
				$segmentDistribution[$value['sentiment']] = 1;
			}	
		}
		foreach($segmentDistribution as $k => $v){
			$segmentDistribution[$k] = $v / $wordCount;
		}
		$otherSegments = 100 - array_sum($segmentDistribution);
		$segmentDistribution['other'] = $otherSegments;

		foreach($this->textpool as $key => $value) {
			$this->textpool[$key]['distribution'] = $segmentDistribution[$value['sentiment']] / count($segmentDistribution);
		}
	}

	private function _calculateSentimentDensity() {
		$wordCount = count($this->segmentData);
		//$segmentDensity = array();
		foreach($this->textpool as $key => $value) {
			$this->textpool[$key]['density'] = 	$value['count'] / $wordCount;
		}
	}


	public function __construct($text){
		//build the object from the inherited NLP class
		parent::__construct($text);
		$this->_poolSentimentData();
		$this->_mergeDuplicateWordsOnPosition();
		$this->_calculateSentimentDistribution();
		$this->_calculateSentimentDensity();
		//echo '<pre>'.print_r($obj,true).'</pre>';
		//$textpool = $obj->getSegmentData();
		//echo '<pre>'.print_r($data,true).'</pre>';
		return $this;
	}

	public function dumpPool(){
		return $this->textpool;
	}
}


?>