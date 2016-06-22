<?php

require_once('test.connect.inc');

class Connect extends PHPUnit_Framework_TestCase {

	public function setUp(){}

	public function tearDown(){}

	public function testConnectionIsValid() {
		//make sure we have a connection object
		$conn = new Connect();
		$s = 'sentimenty.homeunix.net';
		$this->assertTrue(
			$conn->connectToServer($s) !== false
		);	
	}
}



?>