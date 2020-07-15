<?php 
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// if (empty($_POST['username']) && empty($_POST['password'])) die();

if($_POST){
    http_response_code(200);            //made it to the proper page
    // $username = $_POST["username"];
    // $password = $_POST["password"];
    $income = $_POST["income"];
    $rent = $_POST["rent"];
    $food = $_POST["food"];
    $misc = $_POST["misc"];
    $savings = $_POST["savings"];
    $connection = new MongoClient();
    $collection = $connection->lifestyle->financials;
    $doc = array(
        "name" => "MongoDB",
        "type" => "database",
        "count" => 1,
        "info" => (object)array( "income" => $income, "rent" => $rent, "food" => $food, "misc" => $misc, "savings" => $savings), //change
        "versions" => array("0.9.7", "0.9.8", "0.9.9")
    );
    $collection->insert( $doc );
}
?>