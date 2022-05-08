<?php

include('dbConnectConfig.php');

//this script sends number to sql table one by one
$dbc = mysql_connect($servername, $username, $password);
// $dbc = mysql_connect('193.62.66.60', 'smark', 'djh7ArGu3IWgKznH');

/* echo mysql_error();
echo('hello'); */
$SelectDB=mysql_select_db('rohiniex_meg');
//echo($SelectDB);

//echo('here');
$Fname = stripslashes(htmlspecialchars($_POST['name']));
$Tr = stripslashes(htmlspecialchars($_POST['Trial']));
$m = stripslashes(htmlspecialchars($_POST['map']));
$pic1 = stripslashes(htmlspecialchars($_POST['picN1']));
$pic2 = stripslashes(htmlspecialchars($_POST['picN2']));
$RT = stripslashes(htmlspecialchars($_POST['RTv']));
$TableN= stripslashes(htmlspecialchars($_POST['tableN']));
//echo($Fname);
$sql2 = mysql_query("INSERT INTO $TableN (Name, Trial,map,pic1,pic2,RT) VALUES ('$Fname',$Tr,$m,$pic1,$pic2,$RT)")or die(mysql_error());
if($sql2){
	$resArr = 1;
}else{
	$resArr=-1;
}
echo($resArr);
mysql_close($dbc);
?>
