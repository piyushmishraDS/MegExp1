<?php
$database="rohiniex_meg";
$host="localhost";
$user="rohiniex_meg";
$password="eb;?~YInAA4a";

$db = new mysqli($host, $user, $password, $database);
if (mysqli_connect_errno()) {
  printf("DB error: %s", mysqli_connect_error());
  exit();
}
//for security reasons we remove slashes from the inputs
$subjectId = stripslashes(htmlspecialchars($_POST['subjectId']));
$d = stripslashes(htmlspecialchars($_POST['d']));

$stmt = $db->prepare("INSERT INTO subjectDetailsAndStartTimeTable (subjectId, d) VALUE(?,?)");// I also insert the timeStr (note I call it hur - time is a reserved keyword!)
$stmt->bind_param("ss", $subjectId,$d);//s=string, i=integer, d=double
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
  'ErrorNo' => $err,
);
$stmt->close();
$db->close();
echo json_encode($data);
?>
