<?php

abstract class Service {

    /**
     * Property: method
     * The HTTP method this request was made in, either GET, POST, PUT or DELETE
     */
    protected $method = '';

    /**
     * Property: endpoint
     * The Model requested in the URI. eg: /files
     */
    protected $endpoint = '';

    /**
     * Property: verb
     * An optional additional descriptor about the endpoint, used for things that can
     * not be handled by the basic methods. eg: /files/process
     */
    protected $verb = '';

    /**
     * Property: args
     * Any additional URI components after the endpoint and verb have been removed, in our
     * case, an integer ID for the resource. eg: /<endpoint>/<verb>/<arg0>/<arg1>
     * or /<endpoint>/<arg0>
     */
    protected $args = Array();

    /**
     * Property: file
     * Stores the input of the PUT request
     */
    protected $file = Null;


    /**
     * Property: $format
     * Stores the output format of the request. 'application/json' or 'text/xml'. Defaults to JSON in the setResponseFormat() method.
     */
    protected $format = '';


    public function processAPI() {
        if (method_exists($this, $this->endpoint)) {
            return $this->_response($this->{$this->endpoint}($this->args));
        }
        return $this->_response("No Endpoint: $this->endpoint", 404);
    }

    private function _response($data, $status = 200) {
        header("HTTP/1.1 " . $status . " " . $this->_requestStatus($status));
        if($this->format == 'application/json') {
            return json_encode($data);    
        } elseif ($this->format == 'text/xml') {
            return $this->_generateValidXML($data);
        } else {
            return json_encode($data);
        }
    }

    private function _generateValidXML($data) {
        $sentiments = $data;
        $xml = new DOMDocument('1.0', 'utf-8');
        $root = $xml->createElement('text');
        $root = $xml->appendChild($root);
        foreach($sentiments as $sentiment) {
            $s = $xml->createElement('sentiment');
            $s = $root->appendChild($s);
            foreach($sentiment as $k => $v) {
                $field = $xml->createElement($k);
                $field = $s->appendChild($field);
                $value = $xml->createTextNode($v);
                $fillV = $field->appendChild($value);
            }
        }
        $xml->formatOutput = true;
        print $xml->saveXML();
    }

    private function _setResponseFormat($data) {
        //check for POST data first, by finding out if $data is empty
        //if no $this->args were passed, 
        if(empty($data) || isset($_POST)) {
            $format = isset($_POST['format']) ? $_POST['format'] : 'json';
            if($format == 'xml'){
                $this->format = 'text/xml';
            } else {
                $this->format = 'application/json';
            }
        } else {
            //$data is NOT empty, which means it's probably a GET request
            if (in_array('json', $data)){
                $this->format = 'application/json';
            } elseif (in_array('xml',$data)) {
                $this->format = 'text/xml';
            } else {
                $this->format = 'application/json';
            }
        }
        //return appropriate header
        header("Content-Type: " . $this->format);
    }

    private function _cleanInputs($data) {
        $clean_input = Array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $clean_input[$k] = $this->_cleanInputs($v);
            }
        } else {
            $clean_input = trim(strip_tags($data));
        }
        return $clean_input;
    }

    private function _requestStatus($code) {
        $status = array(  
            200 => 'OK',
            404 => 'Not Found',   
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
        ); 
        return ($status[$code])?$status[$code]:$status[500]; 
    }

    /**
     * Constructor: __construct
     * Allow for CORS, assemble and pre-process the data
     */
    public function __construct($request) {
        //Send headers
        header("Access-Control-Allow-Orgin: *");
        header("Access-Control-Allow-Methods: *");
        $this->args = explode('/', rtrim($request, '/'));
        $this->endpoint = array_shift($this->args);
        if (array_key_exists(0, $this->args) && !is_numeric($this->args[0])) {
            $this->verb = array_shift($this->args);
        }
        $this->_setResponseFormat($this->args);
        $this->method = $_SERVER['REQUEST_METHOD'];
        if ($this->method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
            if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE') {
                $this->method = 'DELETE';
            } else if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT') {
                $this->method = 'PUT';
            } else {
                throw new Exception("Unexpected Header");
            }
        }
        switch($this->method) {
            case 'DELETE':
            case 'POST':
                $this->request = $this->_cleanInputs($_POST);
                break;
            case 'GET':
                $this->request = $this->_cleanInputs($_GET);
                break;
            case 'PUT':
                $this->request = $this->_cleanInputs($_GET);
                $this->file = file_get_contents("php://input");
                break;
            default:
                $this->_response('Invalid Method', 405);
                break;
        }

    }
}

?>