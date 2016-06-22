<?php

	class Connect {

		private $serverName = '';

		public function connectToServer($server=null) {

			if($server == null) {
				throw new Exception("Server was not found.");
			}
			$this->serverName = $server;
			$sock = fsockopen($this->serverName,80);
			return ($sock) ? true : false;
		}
		public function returnConnection() {
			return $this;
		}
	}

?>