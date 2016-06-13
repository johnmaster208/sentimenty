<?php

require_once('class.service.inc');

class Sentimenty extends Service {
 	// 	protected $User;

		// public function __construct($request, $origin) {
		//         parent::__construct($request);

		//         // Abstracted out for example
		//         $APIKey = new Models\APIKey();
		//         $User = new Models\User();

		//         if (!array_key_exists('apiKey', $this->request)) {
		//             throw new Exception('No API Key provided');
		//         } else if (!$APIKey->verifyKey($this->request['apiKey'], $origin)) {
		//             throw new Exception('Invalid API Key');
		//         } else if (array_key_exists('token', $this->request) &&
		//              !$User->get('token', $this->request['token'])) {

		//             throw new Exception('Invalid User Token');
		//         }

		//         $this->User = $User;
		// }

	    /**
	     * Example of an Endpoint
	     */
	     // protected function example() {
	     //    if ($this->method == 'GET') {
	     //        return "Your name is " . $this->User->name;
	     //    } else {
	     //        return "Only accepts GET requests";
	     //    }
	     // }

	    public function __construct($request,$origin){
	    // public function __construct($request){
	    	parent::__construct($request);
	    }

	    /**
	     * Example of an Endpoint
	     */
	     protected function name() {
	        if ($this->method == 'GET') {
	        	return "Your name is " . $this->args[0];
	        } else {
	            return "Only accepts GET requests";
	        }
	     }

	     protected function gnight() {
	     	if($this->method == 'GET') {
	     		return "This message was built by John's sentiment web service! Gnight!";
	     	} else {
	     		return "Only accepts GET requests";
	     	}
	     }
}

?>