<?php
// this path should point to your configuration file:
include('dbConnectConfig.php');

$db =  new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}
//for security reasons we remove slashes from the inputs
$Fname = stripslashes(htmlspecialchars($_POST['name']));
$Tr = stripslashes(htmlspecialchars($_POST['Trial']));
$m = stripslashes(htmlspecialchars($_POST['map']));
$ndS = stripslashes(htmlspecialchars($_POST['dS']));
$tar = stripslashes(htmlspecialchars($_POST['target']));
$inp = stripslashes(htmlspecialchars($_POST['inP']));
$ch = stripslashes(htmlspecialchars($_POST['choice']));
$inPlast = stripslashes(htmlspecialchars($_POST['inPlast']));
$inR = stripslashes(htmlspecialchars($_POST['in1R']));
$inL = stripslashes(htmlspecialchars($_POST['in1L']));
$isC = stripslashes(htmlspecialchars($_POST['isCorrect']));
$nGood = stripslashes(htmlspecialchars($_POST['nCor']));
$nGoodInD = stripslashes(htmlspecialchars($_POST['nCorInD']));
$cdS= stripslashes(htmlspecialchars($_POST['curDS']));
$cdSnew= stripslashes(htmlspecialchars($_POST['curDSnew']));
$RTt = stripslashes(htmlspecialchars($_POST['RT']));
$totalScore = stripslashes(htmlspecialchars($_POST['totalScore']));
$stmt = $db->prepare("INSERT INTO navigTable VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiiiiiiiiiiidi", $Fname,$Tr,$m,$ndS,$tar,$inp,$ch,$inPlast,$inR,$inL,$isC,$nGood,$nGoodInD,$cdS,$cdSnew,$RTt,$totalScore);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
