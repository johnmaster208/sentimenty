<?php

require __DIR__ . '/../includes/class.textpool.inc';

class TPTest extends PHPUnit_Framework_TestCase {

	private $text = "";

	public function setUp(){}

	public function tearDown(){}
	
	public function getPrivateProperty($class,$prop) {
		$seg = new ReflectionClass($class);
		$data = $seg->getProperty($prop);
		$data->setAccessible(true);
		$obj = new TextPool($this->text);
		return $data->getValue($obj);
	}

	public function getPrivateMethod($classObj,$method, $params = array()) {
		$seg = new ReflectionClass($classObj);
		$m = $seg->getMethod($method);
		$m->setAccessible(true);
		//var_dump($m->invokeArgs($classObj,$params));
		if(count($params) > 1){
		return $m->invokeArgs($classObj,$params);
		} else {
		return $m->invoke($classObj,$params);
		}
	}

	/**
	* @covers TextPool::_getSegment()
	*/
	public function testGetSegment(){
		$this->text = 'Foo was fooful of the fooey';
		$obj = new TextPool($this->text);
		//get the current segment
		$getSegment = $setSegment = $this->getPrivateMethod($obj,'_getSegment',array());
		//compare with the segment property
		$current_segment = $this->getPrivateProperty('TextPool','segment');
		//assert they're the same, using $canonicalize=true
		$this->assertEquals($current_segment,$getSegment,"\$canonicalize = true");
	}

	public function testSegmentIsNotNull(){
		$this->text = "The quick brown fox jumped over the lazy dog.";
		$segmentData = $this->getPrivateProperty('TextPool','segmentData');
		$this->assertGreaterThan(0,count($segmentData));
	}

	/**
	* @covers NLP::generateNLPData()
	*/
	public function testSegmentKeys(){
		$this->text = "The quick brown fox jumped over the lazy dog.";
		$segmentData = $this->getPrivateProperty('TextPool','segmentData');
		foreach($segmentData as $key => $value) {
			//Test that the segment returns with ALL valid keys
			$this->assertArrayHasKey('word',$value);
			$this->assertArrayHasKey('count',$value);
			$this->assertArrayHasKey('position',$value);
			$this->assertArrayHasKey('type',$value);
			//Also, test for NULL values on the keys
			foreach($value as $v){
				$this->assertNotNull($v);
			}
		}
	}


	/**
	* @covers TextPool::_calculateSentimentDensity()
	*/
	public function testCalcDensity() {
		//density based on word count; create some counts
		$sentiment1 = 5;
		$sentiment2 = 4;
		$sentiment3 = 3;
		$sentiment4 = 2;
		$sentiment5 = 1;
		$totalWords = 10;
		//assert the density works out
		$this->assertEquals($sentiment5 / $totalWords, 0.10);
		$this->assertEquals($sentiment4 / $totalWords, 0.20);
		$this->assertEquals($sentiment3 / $totalWords, 0.30);
		$this->assertEquals($sentiment2 / $totalWords, 0.40);
		$this->assertEquals($sentiment1 / $totalWords, 0.50);
	}


	/**
	* @covers TextPool::_calculateSentimentDistribution
	*/
	public function testCalcDistribution() {
		//8 possible sentiments
		$totalSentiments = 8;
		//get a random number between 1-8;
		//this will simulate the number of sentiments actually triggered out of the 8
		$sentiment = rand(1,8);

		//assert the values of the used sentiments
		switch($sentiment) {
			case 1: 
				$this->assertEquals($sentiment / $totalSentiments, 0.125);
			break;
			case 2: 
				$this->assertEquals($sentiment / $totalSentiments, 0.25);
			break;
			case 3: 
				$this->assertEquals($sentiment / $totalSentiments, 0.375);
			break;
			case 4: 
				$this->assertEquals($sentiment / $totalSentiments, 0.5);
			break;
			case 5: 
				$this->assertEquals($sentiment / $totalSentiments, 0.625);
			break;
			case 6: 
				$this->assertEquals($sentiment / $totalSentiments, 0.75);
			break;
			case 7: 
				$this->assertEquals($sentiment / $totalSentiments, 0.875);
			break;
			case 8: 
				$this->assertEquals($sentiment / $totalSentiments, 1);
			break;
		}

		//build a few sentiments and their word counts for the distribution
		$sentiments = array(
			'joy' => 10,
			'fear' => 8,
			'trust' => 7
		);

		$word_total = 50;

		//assert that sentiments contains only integer values
		$this->assertContainsOnly('integer',$sentiments);

		//..that their distributions work out...
		$this->assertEquals($sentiments['joy'] / $word_total, 0.2);
		$this->assertEquals($sentiments['fear'] / $word_total, 0.16);
		$this->assertEquals($sentiments['trust'] / $word_total, 0.14);

		//..that the remainder of the unused sentiments + their count = word_total
		$this->assertEquals(abs($word_total - $sentiment['joy']) + $sentiment['joy'],$word_total);
		$this->assertEquals(abs($word_total - $sentiment['fear']) + $sentiment['fear'],$word_total);
		$this->assertEquals(abs($word_total - $sentiment['trust']) + $sentiment['trust'],$word_total);


	}

}



?>