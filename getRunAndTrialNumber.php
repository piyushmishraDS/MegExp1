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
//input:

$subjectId = $_GET['subjectId'];
$tableName = $_GET['tableName'];


// Perform Query
$sql = "SELECT run FROM $tableName WHERE subjectId='$subjectId'";

$result = mysqli_query($conn,$sql);

if($result){
  // if
  $resArr = array();
  $rn=0;
  while($info = mysqli_fetch_array( $result )) {
    $resArr[$rn] =$info;
    $rn=$rn+1;
  }
} else{
  $rn=-1;
  $resArr=-1;
}
//$sql1 = mysql_query ('SELECT * FROM $tableName WHERE Name=$name1')or die(mysql_error());
$myJSON1 = json_encode($resArr);
echo($myJSON1);
$conn->close();
?>
