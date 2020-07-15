<?php 
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


if($_POST){
    http_response_code(200);            //made it to the proper page
    $task = $_POST["newTask"];
    $connection = new MongoClient();
    $collection = $connection->lifestyle->tasks;
    $doc = array(
        "name" => "MongoDB",
        "type" => "database",
        "count" => 1,
        "info" => (object)array( "newTask" => $task),
        "versions" => array("0.9.7", "0.9.8", "0.9.9")
    );
    $collection->insert( $doc );
}
?>