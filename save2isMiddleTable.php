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
$nR = stripslashes(htmlspecialchars($_POST['nREP']));
$p1 = stripslashes(htmlspecialchars($_POST['pic1']));
$p2 = stripslashes(htmlspecialchars($_POST['pic2']));
$p3 = stripslashes(htmlspecialchars($_POST['pic3']));
$isMid = stripslashes(htmlspecialchars($_POST['isitM']));
$isC = stripslashes(htmlspecialchars($_POST['corR']));
$RTm = stripslashes(htmlspecialchars($_POST['rt']));
$totalScore = stripslashes(htmlspecialchars($_POST['totalScore']));

$stmt = $db->prepare("INSERT INTO isMiddleTable VALUE(?,?,?,?,?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiiiiidi", $Fname,$Tr,$m,$nR,$p1,$p2,$p3,$isMid,$isC,$RTm,$totalScore);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
