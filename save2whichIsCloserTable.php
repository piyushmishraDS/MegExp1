<?php
// this path should point to your configuration file:
include('dbConnectConfig.php');

$db = new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}
//for security reasons we remove slashes from the inputs
$Fname = stripslashes(htmlspecialchars($_POST['name']));
$Tr = stripslashes(htmlspecialchars($_POST['Trial']));
$m = stripslashes(htmlspecialchars($_POST['map']));
$tar = stripslashes(htmlspecialchars($_POST['target']));
$ch = stripslashes(htmlspecialchars($_POST['choice']));
$imq1 = stripslashes(htmlspecialchars($_POST['im1']));
$imq2 = stripslashes(htmlspecialchars($_POST['im2']));
$isC = stripslashes(htmlspecialchars($_POST['isCorrect']));
$RTq = stripslashes(htmlspecialchars($_POST['RT']));
$totalScore = stripslashes(htmlspecialchars($_POST['totalScore']));

$stmt = $db->prepare("INSERT INTO whichIsCloserTable VALUE(?,?,?,?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiiiidi", $Fname,$Tr,$m,$tar,$ch,$imq1,$imq2,$isC,$RTq,$totalScore);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
