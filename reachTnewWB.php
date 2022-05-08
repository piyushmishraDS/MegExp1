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

$name1 = stripslashes(htmlspecialchars($_POST['Fname']));
$TableN= stripslashes(htmlspecialchars($_POST['tableN']));


// Perform Query
$sql1 = "SELECT target FROM $TableN WHERE Name='$name1'";
$result1 = mysqli_query ($conn,$sql1)or die(mysqli_error());//mysql_query("SELECT * FROM TryMapsTable2 WHERE Name='Shirley_Mark_map3'");//or die(mysql_error());
echo mysqli_error();
$sql2 = "SELECT iniPic FROM $TableN WHERE Name='$name1'";
$result2 = mysqli_query ($conn,$sql2)or die(mysqli_error());//mysql_query("SELECT * FROM TryMapsTable2 WHERE Name='Shirley_Mark_map3'");//or die(mysql_error());
echo mysqli_error();

if($result1){
  $tarArr = array();
  $rn=0;
  while($info = mysqli_fetch_array( $result1 )) {
    $tarArr[$rn] =$info;
    $rn=$rn+1;
  }
}else{
  $rn=-1;
  $tarArr=-1;
}

if($result2){
  $picArr = array();
  $rn2=0;
  while($info = mysql_fetch_array( $result2 )) {
    $picArr[$rn2] =$info;
    $rn2=$rn2+1;
  }
}else{
  $rn2=-1;
  $picArr=-1;
}
$target = $tarArr[$rn-1];
$cpic = $picrArr[$rn-1];
if($target==$cpic){
  $rch = 1;
}else{
  $rch = 0;
}
//$sql1 = mysql_query ('SELECT * FROM $TableN WHERE Name=$name1')or die(mysql_error());
$myJSON1 = json_encode($rch);
//$myJSON2 = json_encode($rn);
echo($myJSON1);
$conn->close();
?>
