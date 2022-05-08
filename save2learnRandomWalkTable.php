<?php

// this path should point to your configuration file:
include('dbConnectConfig.php');

$db =  new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}

// make sure parameters don't have slashes etc
$subjectId = stripslashes(htmlspecialchars($_POST['subjectId']));
$run = stripslashes(htmlspecialchars($_POST['run']));
$map = stripslashes(htmlspecialchars($_POST['map']));
$trial = stripslashes(htmlspecialchars($_POST['trial']));
$nodeNumImgOld= stripslashes(htmlspecialchars($_POST['nodeNumImgOld']));
$imgFileOld= stripslashes(htmlspecialchars($_POST['imgFileOld']));
$nodeNumImgNew= stripslashes(htmlspecialchars($_POST['nodeNumImgNew']));
$imgFileNew= stripslashes(htmlspecialchars($_POST['imgFileNew']));
$rt = stripslashes(htmlspecialchars($_POST['rt']));

// prepare SQL statement
$stmt = $db->prepare("INSERT INTO learnRandomWalkTable (subjectId, run, map, trial, nodeNumImgOld, imgFileOld, nodeNumImgNew, imgFileNew, rt) VALUE(?,?,?,?,?,?,?,?,?)");//I also insert the time
// bind parameters to statement
$stmt->bind_param("siiiisisd", $subjectId, $run,$map,$trial,$nodeNumImgOld,$imgFileOld,$nodeNumImgNew,$imgFileNew,$rt);//s=string, i=integer, d=double
// execute statement (save row to table)
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);

?>
