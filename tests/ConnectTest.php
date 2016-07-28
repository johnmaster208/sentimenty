<?php

class Connect {
		private $serverName = '';
		public function connectToServer($server=null) {
			if($server == null) {
				throw new Exception("No Response, Yo!");
			}
			$this->serverName = $server;
			$sock = fsockopen($this->serverName,80);
			return ($sock) ? true : false;
		}
		public function returnConnection() {
			return $this;
		}
}


class ConnectTest extends PHPUnit_Framework_TestCase {
	public function setUp(){}
	public function tearDown(){}

	public function testConnectionIsValid() {
		//make sure we have a connection object
		$conn = new Connect();
		$s = 'sentimenty.herokuapp.com';
		$this->assertTrue(
			$conn->connectToServer($s) !== false
		);	
	}
}



?>