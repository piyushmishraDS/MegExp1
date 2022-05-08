<?php


// this path should point to your configuration file:
include('dbConnectConfig.php');

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully ";

mysqli_select_db($conn,"rohiniex_meg");

$subjectId = $_GET['subjectId'];
$tableName = $_GET['tableName'];

// Perform Query
$sql = "SELECT totalScore FROM $tableName WHERE Name='$subjectId'";
$result = mysqli_query ($conn,$sql);
//echo mysqli_error();

if($result){
  $resArr = array();
  $rn=0;
  while($info = mysqli_fetch_array( $result )) {
    $resArr[$rn] =$info;
    $rn=$rn+1;
  }
}else{
  $rn=-1;
  $resArr=-1;
}

$myJSON1 = json_encode($resArr);

echo($myJSON1);

$conn->close();
?>
