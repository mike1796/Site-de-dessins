<?php
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

if (isset($_SESSION['pseudo']) && !empty($_SESSION['pseudo'])) {
	$data = array("success" => true, "pseudo" => $_SESSION['pseudo']);
	echo json_encode($data);
} else {
	$data = array("success" => false, "pseudo" => "");
	echo json_encode($data);
}