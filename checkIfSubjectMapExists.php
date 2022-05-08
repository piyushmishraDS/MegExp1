<?php

// this path should point to your configuration file:
include('dbConnectConfig.php');

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully ";

mysqli_select_db($conn,"rohiniex_meg");
//input:
$subjectId = $_GET['subjectId'];
$map = $_GET['map'];

$sql = "SELECT * FROM imagesFilesTable WHERE subjectId = '$subjectId' AND map=$map";

$result = mysqli_query($conn,$sql);

if($result){
  $resArr = array();
  $rn=0; // row number

  // the following code will loop through all rows that returned from the mysqli query. In this case there is only a single row per subject.
  // the following while loop will run as long as the value assigned to $info not Null, empty array or False.
  // i.e. as long as there are still rows in $result. mysqli_fetch_array gets one row at a time from $result.
  // MYSQLI_NUM specifies that the return array should use numeric keys for the array, instead of creating an associative array
  while($info = mysqli_fetch_array( $result,MYSQLI_NUM)) {
    // each element of $resArr is a single row from the SQL query
    $resArr[$rn] =$info;
    $rn=$rn+1;
  }
}else{
  $resArr=-1;
}
$myJSON1 = json_encode($resArr);
echo($myJSON1);

$conn->close();
?>
