<?php
// this path should point to your configuration file:
include('dbConnectConfig.php');

$db =  new mysqli($servername, $username, $password,$dbname);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}
//for security reasons we remove slashes from the inputs
$subjectId = stripslashes(htmlspecialchars($_POST['subjectId']));
$run = stripslashes(htmlspecialchars($_POST['run']));
$map = stripslashes(htmlspecialchars($_POST['map']));
$trial = stripslashes(htmlspecialchars($_POST['trial']));
$pic11 = stripslashes(htmlspecialchars($_POST['pile1Img1']));
$pic12 = stripslashes(htmlspecialchars($_POST['pile1Img2']));
$pic13 = stripslashes(htmlspecialchars($_POST['pile1Img3']));
$pic21 = stripslashes(htmlspecialchars($_POST['pile2Img1']));
$pic22 = stripslashes(htmlspecialchars($_POST['pile2Img2']));
$pic23 = stripslashes(htmlspecialchars($_POST['pile2Img3']));
$targetNode = stripslashes(htmlspecialchars($_POST['targetNode']));
$response= stripslashes(htmlspecialchars($_POST['response']));
$correctPile = stripslashes(htmlspecialchars($_POST['correctPile']));
$answeredCorrectly = stripslashes(htmlspecialchars($_POST['answeredCorrectly']));
$runScore = stripslashes(htmlspecialchars($_POST['runScore']));
$totalScore = stripslashes(htmlspecialchars($_POST['totalScore']));
$rt = stripslashes(htmlspecialchars($_POST['rt']));

$stmt = $db->prepare("INSERT INTO pilesTable VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");//I also insert the time
$stmt->bind_param("siiiiiiiiiiiiiiid", $subjectId,$run,$map,$trial,$pic11,$pic12,$pic13,$pic21,$pic22,$pic23,$targetNode,$response,$correctPile,$answeredCorrectly,$runScore,$totalScore,$rt);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
